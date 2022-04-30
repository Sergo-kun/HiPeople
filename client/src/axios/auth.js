import axios from "axios"


const server = "http://localhost:3088/api"

export const authApi =  async () => {
   
    const token = localStorage.getItem('token')
   
    try {
        const response = await axios.get(`${server}/auth/auth`,
        {headers:{Authorization:`Bearer ${token}`}}
        )
        localStorage.setItem('token', response.data.token)
     
        return response
        

    } catch (error) {
        console.log(error)
        localStorage.removeItem('token')
    }
   

}
export const loginApi = async (email, password) => {
    try {
        const response = await axios.post(`${server}/auth/login`,{
            email: email,
            password: password
        })
        localStorage.setItem('token', response.data.token)
        const token = localStorage.getItem('token')
        console.log(token)
        return response.data

    } catch (error) {
        console.log(error)
    }
   
}

export const registrationApi = async (username, email, password) => {
    try {
        const response = await axios.post(`${server}/auth/registration`, {
            username: username,
            email: email,
            password: password
        })
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

