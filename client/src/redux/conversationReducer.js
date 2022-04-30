import { getConversationApi, getMessagesApi, postConversationApi, postMessageApi } from "../axios/conversation"

const GET_CONVERSATIONS = "GET_CONVERSATIONS"
const POST_CONVERSATION = "POST_CONVERSATION"
const GET_MESSAGES = "GET_MESSAGES"
const POST_MESSAGE = "POST_MESSAGE"
const SET_FETCHING = "SET_FETCHING"
const SET_SOCKET_MESSAGE = "SET_SOCKET_MESSAGE"
const ADD_ALERTS_ABOUT_MESSAGE = "ALERTS_ABOUT_MESSAGE"
const REMOVE_ALERTS_ABOUT_MESSAGE = "REMOVE_ALERTS_ABOUT_MESSAGE"
const SET_ARRIVAL_MESSAGE = "SET_ARRIVAL_MESSAGE"
const SET_ACTIVE_MEMBERS = "SET_ACTIVE_MEMBERS"
const POSTTODATABASE_ALERTS_MESSAGE = "POSTTODATABASE_ALERTS_MESSAGE"



const defaultState = {
    conversations : false,
    messages: false,
     isFetching: false,
     alerts: [],
     arrivalMessage: false,
     activeMembers: []
 
}


const conversationsReducer = (state = defaultState, action) => {
    switch(action.type){
        case GET_CONVERSATIONS:
            return{
                ...state,
                conversations: action.data
            }
        case GET_MESSAGES:
            return{
                ...state,
                messages: action.data
            }
        case POST_MESSAGE:
            return{
                ...state,
                messages: [...state.messages, action.data]
            }
        case POST_CONVERSATION:
            return{
                ...state,
                conversations: [action.data, ...state.conversations]
            }
        case SET_FETCHING:
            return{
                ...state,
                isFetching: action.boolean
            }
        case SET_SOCKET_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.data]
            }
        case ADD_ALERTS_ABOUT_MESSAGE:
            return {
                ...state,
                alerts : [...state.alerts, action.data]
            }
        case REMOVE_ALERTS_ABOUT_MESSAGE:
            return{
                ...state,
                alerts : [...state.alerts.filter(alert => alert.sender !== action.data)]
            }
        case SET_ARRIVAL_MESSAGE:
            return{
                ...state,
                arrivalMessage: action.data
            }
        case SET_ACTIVE_MEMBERS:
            return{
                ...state,
                activeMembers : action.data
            }
        
       
        default:
            return{
                ...state
            }
    }
}


const getConversationSuccess = (data) => ({type: GET_CONVERSATIONS, data})
const postConversationSucces = (data) => ({type: POST_CONVERSATION, data})
const getMessageSuccess = (data) => ({type: GET_MESSAGES, data})
const postMessageSuccess = (data) => ({type: POST_MESSAGE, data})
const setFetchingSuccess = (doolean) => ({type: SET_FETCHING, doolean})
const setSocketMessageSuccess = (data) => ({type: SET_SOCKET_MESSAGE, data})
export const addAlertsAboutMessageSuccess = (data) => ({type: ADD_ALERTS_ABOUT_MESSAGE, data})
export const removeAlertsAboutMessageSuccess = (data) => ({type: REMOVE_ALERTS_ABOUT_MESSAGE, data})
const setArrivalMessageSuccess = (data) => ({type: SET_ARRIVAL_MESSAGE, data})
export const setActiveMembersSuccess = (data) => ({type: SET_ACTIVE_MEMBERS, data})
export const getConversationThunk = () => async (dispatch) => {
    const response = await getConversationApi()
   if (response.message === "Server error") {
    dispatch(getConversationSuccess(false))
   }
    dispatch(getConversationSuccess(response))
}
export const postConversationThunk = (receiverId) => async(dispatch) => {
    //console.log('testt')
    const response = await postConversationApi(receiverId)
    
    if (response.message == "Already") {
      return dispatch(getMessageSuccess(response.messages))
    }
    console.log(response.savedConversation)
    dispatch(postConversationSucces(response.savedConversation))
    dispatch(getMessageSuccess(response.messages))
}
export const getMessagesThunk = (conId) => async(dispatch) =>  {
    dispatch(setFetchingSuccess(true))
    const response = await getMessagesApi(conId)
    dispatch(getMessageSuccess(response))
    console.log(response)
    dispatch(removeAlertsAboutMessageSuccess(response[response.length-1].sender))
    dispatch(setFetchingSuccess(false))
}
export const postMessageThunk = (conId, text) => async (dispatch) => {
    const response = await postMessageApi(conId, text)
    dispatch(postMessageSuccess(response))
}
export const setSocketMessage = (newMessage) => (dispatch) => {
    console.log("thunk")
    dispatch(setArrivalMessageSuccess(newMessage))
    dispatch(setSocketMessageSuccess(newMessage))
}
export const postAlertToDb = (data) => async() => {
    console.log(data)
}



export default conversationsReducer