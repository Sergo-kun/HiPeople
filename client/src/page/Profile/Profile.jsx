import Header from "../../components/Header/Header"

import LeftBat from "../../components/LeftBar/LeftBat"
import { useNavigate } from 'react-router-dom';
import "./profile.css"
import { connect } from "react-redux"
import InfoUser from "../../components/InfoUser/InfoUser"
import Post from "../../components/Post/Post"
import { getPostsThunk } from "../../redux/postReducer"
import { useEffect } from "react"
import preloader from "../../assets/__Iphone-spinner-1.gif"


const Profile = (props) => {
    
    
    useEffect(() => {
        
        props.getPostsThunk(props.user.id)
    },[])

  
    const posts = !props.posts ? <img src={preloader}/> : props.posts.map(post => <Post className='post' post={post} info={props.user} />)
    return (
        <>
        <Header/>
        <LeftBat/>
        
        <InfoUser user={props.user} className="info" />
     <div className='userPost'>
        
        {posts}
        
        
        
       
     
     </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user : state.auth.currentUser,
        posts: state.post.posts,
        postsLength: state.post.posts
        
    }
}
export default connect(mapStateToProps, {getPostsThunk})(Profile)
