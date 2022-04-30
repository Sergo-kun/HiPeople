import React from "react"
import { useState, useEffect } from "react"
import MiniInfo from "../../components/MiniInfo/MiniInfo"
import Header from "../../components/Header/Header"
import LeftBat from "../../components/LeftBar/LeftBat"
import axios from "axios"
import preloader from "../../assets/__Iphone-spinner-1.gif"
import { useSelector } from "react-redux"


const Followings = () => {
    const [userState, setUserState] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const authId = useSelector(state => state.auth.currentUser.id)
    console.log(authId)
    console.log(currentPage)
   
    useEffect( () =>  {
       
            if(fetching) {
                const server = "http://localhost:3088/api"
                axios.get(`${server}/user/followers/${authId}/5/${currentPage}`)
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



export default Followings