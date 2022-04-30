import "./file.css"
import folder from '../../../../assets/folder.jpg'
import { changeDirStack, downloadFileThunk, deleteFileThunk} from '../../../../redux/fileReducer'
import {connect, useDispatch} from 'react-redux'

const File = ({files, changeDirStack, downloadFileThunk, deleteFileThunk}) => {



  
const setDir = () => {
    if (files.type === 'dir') {
        changeDirStack(files._id)
        console.log(files._id)
       
    }   
}
const downloadCLickHandler = (e) => {
   
    e.stopPropagation()
    downloadFileThunk(files)
    
}
const deleteFileHandler = (e) => {
    e.stopPropagation(                                                                                                                                                      )
    deleteFileThunk(files)
}

return (
    
    <div className='file__info' onClick={() => setDir() }>
        <img src={folder}  className='foldeImg' />
       <div className="info__name">{files.name}</div>
       <div className="info__data">{files.date.slice(0, 10)}</div>
       <div className="info__size">{files.size}</div>
       <div > {files.type !== 'dir'&& <button className="fileDownload"  onClick={(e) => downloadCLickHandler(e)}>download</button>}</div>
       <div  className="fileDelete"><button onClick={(e) => deleteFileHandler(e)}>delete</button></div>
        </div>
    
)

}
const mapStateToProps = (state) => {
    return{
        currentDir: state.files.currentDir
    }
}

export default connect(mapStateToProps, {changeDirStack, downloadFileThunk, deleteFileThunk})(File)