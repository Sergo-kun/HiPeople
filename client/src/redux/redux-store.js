import {combineReducers, createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import fileReducer from "./fileReducer"
import authReducer from "./authReducer"
import PostReducer from "./postReducer"
import UsersReducer from "./usersReducer"
import UploadReducer from "./uploadReducer"
import conversationsReducer from "./conversationReducer"


let rootReducers = combineReducers({
    auth: authReducer,
    files: fileReducer,
    post: PostReducer ,
    usersPage: UsersReducer,
    upload: UploadReducer,
    messanger: conversationsReducer

})

export const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(thunk))
    )

