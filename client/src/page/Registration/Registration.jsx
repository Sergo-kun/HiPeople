import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./registration.css"
 const Registration = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [secondPassword, setSecondPassword] = useState()

    const handleName = (e) =>{
        setName(e.target.value)
        
    }
    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value)
    }
    const handleSecondPassword = (e) =>{
        setSecondPassword(e.target.value)
        
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (password !== secondPassword) {
            alert("Password don`t match!")
        } 


        
       
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
                    <form className="loginBox">
    
                        <input placeholder='Username'
                          className="loginInput" 
                         value={name}
                          onChange={handleName}
                          required
                          />
                        <input placeholder='Email'
                         type="email" 
                         className="loginInput" 
                         value={email}
                         onChange={handleEmail}
                         required
                         />
                        <input placeholder='Password'
                         type="password" 
                         className="loginInput" 
                         value={password}
                         onChange={handlePassword}
                         minLength="6"
                         required
                         />
                        <input placeholder='Password again'
                         type="password"
                          className="loginInput"
                          value={secondPassword}
                          onChange={handleSecondPassword}
                          minLength="6"
                          required
                          />
                        <button type="submit" className="loginButton" onSubmit={handleClick}>Sign Up</button>
                        <button className="loginRegisterButton">
                            <Link to="/login" className='toLogin'>
                         Log into Account
                        </Link>
                        </button>
                          
                        
                    </form>
                </div>
            </div>
        </div>
           
  </>
  );
}

export default Registration

