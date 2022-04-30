import { connect } from 'react-redux';
import React, { useRef, useState } from 'react';
import {Link} from "react-router-dom"
import { loginThunk } from '../../redux/authReducer';


import "./login.css"

const Login = ({loginThunk}) =>  {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  
const handleEmail = (e) => {
  setEmail(e.target.value)
  
}
const handlePassword = (e) => {
  setPassword(e.target.value)
  
}

  const handleClick = async (e) => {
      e.preventDefault()
     await loginThunk(email, password)
     
  }
  return (
    <>
    <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">HIPeople</h3>
                    <span className="loginDesc">
                        Connect with friends and share files on HIPeople.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" >
                    <input placeholder='Email'
                        value={email}
                        required
                        onChange={handleEmail}
                        type="Email"
                        className="loginInput"/>
                    <input placeholder='Password'
                        onChange={handlePassword}
                        value={password}
                        minLength={6}
                        required
                        type="Password"
                        className="loginInput"/>
                        <button className="loginButton" onSubmit={handleClick} >Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" >
                            <Link to="/register" className='toRegister'>
                        Create a New Account
                        </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
  </>
  );
}

let mapStateToProps = (state) => {
  return{
    user: state.auth.currentUser
  }
}

export default connect(mapStateToProps,{loginThunk})(Login)
