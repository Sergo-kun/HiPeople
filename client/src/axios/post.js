import axios from "axios"

const server = "http://localhost:3088/api"
const token = localStorage.getItem('token')

export const getPostApi = async (userId) => {
    try {
        const response = await axios.get(`${server}/posts/profile/${userId}`)
        return response
    } catch (error) {
       return error 
    }
   
}
export const deletePostApi = async (postId) => {
    try {
        const response = await axios.delete(`${server}/posts/${postId}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        return response
    } catch (error) {
        return error 
    }
}
export const likePostApi = async (userId, postId) => {
   
    try {
        const response = await axios.put(`${server}/posts/${postId}/like`,{
          userId: userId
        })
        return response
    } catch (error) {
        return error 
    }
}
export const getNewsApi = async (userId) => {
    try {
       const response = await axios.get(`${server}/posts/timeline/${userId}`)
       return response.data
    } catch (error) {
        return error 
    }
}
