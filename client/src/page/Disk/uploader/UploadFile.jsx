import { useDispatch } from 'react-redux'
import './uploader.css'
import { removeUploaderFileSuccess } from '../../../redux/uploadReducer'

const UploadFile = ({file}) => {
    const dispatch = useDispatch()
return(
    <div className="upload-file">
        <div className="uploadFileHeader">
            <div className="uploadFileName">{file.name}</div>
            <button className="uploadFileRemove" onClick={() => dispatch(removeUploaderFileSuccess(file.id))}>X</button>
        </div>
        <div className='progress-bar'>
            <div className='upload-bar' style={{width: file.progress + '%'}}/>
            <div className="percent">{file.progress}%</div>
        </div>
    </div>
)
}

export default UploadFile