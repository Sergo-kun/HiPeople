const express = require("express")



const mongoose = require("mongoose")
const config = require("config")
const authRouter = require('./routes/auth.routes.js')
const userRouter = require('./routes/users.routes.js')
const fileRouter = require('./routes/file.routes.js')
const postRouter = require('./routes/post.routes.js')
const conversationsRouter = require('./routes/conversations.routes.js')
const messagesRouter = require('./routes/messages.routes.js')
const alertRouter = require("./routes/alert.routes.js")
const app = express()





const PORT = config.get("serverPort")
const corsMiddleware = require('./middleware/cors.middleware.js')
const fileUpload = require('express-fileupload')

/*app.get('/', (req, res) => {
    io.on('connection', (socket) => {
        console.log('socket connected', socket.id)
    })
})*/

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json()) //по умолчанию express не может роспарсить json строку по этому
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/files', fileRouter)
app.use('/api/posts', postRouter)
app.use('/api/conversations', conversationsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/alert', alertRouter)




const start = async () => {
    try{
        mongoose.connect(config.get("dbUrl"))
      
     
        app.listen(PORT, () => {
            console.log(`Server has been started at ${PORT}`)
        })
    }catch(err){
      console.log(err)  
    }
}

start()

