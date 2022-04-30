import axios from "axios";

const server = "http://localhost:3088/api"
const token = localStorage.getItem('token')

export const getConversationApi = async () => {
    try {
      const response = await  axios.get(`${server}/conversations`,{
            headers:{Authorization:`Bearer ${token}`}
        } )
     
        return response.data
    } catch (error) {
        return error
    }
}
export const getMessagesApi = async (conId) => {
    try {
        const response = await axios.get(`${server}/messages/${conId}`)
        
        return response.data
    } catch (error) {
        return error
    }
}
export const postMessageApi = async (conId, text) => {
    try {
        const response = await axios.post(`${server}/messages`,{
            conversationId : conId,
	        text : text
        }, {
            headers:{Authorization:`Bearer ${token}`}
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        return error
    }
}
export const postConversationApi = async(receiverId) => {
    try {
        const response = await axios.post(`${server}/conversations`,{
            receiverId : receiverId,
	        
        }, {
            headers:{Authorization:`Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        return error
    }
}


