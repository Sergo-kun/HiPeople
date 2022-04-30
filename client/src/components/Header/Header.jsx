import React from 'react';
import "./header.css"
import noPhoto from "../../assets/usersPhoto/noProfile.png"
import { connect, useSelector } from 'react-redux';
import {logoutThunk} from "../../redux/authReducer"
import { API_URL } from '../../config';


const Header = ({logoutThunk}) => {
     const isAuth = useSelector(state => state.auth.isAuth)
     const currentUser = useSelector(state => state.auth.currentUser)
     let avatar
     if(currentUser){
           avatar = currentUser.profilePicture  ? `${API_URL + currentUser.profilePicture}` : noPhoto
     }
     const logout = () => {
        
          logoutThunk()
          

     }
  return (
       <div className="header">
           <div className='logo'>
            HIPeople
           </div>
           <div className='search'>
                <input className='searchInput' placeholder='Search'/>
           </div>
           <div className='leftItem'>
                <button onClick={logout} className='buttonLogin'>LogOut</button>
                
               <img className='imgProfile' src={avatar}/>
           </div>
       
       </div>
   
    
        );
};

let mapStateToProps = (state) => {
     return{
       user: state.auth.currentUser
     }
   }
   
   export default connect(mapStateToProps,{logoutThunk})(Header)

