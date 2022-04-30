import React, {useState} from "react"
import noPhoto from "../../assets/usersPhoto/noProfile.png"
import likePng from "../../assets/like.png"
import "./post.css"
import { connect } from "react-redux"
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { deletePostThunk } from "../../redux/postReducer"
//import { likePostApi } from "../../axios/post"
import { likePostThunk } from "../../redux/postReducer"



 const Post = ({post, info, deletePostThunk,profile, likePostThunk}) => {


     ///////////////////////////////////////////////////LIKE
     
    //const [like, setLike] = useState(post.likes.length)
   // const [islike, setIsLike] = useState(false)
    
    const likeFunction = () => {
        console.log('like')
        likePostThunk(profile.id, post._id)
        
      //  setLike(!islike  ? like+1 : like-1)
        //setIsLike(!islike)
       
    }
    ////////////////////////////////////////////////POPUPER
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    ////////////////////////////////////////////DELETE POST
    const deletePostHeandler = () => {
        deletePostThunk(post._id, post.userId)
    }
  

    return (
        <>
        {!info ? noPhoto :  <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                   
                   <img className="postProfileImg"
                    alt="" 
                    src={'http://localhost:3088/'+info.profilePicture}
                    />
                   
                    <span className="postUserName">
                       {info.username}
                        </span>
                    <span className="postDate"></span>
                </div>
                <div className="postTopRight">
              {info.id === post.userId ? <button aria-describedby={id} variant="contained" onClick={handleClick}>delete</button> : '' } 
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
        <p>Ты правда хочешь удалить этот пост?</p>
        <button onClick={() => deletePostHeandler()}>OK</button>
        <button onClick={handleClose}>Нет</button>
    </Typography>
  </Popover>
                </div>
            </div>
            <div className="postCenter">
                <div className="postText">{post.desc}</div>
                <img src={'http://localhost:3088/'+post.content} alt="" className="postImg"/>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={likePng} alt="" className="likeIcon" onClick={() => likeFunction()}/>
                    <span className="postLikeCounter">{post.likes.length} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText"> comments</span>
                </div>
            </div>
        </div>
    </div>}
    </>
    )
}

const mapStateToProps = (state) => {
    return {
      profile: state.auth.currentUser
    }
}

export default connect(mapStateToProps,{deletePostThunk, likePostThunk})(Post)


