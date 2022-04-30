import Header from "../../components/Header/Header"
import LeftBat from "../../components/LeftBar/LeftBat"
import InfoUser from "../../components/InfoUser/InfoUser"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"
import { getUserThunk } from "../../redux/usersReducer"
import { useEffect } from "react"
import preloader from "../../assets/__Iphone-spinner-1.gif"
import { getPostsThunk } from "../../redux/postReducer"
import Post from "../../components/Post/Post"

const User = ({getUserThunk, user, getPostsThunk, posts}) => {
    
    const {id} = useParams()
  
    useEffect(() => {
        getUserThunk(id)
        getPostsThunk(id)
       
    },[id])
    useEffect(() => {
        getPostsThunk(id)
    },[])
    const userPosts = !posts ? <img src={preloader}/> : posts.map(post => <Post key={post._id} className='post' post={post} info={user} />)

    return (
        <>
        <Header/>
        <LeftBat/>
        {user ? 
        <InfoUser className="info" user={user}/> :
        <img src={preloader}/>
}
     <div className='userPost'>
        {posts ? userPosts : <img src={preloader}/>}
        
        
        
        
       
     
     </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.usersPage.user,
        posts: state.post.posts,
    }
}

export default connect(mapStateToProps,{getUserThunk, getPostsThunk})(User)