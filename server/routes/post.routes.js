const router = require('express').Router()
const Post = require('../model/Post.js')
const Uuid = require('uuid')
const authMiddleware = require('../middleware/auth.middleware.js')
const fileController = require('../controllers/fileController.js')
const User = require('../model/User.js')


//delete post
router.delete('/:postId',authMiddleware, fileController.deletePost)

// create post
router.post('/', authMiddleware, fileController.addPost)
 

//update a post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId){
            await post.updateOne({$set: req.body})
           return res.status(200).json({message: "Post has been updated"})
        }else{
            return res.status(403).json({message : "You can update only your post"})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})
//get user posts
router.get('/profile/:id', async (req, res) => {
    try {
        const posts = await Post.find({userId: req.params.id}) 
       return res.status(200).json(posts)
    } catch (error) {
       return res.status(500).json(error) 
    }
})
// like user post
router.put('/:id/like', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: { likes: req.body.userId}})
            const likedPost = await Post.findById(req.params.id)
            res.status(200).json({post: likedPost, likes: likedPost.likes, idPost: req.params.id , message: "the post has been liked"})
        }else{
            await post.updateOne({ $pull: { likes: req.body.userId}})
            const dislikedPost = await Post.findById(req.params.id) 
            res.status(200).json({post:dislikedPost,  likes: dislikedPost.likes, idPost: req.params.id,  message: "the post has been disliked"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
//get timeline post
router.get("/timeline/:userId/:count/:page", async (req, res) => {
    const page = (req.params.page - 1) * req.params.count
    try{
        const currentUser = await User.findById(req.params.userId)
        let postsId = currentUser.followings
        postsId.unshift(req.params.userId)
   //     console.log(postsId)
       // const userPosts = await Post.find({ userId: currentUser._id})
      const friendsPost = await Post.find({ 'userId': { $in: postsId } })
        .sort({createdAt: -1}).skip(page).limit(req.params.count)
        res.status(200).json(friendsPost)
    }catch (err) {
        res.status(500).json(err)
    }
   
})



module.exports = router