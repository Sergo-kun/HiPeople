import { useDispatch, useSelector } from 'react-redux'
import './uploader.css'
import UploadFile from './UploadFile'
import { hideUploaderSuccess } from '../../../redux/uploadReducer'



const Uploader = () => {

    const dispatch = useDispatch()
    const isVisible = useSelector(state => state.upload.isVisible)

const files = useSelector(state => state.upload.files)

    return ( isVisible &&
      
        <div className='uploader'>
            <div className='uploaderHeader'>
                <div className='uploaderTitle'>Загрузки</div>
                <button onClick={() => dispatch(hideUploaderSuccess())}>X</button>
            </div>
            {files.map(file  => <UploadFile key={file.id} file={file}/>)}
        </div>
    )
}

export default Uploader