
import { useState } from 'react'
import { useEffect } from 'react'
import { API_URL } from '../../../config'
import noPhoto from '../../../assets/usersPhoto/noProfile.png'
import Sniper from '../../../assets/__Iphone-spinner-1.gif'
import io from 'socket.io-client'
import './conversation.css'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveMembersSuccess } from '../../../redux/conversationReducer'


const Conversation = ({setIdActiveSender, conversations, getUserForConversation, getMessagesThunk, setActiveConversation, activeConversation, setReceiverId, setActiveMembers, alerts}) => {

const dispatch = useDispatch()

const authId = useSelector(state => state.auth.currentUser.id)

    const [alertsMessage, setAlertsMessage] = useState([])
   
    
    const [user, setUser] = useState(false)
    const userId = conversations.member.filter(id => id !== authId)
    //const activeConversation = useSelector(state => state.messanger.messages[0].conversationId)
    useEffect(() => {
     
        const getUser = async() => {
           const userApi =  await getUserForConversation(userId)
           setUser(userApi)
            
        }
        getUser()  
       
        
        
    },[])
    
    
    useEffect(() => {
        alerts.map(alert => {
           
            alertsMessage.map(al => {
                console.log(al.createdAt)
                console.log(alert.createdAt)
                if (al.createdAt === alert.createdAt)  return true})
            if (alert.sender === userId[0] ){
                setAlertsMessage([...alertsMessage, alert])
            }

        })
        console.log(alertsMessage)
       
    },[alerts])

    const getMessage = () => {
        setAlertsMessage([])
        setIdActiveSender(userId)
        setReceiverId(userId)
        setActiveConversation(conversations._id)
        getMessagesThunk(conversations._id)
        dispatch(setActiveMembersSuccess(conversations.member))
        
    }
   
    const countMessagesStyle = {
        "marginLeft": "25%",
        "text-align": "center",
        "border-radius": "50%",
                "color": "rgb(94, 165, 170)", 
                "backgroundColor": "white",
                "width" : "5%"
      }
    
    return (
        <>
        {user ?  <div className={ activeConversation == conversations._id ? 'activeConversation' :"conversation"} onClick={() => getMessage()}>
        <img src={user.profilePicture? API_URL+user.profilePicture : noPhoto}
         alt="" className="conversationImg" />
         <span className='conversationName'>{user.username}</span>
         <div style={countMessagesStyle}>{alertsMessage.length > 0 ? alertsMessage.length : "" }</div>
    </div> : <img src={Sniper}/>}
    <br/>
    </>
        
    )
}


export default Conversation