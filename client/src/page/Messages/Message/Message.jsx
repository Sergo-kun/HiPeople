import {format} from "timeago.js"
import { useDispatch, useSelector } from 'react-redux'
import './message.css'
import { useEffect } from "react"
import { API_URL } from "../../../config"
import { removeAlertsAboutMessageSuccess } from "../../../redux/conversationReducer"



const Message = ({message,  setActiveConversation, alerts, receiverId}) => {
const dispatch = useDispatch()
const profileId = useSelector(state => state.auth.currentUser.id)
useEffect(() => {
    setActiveConversation(message.conversationId)
    const senderApiHeandler = () => {

    }
    senderApiHeandler()
   
}, [])
useEffect(() => {
    if (alerts  !== [] && alerts[alerts.length-1]?.senderId !== profileId) {
        dispatch(removeAlertsAboutMessageSuccess(message.sender))
    }
},[alerts.length])

    return(
        <div className={message.sender ==  profileId? "message own" : "message"}>
            <div className="messageTop">
                <img src='https://i.pinimg.com/564x/d0/03/9f/d0039f822dc8e92405c814e8ff39ef54.jpg'
                alt=""
                className='messageImg'
                />
                <p className='messageText'>{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}


export default Message