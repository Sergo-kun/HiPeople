import { useSelector, useStore } from 'react-redux'
import {getFiles, createDir, uploadFile, downloadFile, deleteFile} from '../axios/file'
import { store } from './redux-store'


const SET_FILES = "SET_FILES"
const SET_CURRENT_DIR = "SET_CURRENT_DIR"
const ADD_FILE = "ADD_FILE"
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"
const PUSH_TO_STACK = "PUSH_TO_STACK"
const DELETE_FILE = "DELETE_FILE"


const defaultState = {
    files: [],
    currentDir: null,
    popupDisplay: 'none',
    dirStack: []
}

export default function fileReducer(state = defaultState, action){
    switch(action.type){
        case SET_FILES:
            return{
                ...state,
                files: action.files
            }
            case SET_CURRENT_DIR:
                return{
                    ...state,
                    currentDir: action.payload 
                }
            case ADD_FILE:
                return{
                    ...state,
                    files: [...state.files, action.payload]
                }
                case SET_POPUP_DISPLAY:
                    return{
                        ...state,
                        popupDisplay: action.payload
                    }
                case PUSH_TO_STACK:
                    return{
                        ...state,
                        dirStack: [...state.dirStack, action.dir]
                    }
                    case DELETE_FILE: {
                        return {
                            ...state,
                            files: [...state.files.filter(file => file._id !== action.payload)]
                        }
                    }
        default:
            return state
    }
}
export const pushToStackSuccess = (dir) => ({type: PUSH_TO_STACK,  dir})
export const setFilesSuccess = (files) => ({type: SET_FILES, files})
export const setCurrentDirSuccess = (dir) => ({type: SET_CURRENT_DIR, payload: dir})
const addFileSuccess = (file) => ({type: ADD_FILE, payload: file})
const setPopupDisplaySuccess = (display) => ({type: SET_POPUP_DISPLAY, payload: display})
const deleteFileSuccess = (dirId) => ({type: DELETE_FILE, payload: dirId})

export const addFileThunk = (dirId, name) => async(dispatch) => {
    const response = await createDir(dirId, name)
    dispatch(addFileSuccess(response.data))
   
}

export const setFileThunk = (dirId) => async (dispatch) => {
    const response = await getFiles(dirId)
    dispatch(setFilesSuccess(response.data))
    
}
export const setPopupDisplayThunk = (display) => async(dispatch) => {
    await dispatch(setPopupDisplaySuccess(display))
}

export const changeDirStack = (idFile) => async(dispatch) => {
        const response = await getFiles(idFile)
        dispatch(setFilesSuccess(response.data))
        dispatch(setCurrentDirSuccess(idFile))
        const state = store.getState()
        const currentDir = state.files.currentDir
        dispatch(pushToStackSuccess(currentDir))
}
export const backClickThunk = () => async (dispatch) => {
    const state = store.getState()
    let backDirId = state.files.dirStack.pop()
   
    const currentDir = state.files.currentDir
    if (backDirId === currentDir) {
        backDirId = state.files.dirStack.pop()
    }
    console.log(backDirId)
    const response = await getFiles(backDirId)
    dispatch(setFilesSuccess(response.data))
    dispatch(setCurrentDirSuccess(backDirId))
}
export const uploadFileThunk = (file, currentDir) => async(dispatch) => {
    
    const response = await uploadFile(file, currentDir, dispatch)
    dispatch(addFileSuccess(response))
}
export const downloadFileThunk = (file) => async(dispatch) => {
  
    await downloadFile(file)
}

export const deleteFileThunk = (file) => async(dispatch) =>{
    const response = await deleteFile(file)
    dispatch(deleteFileSuccess(response))
}
