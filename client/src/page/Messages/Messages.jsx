import React, {useEffect, useState} from "react"
import { connect } from "react-redux"
import Header from "../../components/Header/Header"
import LeftBat from "../../components/LeftBar/LeftBat"
import ChatOnline from "./ChatOnline/ChatOnline"
import Conversation from "./Conversation/Conversation"
import Message from "./Message/Message"
import { getConversationThunk, getMessagesThunk, postMessageThunk , setSocketMessage } from "../../redux/conversationReducer"
import { getUserApi } from "../../axios/users" 
import Sniper from "../../assets/__Iphone-spinner-1.gif"
import './messages.css'
import { useRef } from "react"
import io from "socket.io-client"




const Messages = ({arrivalMessage, getConversationThunk, conversations, getMessagesThunk, messages, postMessageThunk, isFetching, currentUser, setSocketMessage, alerts}) => {

    
    const [text, setText] = useState()
    const [activeConversation, setActiveConversation] = useState(messages[0])
    const [activeMembers, setActiveMembers] = useState()
    const [idActiveSender, setIdActiveSender] = useState()
    const scrollRef = useRef()
    //////////////////////////socket
    const [onlineAll, setOnlineAll] = useState([])
    
   const [onlineUsers, setOnlineUsers] = useState([])
  
    const [receiverId, setReceiverId] = useState(null)
   // const [arrivalMessage, setArrivalMessage] = useState(null)
    const socket = useRef()
    socket.current = io("ws://localhost:8900")
   /* useEffect(() => {
      
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text : data.text,
                createdAt: Date.now()
            })
        })
    },[])*/
  /*  useEffect(() => {
        arrivalMessage && console.log('test' + arrivalMessage)
        console.log(arrivalMessage)
        activeMembers?.includes(arrivalMessage.sender) && console.log('test two')
        if (arrivalMessage && activeMembers.includes(arrivalMessage.sender)) {
            console.log("works")
            setSocketMessage(arrivalMessage)
        }
       
       
    },[arrivalMessage])*/
    
    
    useEffect(() => {
       // socket.current.emit("addUser", currentUser.id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(currentUser.followings.filter(f => users.some(u => u.userId === f)))
            setOnlineAll(users)
            
        })
    },[currentUser, onlineAll])
    


useEffect(() => {
    getConversationThunk()
}, [])

const getUserForConversation = async(id) => {

    return  await getUserApi(id)
}
const textHandler = (e) => {
    setText(e.target.value)
    
}

const sendMessage = () => {
    postMessageThunk(activeConversation, text)
    console.log(receiverId)
   
    socket.current.emit("sendMessage", {
       senderId: currentUser.id,
       receiverId: receiverId[0],
       text


    })
    setText("")
    console.log(receiverId[0])
    onlineAll.find((i) => i.userId === receiverId[0]) && console.log(receiverId[0] + "is online" + activeConversation)// 

}
useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: "smooth"})
},[messages])



return (
    <div>
        
    <Header/>
    <LeftBat/>
    {!conversations ? <img src={Sniper}/> : 
    <div className="messager">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder="Search for friends" className="chatMenuInput"/>
               {conversations ? conversations.map((con) =>  
               <Conversation 
               setIdActiveSender={setIdActiveSender}
               alerts={alerts}
               activeConversation={activeConversation}
               setActiveConversation={setActiveConversation}
               getMessagesThunk={getMessagesThunk}
               key={con._id} 
               conversations={con}
               getUserForConversation={getUserForConversation}
               setReceiverId={setReceiverId}
               setActiveMembers={setActiveMembers}
               />) :
                <div><img src={Sniper}/></div>}
                
            </div>
        </div>
      {messages ?  <div className="chatBox">
        <div className="chatBoxWrapper">
        <div className="chatBoxTop">
            {isFetching ? <img src={Sniper}/> : messages.map((m)=> <div ref={scrollRef}><Message receiverId={receiverId} alerts={alerts}  setActiveConversation={setActiveConversation} message={m} key={m._id}/></div>)}
            
        </div>
        <div className="chatBoxBottom">
            <textarea value={text} onChange={(e) => textHandler(e)} className="chatMessageInput" placeholder="write something..."/>
            <button className="chatSendButton" onClick={() => sendMessage()}>Send</button>
        </div>
        </div>
               </div> : ''}
        <div className="chatOnline">
        <div className="chatOnlineWrapper">
            <ChatOnline conversations={conversations} currentUser={currentUser} onlineUsers={onlineUsers}/>
          
        </div>
        </div>
    </div>}
    </div>
)
}
const mapStateToProps = (state) => {
    return{

        conversations: state.messanger.conversations,
        messages: state.messanger.messages,
        isFetching: state.messanger.isFetching,
        currentUser: state.auth.currentUser,
        alerts: state.messanger.alerts,
        arrivalMessage: state.messanger.arrivalMessage
       
    }
}

export default connect(mapStateToProps,{getConversationThunk, getMessagesThunk, postMessageThunk, setSocketMessage})(Messages)
