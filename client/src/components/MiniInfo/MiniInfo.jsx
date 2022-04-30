import noPhoto from "../../assets/usersPhoto/noProfile.png"
import './miniInfo.css'
import { Link } from "react-router-dom"

const MiniInfo = ({users}) => {
    return (
        <div className="information">
           <Link to={`/user/${users._id}`}><img className="photo" src={users.profilePicture ? users.profilePicture : noPhoto}/></Link>
            <div className="name">{users.username}</div>
        </div>
    )
}

export default MiniInfo