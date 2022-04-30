const Router = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const router = new Router()
const Messages = require("../model/Message.js")
const Conversation = require("../model/Conversation.js")



//add
router.post('/', authMiddleware, async(req, res) => {
    const newMessage = new Messages({
        conversationId : req.body.conversationId,
        sender: req.user._id,
        text: req.body.text
    })
    try {
       const newConversation =  await Conversation.findByIdAndUpdate( req.body.conversationId,{updatedAt: Date.now()})
        console.log(newConversation)
        console.log('test')
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get
router.get('/:conversationId',  async (req, res) => {
    try {
        const messages = await Messages.find({conversationId : req.params.conversationId})
    res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router