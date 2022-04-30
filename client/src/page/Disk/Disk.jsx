import React, {useState} from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import LeftBat from '../../components/LeftBar/LeftBat';
import './disk.css'
import {setFileThunk, addFileThunk, setPopupDisplayThunk, changeDirStack, backClickThunk, uploadFileThunk} from '../../redux/fileReducer'
import { useEffect } from 'react';
import FileList from './fileList/FileList'
import Popup from './Popup';
import UploadIcon from '../../assets/upload.png'
import Uploader from './uploader/Uploader';


const Disk = (props) => {
  const [dragEnter, setDragEnter] = useState(false);

  useEffect(() => {
    props.setFileThunk(props.currentDir)
  }, [])
  const createDirHandler = (name) => {
      props.addFileThunk(props.currentDir , name)
  }
  const backClickHandler = () => {
   props.backClickThunk()    
  }
  const fileUploadHeandler = (event) => {
    const files = [...event.target.files]
    files.forEach(file => props.uploadFileThunk(file, props.currentDir))
  }
  const dragEnterHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }
  const dragLeaveHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }
  const dropHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    let files = [...event.dataTransfer.files]
    files.forEach(file => props.uploadFileThunk(file, props.currentDir))

    setDragEnter(false)
  }
  return ( 
  <>
    <Header/>
    <LeftBat/>
   {!dragEnter ? <div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
        <div className='disk__btns'>
          <button className='disk__back' onClick={() => backClickHandler()}>Назад</button>
          <button className='disk__create' onClick={() => props.setPopupDisplayThunk('flex')}>Создать папку</button>
          <div class="input__wrapper">
            <div className='upload'>
   <input  onChange={(event) => fileUploadHeandler(event)} name="file" type="file"  id="input__file" className="input input__file" multiple/>
   <label for="input__file" className="input__file-button">
      <span className="input__file-icon-wrapper"><img className="input__file-icon" src={UploadIcon} width="25"/></span>
      <span className="input__file-button-text">Загрузить файл</span>
   </label>
   </div>
</div>
          {props.files ? <FileList files={props.files}/>: <img src={UploadIcon}/>}
          <Popup createDirHandler={createDirHandler} popupDisplay={props.popupDisplay} setPopupDisplayThunk={props.setPopupDisplayThunk}/>
        </div>
    </div> : 
    <div onDrop={dropHandler} className='dropArea' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      Перетащите файл сюда
    </div>
    }
    <Uploader/>
  </>
  )
}

let mapStateToProps = (state) => {
  return{
    dirStack: state.files.dirStack,
    popupDisplay: state.files.popupDisplay,
    currentDir : state.files.currentDir,
    files : state.files.files
  }
}

export default connect(mapStateToProps,
   {setFileThunk,
     addFileThunk, 
     setPopupDisplayThunk,
     changeDirStack, 
     backClickThunk,
     uploadFileThunk
    
    })(Disk)

