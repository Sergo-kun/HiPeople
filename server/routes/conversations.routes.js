const Router = require('express')
const router = new Router()
const Conversation = require("../model/Conversation")
const authMiddleware = require('../middleware/auth.middleware')
const Messages = require("../model/Message.js")
const AlertMessage = require("../model/AlertMessage.js")


//new conv
router.post("/", authMiddleware,async (req, res) => {
    const newConversation = new Conversation({
        member: [req.user._id, req.body.receiverId],
    })
    
   
    try {
        const alreadyConversation = await Conversation.findOne({
            member : { $in : [ req.body.receiverId]}
        })
       
        
        if (alreadyConversation) {
            
            console.log(alreadyConversation._id.toString())
            const messages = await Messages.find({conversationId :alreadyConversation._id.toString()})
            return res.status(200).json({message: "Already", messages: messages})

        }else {
            
            const savedConversation = await newConversation.save()
            const messages = await Messages.find({conversationId :savedConversation._id.toString()})
            return res.status(200).json({savedConversation , messages})
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})
//get conv of user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const conversation = await Conversation.find({
            member : { $in : [req.user._id]}
        }).sort({updatedAt: -1})
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
})






module.exports = router