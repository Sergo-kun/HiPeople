const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const AlertMessage = require('../model/AlertMessage.js')


// add alert about message
router.post("/message", authMiddleware, async (req, res) => {
    
    try {
        const newAlert = new AlertMessage({
            conversationId: req.body.conversationId,
            recipient: req.body.recipient,
            sender:  req.user._id,
            text: req.body.text
        })
        console.log(newAlert)
        const saverAlert = await newAlert.save()
        res.status(200).json(saverAlert)
    } catch (error) {
        res.status(500).json(error)
    }
})











module.exports = router