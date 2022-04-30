import './infoUser.css'
import CheckIcon from '@mui/icons-material/Check';
import unknownProfile from "../../assets/usersPhoto/noProfile.png"
import background from "../../assets/background.jpg"
import Share from '../Share/Share'
import { postConversationThunk } from '../../redux/conversationReducer';
import { getFollowingsCountThunk, getFollowersCountThunk } from '../../redux/authReducer';
import { API_URL } from '../../config';
import { followUnfollowThunk } from '../../redux/usersReducer';
import { connect, useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


const InfoUser = (props) => {
    const profileId = useSelector(state => state.auth.currentUser.id)
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [unfollowEl, setUnfollowElEl] = useState(null);
    
    const unfollowClick = (event) => {
      setUnfollowElEl(event.currentTarget);
    };

    //////////////////////////////////////////////count followers followings
    
    console.log(props.user._id)
    
    useEffect( () =>  {
    
        props.getFollowingsCountThunk(profileId ,props.user._id)
        props.getFollowersCountThunk(profileId ,props.user._id)
       

      
     
    },[])






    //////////////////////////////////////////////
    
    const handleClick = (event) => {
      
      setAnchorEl(event.currentTarget);
    };

    const followClick = () => {
      unfollowClose()
      props.followUnfollowThunk(props.user._id)
      
    }
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    const unfollowClose = () => {
      setUnfollowElEl(null);
    };

    const postConversationHeandler = () => {
      props.postConversationThunk(props.user._id)
    }


    const countFollowersStyle = {
      "marginLeft": "70%",
             "marginTop": -20,
              "color": "white", 
              "backgroundColor": "rgb(94, 165, 170)",
              "width" : "10%"
    }
    

    const avatar = props.user.profilePicture ? `${API_URL + props.user.profilePicture}` : unknownProfile
    const open = Boolean(anchorEl);
    const openUnfollow = Boolean(unfollowEl);
    const id = open ? 'simple-popover' : undefined;
    const idUnfollow = openUnfollow ? 'simple-popover' : undefined;
return(
    <div className="profile">
    <div className="profileInfo">
        <img src={background} className="background"/>
        <img src={avatar} className="profileImg"/>
        <div className="userName">{props.user.username ? props.user.username : ''}</div>
        <div className="userName">{props.user.desc ? props.user.desc : ''}</div>
        
        <div className="undername">
            
            <Link to="/followers" className="element"><p>Followers<div  style={countFollowersStyle}>{props.follwersCount ? props.follwersCount : ''}</div></p></Link>
            <Link to="/followings" className="element"><p>Followings<div 
            style={countFollowersStyle}>{props.followingsCount ? props.followingsCount : ''}</div></p></Link>
            <Link to='/files' className="element"><p>Files</p></Link>
            <div className="element" aria-describedby={id} variant="contained" onClick={handleClick}><p>Information</p></div>
            {!props.user._id ||props.user._id ===  profileId? "" :<Link to='/messages' className="element" onClick={() => postConversationHeandler()}><p>Write</p></Link>}
            {!props.user._id ||props.user._id ===  profileId? "" : (
             !props.user.followers.includes(profileId) ? <button className='element' onClick={() => followClick()}>follow</button> : 
              <button className='element' aria-describedby={idUnfollow} variant="contained" onClick={unfollowClick}  >followed<CheckIcon style={{marginTop: -10}} color="success"/></button>)
             }
              <Popover
        id={idUnfollow}
        open={openUnfollow}
        anchorEl={unfollowEl}
        onClose={unfollowClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}><p>Ты правда хочешь отписатся?</p>
        <button onClick={() => followClick()}>OK</button>
        <button onClick={unfollowClose}>Нет</button></Typography>
      </Popover>
      
<Popover
  id={id}
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
>
  <Typography sx={{ p: 2 }}>
      {props.user.city ?  <div>city: {props.user.city}</div> : ''}
      {props.user.from ?  <div>from: {props.user.from}</div> : ''}
      
    
     {props.user.relationship ? <div>relationshep: {props.user.relationship === 1 ? 
     "DEAD INSIDE" : props.user.relationship === 2 ?
      "Встречаюсь": props.user.relationship === 3? 
      "Женат" : ""}</div> : " "}
     
      </Typography>
</Popover>
            
        </div>

        {!props.user._id ||props.user._id ===  profileId?  <Share profilePicture={props.user.profilePicture} userId={props.user.id}/>: ''}
        
      
            
            
        
     
    </div>
   
    
  
 </div>
)
}
const mapStateToProps = (state) => {
  return{
    followingsCount: state.auth.followingsCount,
    follwersCount: state.auth.followersCount
  }
}

export default connect(mapStateToProps,{followUnfollowThunk, getFollowingsCountThunk, getFollowersCountThunk, postConversationThunk})(InfoUser)