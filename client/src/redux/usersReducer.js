import { followUnfollowApi, getUserApi } from "../axios/users"
import { putFollowingSuccess } from "./authReducer"

const GET_USER = "GET_USER"
const PUT_FOLLOWER = "PUT_FOLLOWER"
 
const defaultState = {
  
    user: null,
   
}

const UsersReducer = (state = defaultState, action) => {
switch (action.type) {
    case GET_USER:
        return {
            ...state,
            user: action.user
        }
       case PUT_FOLLOWER:
           return{
               ...state,
               user: {...state.user, followers: action.follower}
           }

    default:
       return {...state}
        
}
}
const getUserSuccess = (user) => ({type: GET_USER, user})
const putFollowersSuccess = (follower) => ({type: PUT_FOLLOWER, follower})

export const getUserThunk = (id) => async (dispatch) => {
 const response = await getUserApi(id)
 dispatch(getUserSuccess(response))
}
export const followUnfollowThunk = (userId) => async(dispatch) => {
    const response = await followUnfollowApi(userId)
    dispatch(putFollowersSuccess(response.data.follower))
    dispatch(putFollowingSuccess(response.data.following))
    console.log(response)
}


export default UsersReducer