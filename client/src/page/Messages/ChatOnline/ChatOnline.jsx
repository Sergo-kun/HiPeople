import { useState } from 'react'
import { useEffect } from 'react'
import { getFollowingsForOnline } from '../../../axios/users'
import Sniper from '../../../assets/__Iphone-spinner-1.gif'
import './chatOnline.css'
import noPhoto from '../../../assets/usersPhoto/noProfile.png'


const ChatOnline = ({conversations, currentUser, onlineUsers}) => {

    const [followings, setFollowings] = useState()
    const [userOnline, setUserOnline] = useState()
    
    useEffect(() => {
        const getFollowings = async() => {
            const data = await getFollowingsForOnline(currentUser.id)
            setFollowings(data)
        }
        getFollowings()
        console.log(followings)
        console.log(onlineUsers)
   
    },[])
    useEffect(() => {
    
        setUserOnline(followings?.filter((f) => onlineUsers.includes(f._id)))
    },[followings, onlineUsers])

    return(
        <>{userOnline ? userOnline.map(u =>  <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className='chatOnlineImg' src={ u.profilePicture ? "http://localhost:3088/"+u.profilePicture : noPhoto}/>
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{u.username}</span>
        </div>
    </div>) : <img src={Sniper}/>}</>
        
    )
}

export default ChatOnline