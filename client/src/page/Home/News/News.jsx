
import React, {useState, useEffect} from "react"
import axios from 'axios'
import { likePostThunk } from "../../../redux/postReducer"
import {MoreVert} from "@mui/icons-material"
import like from '../../../assets/like.png'
import { Link } from "react-router-dom"
import { getUserApi } from "../../../axios/users"
import preloader from "../../../assets/__Iphone-spinner-1.gif"
import { connect } from "react-redux"
import { likePostApi } from "../../../axios/post"
const News = ({post, id, likePostThunk}) => {

const [info, setInfo] = useState([]);
const [likes, setLikes] = useState(post.likes)
    let user
useEffect(async() => {
  user = await getUserApi(post.userId)
  setInfo(user)
 
},[])
const likeFunction = async() => {
    console.log('like')
   const info = await likePostApi(id, post._id)
   console.log(info.data.likes)
   setLikes(info.data.likes)
    
  //  setLike(!islike  ? like+1 : like-1)
    //setIsLike(!islike)
   
}


    
    return (
        <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/user/${info._id}`}>
                   <img className="postProfileImg"
                    alt="" 
                    src= {info ? "http://localhost:3088/"+info.profilePicture : preloader}
                    />
                    </Link>
                    <span className="postUserName">
                       {info ? info.username : <img src={preloader}/>}
                        </span>
                    <span className="postDate"></span>
                </div>
                <div className="postTopRight">
                <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.desc}</span>
                <img src={'http://localhost:3088/'+post.content}  alt="" className="postImg"/>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft" onClick={() => likeFunction()}>
                    <img src={like}  alt="" className="likeIcon" />
                    
                    <span className="postLikeCounter" >{likes.length} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{} comments</span>
                </div>
            </div>
        </div>
    </div>
    )
}
const mapStateToProps = (state) => {
return{
    id: state.auth.currentUser.id
}
}


export default connect(mapStateToProps, {likePostThunk})(News)
