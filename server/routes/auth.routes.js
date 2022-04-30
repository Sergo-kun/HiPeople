const Router = require("express")
const User = require("../model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const fileService = require('../services/fileService')
const File = require('../model/File')
const authMiddlevare = require('../middleware/auth.middleware')
const {check, validationResult} = require("express-validator")

const router = new Router()

// REGISTRATION
router.post('/registration',[
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Password must be longer that 3 and shorter that 12').isLength({min: 3, max: 12})
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({message: "Uncorrect request", errors})
        }
      
       const {username, email, password} = req.body
       const candidate = await User.findOne({email})
       if (candidate){
            return res.status(400).json({message: `User with email: ${email} already exist`})
       }
       const hashPassword = await bcrypt.hash(password, 8)
       
       const newUser = new User({username, email, password: hashPassword})
       
       const user = await newUser.save()
       
       await fileService.createDir(new File({user: user.id, name: ''}))
       
       return res.status(200).json(user)
      
    } catch (error) {
        res.status(500).send({message: "Server error"})
    }
})
// LOGIN
router.post('/login', async (req, res) => {
    try {
       const {email, password} = req.body
       const user = await User.findOne({email})
       if (!user){
           return res.status(404).json({message: "User not found"})
       }
       const isPassValid = bcrypt.compareSync(password, user.password)
       if (isPassValid){
        return res.status(400).json({maessage: "Invalid password"})
       }
       const token = jwt.sign({_id: user.id}, config.get("secretKey"), {expiresIn: "1h"}) // может быть user._id
      return res.json({
          token,
          user:{
             id: user.id,
             username: user.username,
             email: user.email,
             city: user.city,
             from: user.from,
             relationship: user.relationship,
             desc: user.desc,

             profilePicture : user.profilePicture,
             coverPicture: user.coverPicture,
             followers: user.followers,
             followings: user.followings,
             diskSpace: user.diskSpace,
             usedSpace: user.usedSpace
          }
      })
    } catch (error) {
        res.status(500).send({message: "Server error"})
    }
})

router.get('/auth', authMiddlevare,  async (req, res) => {
    try {
       const user = await User.findOne({_id: req.user._id})
       const token = jwt.sign({_id: user.id}, config.get("secretKey"), {expiresIn: "1h"}) // может быть user._id
       return res.json({
           token,
           user:{
              id: user.id,
              username: user.username,
              email: user.email,
              city: user.city,
              from: user.from,
              relationship: user.relationship,
              desc: user.desc,
              profilePicture : user.profilePicture,
              coverPicture: user.coverPicture,
              followers: user.followers,
              followings: user.followings,
              diskSpace: user.diskSpace,
              usedSpace: user.usedSpace
           }
       })
    } catch (error) {
        res.status(500).send({message: "Server error"})
    }
})

module.exports = router