import Header from "../../components/Header/Header"
import LeftBat from "../../components/LeftBar/LeftBat"
import './settings.css'
import UploadIcon from '../../assets/upload.png'
import { connect } from "react-redux"
import { uploadAvatarThunk} from "../../redux/authReducer"


const Settings = ({uploadAvatarThunk}) => {
   const fileUploadHeandler = (e) => {
        const file = e.target.files[0]
        uploadAvatarThunk(file)
   }
    return (
        <>
        <Header/>
        <LeftBat/>
        <div className="settings">
            Изменить аватар
            <div className="uploadAvatar">
            <input accept="image/*"  onChange={(event) => fileUploadHeandler(event)} name="file" type="file"  id="input__file" className="input input__file" multiple/>
   <label for="input__file" className="input__file-button">
      <span className="input__file-icon-wrapper"><img className="input__file-icon" src={UploadIcon} width="25"/></span>
      <span className="input__file-button-text">Загрузить файл</span>
   </label>
   </div>
        </div>
        </>
    )
}


export default connect('', {uploadAvatarThunk})(Settings)