const mongoose = require("mongoose")

const AlertMessage = new mongoose.Schema({
    conversationId:{
        type: String
    },
    recipient: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String,
    },
},{timestamps: true})

module.exports = mongoose.model("AlertMessage", AlertMessage)