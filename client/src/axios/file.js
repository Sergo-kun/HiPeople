import axios from "axios"

import { showUploaderSuccess, addUploaderFileSuccess, changeUploadFileSuccess} from "../redux/uploadReducer"

const server = "http://localhost:3088/api"
const token = localStorage.getItem('token')
export const getFiles = async (dirId) => {
    try {
        const response = await axios.get(`${server}/files${dirId ? '?parent='+dirId : '' }`, {
            headers:{Authorization:`Bearer ${token}`}
        })
        
        return response
    } catch (error) {
        alert(error)
    }
}
export const createDir = async (dirId, name) => {
    try {
        const response = await axios.post(`${server}/files`,{
            name,
            parent: dirId,
            type: 'dir'
        }, {
            headers:{Authorization:`Bearer ${token}`}
        })
        console.log(response.data)
        return response
    } catch (error) {
        alert(error)
    }
}
export const addPostApi = async (file, text) => {
    console.log(text)
    try {
        const formData = new FormData()
        if (file === null) {
            formData.append('desc', text)
        }else if (text === null){
            formData.append('file', file)
        }else{
            formData.append('file', file)
            formData.append('desc', text)
        }
       
        const response = await axios.post(`${server}/posts`, formData, {
            headers:{Authorization:`Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        alert(error)
    }
}
export const uploadFile = async (file, dirId, dispatch) => {
    
    try {
        const formData = new FormData()
        formData.append('file', file)
        if (dirId) {
            formData.append('parent', dirId)
        }
       const uploadFile = ({name: file.name, progress: 0, id: Date.now})
       dispatch(showUploaderSuccess())
       dispatch(addUploaderFileSuccess(uploadFile))
      
        const response = await axios.post(`${server}/files/upload`,formData, {
            headers:{Authorization:`Bearer ${token}`},
            onUploadProgress: progressEvent => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
            console.log(totalLength+'total')
            if(totalLength) {
                uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                dispatch(changeUploadFileSuccess(uploadFile))
            }
            }
        })
        console.log(response.data)
        return response.data
       
       
    } catch (error) {
        alert(error)
    }
}

export const downloadFile = async (file) => {
    console.log(file._id)
    try {
        
        const response = await fetch(`${server}/files/download?id=${file._id}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        if (response.status === 200) {
            const blob = await response.blob()//получили с сервера файл в бинарном виде
            const downloadUrl = window.URL.createObjectURL(blob)//преобразуэм в нормальный файл
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            link.remove()

        }
    } catch (error) {
        alert(error)
    }
}
export const deleteFile = async(file) => {
    console.log(file)
    try {
        const response = await axios.delete(`${server}/files?id=${file._id}`,
        { headers:{Authorization:`Bearer ${token}`}
    })
        alert(response.data.message)
        return file._id
    } catch (error) {
        
    }
}
export const uploadAvatar = async(file) => {
    try {
        const formData = new FormData()
        formData.append('file',file)
        const resopnse = await axios.post(`${server}/files/avatar`,formData,
        {headers:{Authorization:`Bearer ${token}`}})
        return resopnse.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteAvatar = async() => {
    try {
        
        const resopnse = await axios.delete(`${server}/files/avatar`,
        {headers:{Authorization:`Bearer ${token}`}})
        return resopnse.data
    } catch (error) {
        console.log(error)
    }
}
   
   