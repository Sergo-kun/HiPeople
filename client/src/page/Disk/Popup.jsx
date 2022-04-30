import { useState } from "react";
import './disk.css'

const Popup = ({createDirHandler, popupDisplay, setPopupDisplayThunk}) => {
    const [dirName, setDirName] = useState('');

 const changeHeandler = (e) => {
    setDirName(e.target.value)
 }   
    return(
        <div >
            <div className="popup" style={{display: popupDisplay}}  onClick={() => setPopupDisplayThunk('none')}>
                <div className="popContent" onClick={(event => event.stopPropagation())}>
                    <div className="popHeader">
                        <div className="popTitle">
                            Создать новую папку</div>
                            <button className="popClose" onClick={() => setPopupDisplayThunk('none')}>
                                X
                            </button>
                    </div>
                    <input type="text" 
                    placeholder="Введите название папки..."
                     value={dirName} onChange={changeHeandler}/>
                    <button className="popCreate" onClick={() => {createDirHandler(dirName); setPopupDisplayThunk('none');  setDirName('')}}>Создать папку</button>
                </div>
            </div>
        </div>
    )
}


export default Popup