
import File from "./file/File"
import './fileList.css'


const FileList = (props) => {

    const files = props.files.map((f) => <File key={f._id} files={f}/>)
    
return (
    <div className="filelist">
    <div className="fileListheader">
        <div className="fileListname">Название</div>
        <div className="fileListdata">Дата</div>
        <div className="fileListsize">Розмер</div>
        <div className="fileData">
        {props.files ? files : ''}
        </div>
        
    </div>
        </div>
    
)
}




export default FileList