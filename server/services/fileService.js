
const fs = require('fs')


//const File = require('../model/File')
const config = require('config')

class FileService {
    createDir(file) {
        
        const filePath = `${config.get('filePath')}/${file.user}/${file.path}`//если файл будет находиться в корневой папке то этот файл будет пустым
        
        return new Promise(((resolve, reject) => {
            try {
                console.log(filePath)
               if (!fs.existsSync(filePath)) { // если файл по такому пути существует тогда мы будем создавать папку
                console.log('test dfdfd')
                fs.mkdirSync(filePath)
                 return resolve({message: "File was created"})
            }else {
                
                return reject({message: "File already exist"})
            }
            } catch (error) {
                
                return reject({message: 'File error'})
            }
        }))
    }
    deleteFile(file){
        const path = this.getPath(file)
        if(file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }
    getPath(file) {
        return config.get('filePath') + '/' + file.user + '/' + file.path
    }

}



module.exports = new FileService()