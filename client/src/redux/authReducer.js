
import { loginApi } from "../axios/auth"
import { authApi } from "../axios/auth"
import { uploadAvatar, deleteAvatar } from "../axios/file"
import { store } from './redux-store'
import { getFiles } from "../axios/file"
import { setFilesSuccess } from "./fileReducer"
import { getFollowingsApi, getFollowingsCountApi , getFollowersCountApi} from "../axios/users"


const SET_USER = "SET_USER"
const LOG_OUT = "LOG_OUT"
const CHANGET_DATA = "CHANGET_DATA"
const PUT_FOLLOWING = "PUT_FOLLOWING"
const GET_FOLLOWINGS_COUNT = "GET_FOLLOWINGS_COUNT"
const GET_FOLLOWERS_COUNT = "GET_FOLLOWERS_COUNT"

const defaultState = {
    token: "",
    currentUser: null,
    isAuth: false,
    followingsCount: null,
    followersCount: null
}

export default function authReducer(state = defaultState, action){
    switch(action.type){
       case SET_USER:
           return {
               ...state,
               token:  action.user.token,
               currentUser: action.user.user,
               isAuth: true

           }
        case LOG_OUT:
            return {
                ...state,
                token: "",
                currentUser: {},
                isAuth: false
            }
        case CHANGET_DATA:
           
            return{
                ...state,
                currentUser: {...state.currentUser, profilePicture: action.payload.profilePicture}
            }
        case PUT_FOLLOWING:
            return{
                ...state,
                currentUser: {...state.currentUser, followings: action.following}
            }
        case GET_FOLLOWINGS_COUNT:
            return{
                ...state,
                followingsCount: action.count
            }
            case GET_FOLLOWERS_COUNT:
                return{
                    ...state,
                    followersCount: action.count

                }
        default:
            return state
    }
}

const getFollowingsCount = (count) => ({type: GET_FOLLOWINGS_COUNT, count})
const getFollowersCount = (count) => ({type: GET_FOLLOWERS_COUNT, count})
export const setUserSuccess = user => ({type: SET_USER, user})
const changetDataSuccess = data => ({type: CHANGET_DATA, payload: data})
const logoutSucces = () => ({type: LOG_OUT})
export const putFollowingSuccess = (following) => ({type: PUT_FOLLOWING, following})


export const authThunk = () => async(dispatch) => {
        const response = await authApi()
       
        if (response.data.message === 'Server error') {
            dispatch(logoutSucces())
        }else{
            dispatch(setUserSuccess(response.data))
           // const files = await getFiles(response.data.user.id)
            
          // dispatch(setFilesSuccess(files.data))
            
        }
      
     
        
        
}

export const loginThunk = (email, password) => async (dispatch) => {
    const response = await loginApi(email, password)
   dispatch(setUserSuccess(response))
           
}
export const logoutThunk = () => async (dispatch) => {
    dispatch(logoutSucces())
    dispatch(setFilesSuccess(null))
}
export const uploadAvatarThunk = (file) => async (dispatch) => {
    const state = store.getState()
    const profilePicture = state.auth.currentUser.profilePicture
    console.log(profilePicture)
    if (profilePicture){
       await deleteAvatar()
      
    }
    const response = await uploadAvatar(file)
    console.log(response)
    dispatch(changetDataSuccess(response))
    
}
export const getFollowingsCountThunk = (profileId, userId) => async(dispatch) => {
    const response = await getFollowingsCountApi(profileId, userId)
    dispatch(getFollowingsCount(response))
}
export const getFollowersCountThunk = (profileId, userId) => async(dispatch) => {
    const response = await getFollowersCountApi(profileId, userId)
    dispatch(getFollowersCount(response))
}
export const registrationThunk = () => (dispatch) => {
    
}


