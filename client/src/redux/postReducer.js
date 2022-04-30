import { store } from "./redux-store"
import { getPostApi, deletePostApi, likePostApi, getNewsApi } from "../axios/post"
import { addPostApi } from "../axios/file"
const GET_POSTS = "GET_POSTS"
const LIKE_DISLIKE = "LIKE_DISLIKE"
const GET_NEWS = "GET_NEWS"


const defoultState = {
    posts : null,
    news : null
} 


const postReducer = (state = defoultState, action) => {
    switch(action.type){
        case GET_POSTS:
            return{
                ...state,
                posts: action.posts.reverse()
            }
        case LIKE_DISLIKE:
            console.log(action.idPost)
          let post =  {...state.posts.find(el => el._id === action.idPost).likes = action.likes}
          console.log(post)
            return{
                ...state,
                posts : state.posts.map(el => {
                    if (el._id === action.idPost) {
                        return {...el,  likes: action.likes}
                    }
                    return el
                }),   
            }
            case GET_NEWS:
                return {
                    ...state,
                    news: action.data.reverse()
                }
        default:
            return{
                ...state
            }
    }
}

const getPostsSuccess = (posts) => ({type: GET_POSTS, posts})
const getNewsSuccess = (data) => ({type: GET_NEWS, data})

export const getPostsThunk = (userId) => async (dispatch) => {
    const response = await getPostApi(userId)
    dispatch(getPostsSuccess(response.data))
}
export const likeDislikeSuccsess = (likes, idPost) => ({type: LIKE_DISLIKE, likes: likes, idPost: idPost})


export const getNewsThunk = (userId) => async(dispatch) => {
const response = await getNewsApi(userId)
dispatch(getNewsSuccess(response))
}

export const sendPostThunk = (file, text) => async(dispatch) => {
    await addPostApi(file, text)
    const state = store.getState()
    const id = state.auth.currentUser.id
    const response = await getPostApi(id)
    dispatch(getPostsSuccess(response.data))
}
export const deletePostThunk = (postId, userId) => async(dispatch) => {
   const response = await deletePostApi(postId)
   const posts = await getPostApi(userId)
   dispatch(getPostsSuccess(posts.data))
   alert(response.data.message)
}
export const likePostThunk = (userId, postId) => async(dispatch) => {
    const response = await likePostApi(userId, postId)
    dispatch(likeDislikeSuccsess(response.data.likes, response.data.idPost))
    
}


export default postReducer