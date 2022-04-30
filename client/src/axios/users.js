import axios from "axios";


const server = "http://localhost:3088/api"
const token = localStorage.getItem('token')


export const getUserApi = async (id) => {
    try {
     return await axios.get(`${server}/user/${id}`).then(response => {
            
            return response.data
        }) 
        
        
    } catch (error) {
        return error
    }
}
export const followUnfollowApi = async (userId) => {
    try {
        console.log(userId)
        console.log(server)
        console.log(token)
        const response = await axios.put(`${server}/user/${userId}/follow`,{},
        {
            headers:{Authorization:`Bearer ${token}`}
    })
        return response
    } catch (error) {
        return error
    }
}
export const getFollowingsApi = async (userId) => {
    try {
        const response = await axios.get(`${server}/user/followings/${userId}`)
        return response.data
    } catch (error) {
        return error
    }
}
export const getFollowingsCountApi = async (profileId, userId) => {
    let id
    if (userId !== undefined){
        id = userId
    }else{
        id=profileId
    }
    try {
       const response = await axios.get(`${server}/user/followingscount/${id}`)
       return response.data
    } catch (error) {
        return error
    }
}
export const getFollowersCountApi = async (profileId, userId) => {
    let id
    if (userId !== undefined){
        id = userId
    }else{
        id=profileId
    }
    try {
       const response = await axios.get(`${server}/user/followerscount/${id}`)
       return response.data
    } catch (error) {
        return error
    }
}
//get followings without paginator
export const getFollowingsForOnline = async(profileId) => {
   
    try {
        const response = await axios.get(`${server}/user/followings/${profileId}`)
      
        return response.data

    } catch (error) {
        return error
    }
}

