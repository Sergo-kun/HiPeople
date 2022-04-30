const User = require("../model/User.js")
const router = require("express").Router()
const authMiddleware = require('../middleware/auth.middleware')


//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json("Account has been deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    }
})

//follow unfollow
router.put("/:id/follow",authMiddleware, async (req, res) => {
    if (req.user._id !== req.params.id) {
        try {
            const user = await User.findById(req.user._id)
            const friend = await User.findById(req.params.id)
            if (!user.followings.includes(req.params.id)){
                await user.updateOne({$push: {followings: req.params.id}})
                await friend.updateOne({$push: {followers: req.user._id}})
                const forFriend = await User.findById(req.params.id) // friend
                const forMe = await User.findById(req.user._id) //me
                const follower = forFriend.followers
                const following= forMe.followings
                console.log(follower)
                 res.status(200).json({follower: follower, following: following,  message: "You has been followed"})
            }else{
                await user.updateOne({$pull: {followings: req.params.id }})
                await friend.updateOne({$pull: {followers: req.user._id}})
                const forFriend = await User.findById(req.params.id) // friend
                const forMe = await User.findById(req.user._id) //me
                const follower = forFriend.followers
                const following = forMe.followings
                console.log(follower)
                 res.status(200).json({follower: follower, following: following,  message:"You has been unfollowed"})
            }
        } catch (error) {
            return res.status(400).json(error)
        }
    }else{
        return res.status(403).json("You catn follow yoursels")
    }
    
})
//get user by id and name
router.get("/:id", async( req, res) => {
    const userId = req.params.id
    const userName = req.body.username
    try {
       const user =  userId 
       ? await User.findById(userId) 
       : await User.findOne({username: userName})
       const {password, isAdmin, ...other} = user._doc 
       return res.status(200).json(other)
    } catch (error) {
        return res.status(500).json(error)
    }
})
//get usersLength
router.get("/getUsersLength", async (req, res) => {
    try {
        const usersLength = (await User.find()).length
        return res.status(200).json(usersLength)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// get users pagination
router.get("/getUsers/:count/:page", async(req, res) => {
    const page = (req.params.page - 1) * req.params.count
  
    try {
         const users = await User.find().skip(page).limit(req.params.count)
         const correctInfo = users.map(user => {

             const {password, isAdmin, ...other} = user._doc
             return other
         })     
        return res.status(200).json(correctInfo)
    } catch (error) {
        return res.status(500).json(error)
    }
})
//GET FOLLOWINGS
router.get("/followings/:profileId/:count/:page", async (req, res) => {
    const page = (req.params.page - 1) * req.params.count
    try {
       // console.log(req.params.profileId)
        const followings = await User.find({followers: req.params.profileId}).skip(page).limit(req.params.count)
     
        const correctInfo = followings.map(user => {

            const {password, isAdmin, ...other} = user._doc
            return other
        })
        return res.status(200).json(correctInfo)
    } catch (error) {
        return res.status(500).json(error)
    }
})
//get followings without pagination
router.get("/followings/:profileId", async (req, res) => {
    try {
        const followings = await User.find({followers: req.params.profileId})
        const correctInfo = followings.map(user => {

            const {password, isAdmin, ...other} = user._doc
            return other
        })
        return res.status(200).json(correctInfo)
    } catch (error) {
        return res.status(500).json(error)
    }
})
// GET_FOLLOWINGS_COUNT
router.get("/followingscount/:profileId", async (req, res) => {
    try {
        const count =  await User.find({followers: req.params.profileId})
      
        return res.status(200).json(count.length)
    } catch (error) {
        return res.status(500).json(error)
    }
})

//GET FOLLOWERS
router.get("/followers/:profileId/:count/:page", async (req, res) => {
    const page = (req.params.page - 1) * req.params.count
    try {
        // console.log(req.params.profileId)
         const followers = await User.find({followings: req.params.profileId}).skip(page).limit(req.params.count)
         
         const correctInfo = followers.map(user => {
 
             const {password, isAdmin, ...other} = user._doc
             return other
         })
         return res.status(200).json(correctInfo)
     } catch (error) {
         return res.status(500).json(error)
     }
})
//GET_FOLLOWERS_COUNT
router.get("/followerscount/:profileId", async (req, res) => {
    try {
        const count =  await User.find({followings: req.params.profileId})
        console.log(count.length)
        return res.status(200).json(count.length)
    } catch (error) {
        return res.status(500).json(error)
    }
})
//PUDATE USER
router.put("/updateUser/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const hashPassword = await bcrypt.hash(req.body.password)
                req.body.password = hashPassword
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
            })
            res.status(200).json("Account has been updated")
        } catch (error) {
            return res.status(500).json(error)
        }
    }else{
        return res.status(403).json("You can update only your account")
    }
})


module.exports = router



