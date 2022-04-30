import { useEffect } from "react"
import Header from "../../components/Header/Header"
import LeftBat from "../../components/LeftBar/LeftBat"
import MiniInfo from "../../components/MiniInfo/MiniInfo"
import preloader from "../../assets/__Iphone-spinner-1.gif"
import axios from "axios"
import './users.css'

import { useState } from "react"

const Users = () => {
    const [userState, setUserState] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    console.log(currentPage)
   
    useEffect( () =>  {
       
            if(fetching) {
                const server = "http://localhost:3088/api"
                axios.get(`${server}/user/getUsers/5/${currentPage}`)
                .then(response => {
                    setUserState([...userState, ...response.data])
                    setCurrentPage(prevState => prevState + 1)
                }).finally(() => setFetching(false))
               
               
               
                
               
                
                
                
                    
                
            }
            
        },[fetching])
    useEffect(() => {
        document.addEventListener('scroll', skrollHeandler)
        return function(){
            document.removeEventListener('scroll', skrollHeandler)
        }
    },[])
    const skrollHeandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }
        
    }
    
    return (
        <>

        <Header/>
        <LeftBat/>
        <div className="users">
          {!userState ? <img src={preloader}/> : 
          userState.map(u => <MiniInfo users={u}/>)}    
          
        </div>
        </>
    )
    
}


export default Users