import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Profile from "./page/Profile/Profile";
import { Route, Routes, Navigate } from "react-router-dom";
import { useRef } from "react";
import Files from "./page/Disk/Disk";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import Users from "./page/Users/Users";
import Registration from "./page/Registration/Registration";
import { authThunk, logoutThunk } from "./redux/authReducer"
import User from "./page/User/User";
import Settings from "./page/Settings/Settings";
import Followers from "./page/Followers/Followers";
import Followings from "./page/Followings/Followings";
import Messages from "./page/Messages/Messages";
import { addAlertsAboutMessageSuccess } from "./redux/conversationReducer";
import io from "socket.io-client"
import {setSocketMessage} from "./redux/conversationReducer"






function App(props) {
  const dispatch = useDispatch()
  const socket = useRef()
  const [arrivalMessage, setArrivalMessage] = useState(null)
  useEffect(() => {
    socket.current = io("ws://localhost:8900")
    socket.current.on("getMessage", data => {
      dispatch(addAlertsAboutMessageSuccess({
        sender: data.senderId,
        text : data.text,
        createdAt: Date.now()
    }))
    setArrivalMessage({
            sender: data.senderId,
            text : data.text,
            createdAt: Date.now()
        })
        
    })
},[])
useEffect(() => {
  arrivalMessage && console.log('test' + arrivalMessage)
 
  //
  if (arrivalMessage && props.activeMembers?.includes(arrivalMessage.sender)) {
    props.activeMembers?.includes(arrivalMessage?.sender) && console.log('test two')
      console.log("works")
      props.setSocketMessage(arrivalMessage)
      console.log(arrivalMessage)
  }
 
 
},[arrivalMessage])
useEffect(() => {
  if (props.currentUser?.id){
    socket.current.emit("addUser", props.currentUser.id)
    socket.current.on("getUsers", users => {
       
        console.log(users)
    })
  }
 
},[props.currentUser])

  useEffect(() => {
    props.authThunk()

    
  }, [])
  useEffect(() => {
    if (!props.currentUser){
      props.logoutThunk()
    }
  },[props.currentUser])
  
  
  return (
    <>
    <Routes>
      <Route path="/" element={!props.isAuth ? <Login/> : <Home/>}/>
      <Route path="/users" element={!props.isAuth ? <Login/> : <Users/>}/>
      <Route path="/files" element={!props.isAuth ? <Login/> : <Files/>}/>
      <Route path="/profile" element={!props.isAuth ? <Login/> : <Profile/>}/>
      <Route path="/followers" element={!props.isAuth ? <Login/> : <Followers/>}/>
      <Route path="/followings" element={!props.isAuth ? <Login/> : <Followings/>}/>
      <Route path="/messages" element={!props.isAuth ? <Login/> : <Messages/>}/>
      <Route path="/user/:id" element={!props.isAuth ? <Login/> : <User/>}/>

      <Route path="/settings" element={!props.isAuth ? <Login/> : <Settings/>}/>
      <Route  path="/login" element={props.isAuth ? <Navigate to="/"/> : <Login/>}/>
      <Route path="/register" element={props.isAuth ? <Navigate to="/"/> : <Registration/>}/>   
    </Routes>
    </>
    
  );
}

const mapStateToProps = (state) => {
  return{
    isAuth : state.auth.isAuth,
    currentUser: state.auth.currentUser,
    activeMembers:  state.messanger.activeMembers
    
    
  }
}
export default connect(mapStateToProps, {authThunk, logoutThunk, setSocketMessage})(App)

