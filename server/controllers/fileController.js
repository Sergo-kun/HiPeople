const fileService = require('../services/fileService.js')
const User = require('../model/User.js')
const File = require('../model/File.js')
const Post = require('../model/Post')
const fs = require('fs')
const config = require('config')
const Uuid = require('uuid')

class FileController {
    
    async createDir(req, res) {
        
        try {
           
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user._id})
           
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile) { // если родительський файл небыл найден
               
                file.path = name // то файл будет добавлен в корневую дерикторию
                await fileService.createDir(file)
            } else {// если родительський файл был найден 
                
                file.path = `${parentFile.path}/${file.name}` // то сначала добавляем родительський путь и пеплюсовуем имя файла
                await fileService.createDir(file) // создаем директорию
                parentFile.childs.push(file._id) // и в масив childs айдишник только созданного файла
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }
    async getFiles(req, res) {
        try {
            const files = await File.find({user: req.user._id, parent: req.query.parent})
            return res.json(files)
        } catch (error) {
            return res.status(500).json({message: "Can not get files"})
        }
    }
    async uploadFile(req, res){
        try {
            const file = req.files.file
            
            const parent = await File.findOne({user: req.user._id, _id: req.body.parent})
            
            const user = await User.findOne({_id: req.user._id})
           
            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: "There no space on the disk"})
            }
            user.usedSpace = user.usedSpace + file.size

            let path
            if (parent) {
                path = `${config.get('filePath')}/${user._id}/${parent.path}/${file.name}`
            }else{
                path = `${config.get('filePath')}/${user._id}/${file.name}`
            }
            if (fs.existsSync(path)){
                return res.status(400).json({message: 'File already exist'})
            }
            file.mv(path)
            const type = file.name.split('.').pop()
            let filePath = file.name
            if (parent) {
                filePath = parent.path + '/' + file.name
            }
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id
            })
            await dbFile.save()
            await user.save()

            res.json(dbFile)
        
        }catch(err){
            console.log(err)
            return res.status(500).json({message: "Upload error"})
        }
    }

    async downloadFile(req, res){
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user._id})
            console.log(file)
            const path = config.get('filePath') + '/' + req.user._id + '/' + file.path 
            console.log(path)
            if (fs.existsSync(path)){
                return res.download(path, file.name)
            }
            return res.status(400).json({message: "Download error"})
        } catch (error) {
            console.log(error)
            res.status(500).json({maessage: "Download error"})
        }
    }
    async deleteFile(req, res){
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user._id})
            if (!file){
                return res.status(400).json({message: 'file not found'})
            }
            fileService.deleteFile(file)
            await file.remove()
            return res.json({message: 'File was deleted'})
        } catch (error) {
            console.log(e)
            res.status(400).json({message: 'Dir is not empty'})
        }
    }

    async uploadAvatar(req, res){
        try {
            const file = req.files.file
            const user = await User.findById(req.user._id)
            const avatarName = Uuid.v4() + '.jpg'
            file.mv(config.get('staticPath') + '/' + avatarName)
            user.profilePicture = avatarName
            await user.save()
            return res.json(user)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Upload avatar error'})
        }
    }
    async addPost(req, res){
       
        try {
            const file = req.files.file
            const desc = req.body.desc
            //console.log(file)
            console.log(desc)
            const postName = Uuid.v4() + '.jpg'
            file.mv(config.get('staticPath') + '/' + postName)
            const newPost = new Post({userId: req.user._id, desc: desc, content: postName})
             //const newPost = new Post(req.body)
            const savedPost = await newPost.save()
           return res.json(savedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }
   
    async deleteAvatar(req, res){
        try {
            const user = await User.findById(req.user._id)
            fs.unlinkSync(config.get('staticPath') + '/' + user.profilePicture)
            user.profilePicture = null
            await user.save()
            return res.json(user)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Delete avatar error'})
        }
    }
    async deletePost(req, res) {
        console.log('delete')
        try {
            const post = await Post.findById(req.params.postId)
            console.log(post)
            if (req.user._id !== post.userId ){
                return res.status(403).json({message: "You can delete only your post"})
            }
            fs.unlinkSync(config.get('staticPath') + '/' + post.content)
            await Post.findByIdAndDelete(req.params.postId)
            return res.json({message: "Post was deleted"})

        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Delete post error'})
        }
    }

}


module.exports = new FileController()