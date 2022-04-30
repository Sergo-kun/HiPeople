import "./share.css"

import unknownProfile from "../../assets/usersPhoto/noProfile.png"
import { useState } from "react"
import { PermMedia, Label, Room, EmojiEmotions} from '@mui/icons-material'
import { getPostsThunk } from "../../redux/postReducer"
import { sendPostThunk } from "../../redux/postReducer"
import { connect } from "react-redux"
import CancelIcon from '@mui/icons-material/Cancel';
import { pink } from "@mui/material/colors"

const Share = ({profilePicture, getPostsThunk, userId, sendPostThunk}) =>  {

   const [text, setText] = useState('');
   const [photo, setPhoto] = useState(null)
   const [disPhoto, setDisPhoto] = useState(null)


    const clearDisPhoto = () => {
        setDisPhoto(null)
        setPhoto(null)
    }

   const postHandler = (e) => {
    setText(e.target.value)
    
   }
   const photoHandler = (e) => {
       setPhoto(e.target.files[0])
       if (e.target.files && e.target.files[0]) {
        setDisPhoto(URL.createObjectURL(e.target.files[0]));
      }
     
      
   }
   const postPost = () => {
       if (photo && text) {
    sendPostThunk(photo, text)
       }else if (!photo && text){
          sendPostThunk(null, text)
       }else if (photo && !text){
          sendPostThunk(photo, null)
       }
       setText('')
       setPhoto(null)
   }

    
    return (
        <div className="share" style={disPhoto ? {'height': '60%'} :  {className :"share"}}>
            <div className="shareWraper">
                <div className="shareTop">
                    
                    <img className="shareProfileImg" src={profilePicture ? 'http://localhost:3088/'+profilePicture : unknownProfile} alt=""/>
                    {disPhoto ? 
                    <><img className="pisPhoto" src={disPhoto}/>
                    <CancelIcon onClick={() => clearDisPhoto()} style={{'marginLeft': '-1%', 'marginTop' : '-9%', 'cursor' : 'pointer'}} sx={{ color: pink[500] }}/></> : ''}
                    <input onChange={(e) => postHandler(e)} value={text}  placeholder="What`s new?" className="shareInput"/>
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                         
                            <div class="input__wrapper">
   <input name="file" onChange={(event) => photoHandler(event)} type="file" name="file" id="input__file" class="input input__file" multiple/>
   <label for="input__file" >
      <span className="inputLogo" ><PermMedia htmlColor="tomato" className="shareIcon"/></span>
    <span className="inputText"><div className="divText">Фото видео</div></span>
   </label>
</div>
                            
                        </div>
                        <div className="shareOption">
                            <Label htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="orange" className="shareIcon"/>
                            <span className="shareOptionText">Feelengs</span>
                        </div>
                    </div>
                    <button className="shareButton" style={disPhoto ? {'marginTop': '-20%'} :  {className :"shareButton"}} onClick={() => postPost()}>Share</button>
                </div>
            </div>
        </div>
    )
}



export default connect('',{getPostsThunk, sendPostThunk})(Share)