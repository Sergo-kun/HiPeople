import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./leftbar.css"

const LeftBat = ({messageCount}) =>  {
    const countMessagesStyle = {
        "marginLeft": "5%",
              
                "color": "rgb(94, 165, 170)", 
                "backgroundColor": "white",
                "width" : "10%"
      }
  return (
  <div className='leftbar'>
    <div className="sidebarWrapper">
        <ui className="sidebarList">
        <Link className="sidebarListItem" to='/profile'>
                Profile
            </Link>
            <Link className="sidebarListItem" to='/'>
                News
            </Link>
            <Link className="sidebarListItem" to='/messages'>
                Messages{messageCount > 0? <div style={countMessagesStyle}>{messageCount}</div>: ''} 
            </Link>
            <Link className="sidebarListItem" to='/followings'>
                Followings
            </Link>
            <Link className="sidebarListItem" to='/followers'>
                Followers
            </Link>
            <Link className="sidebarListItem" to='/users'>
                Users
            </Link>
            
            <Link className="sidebarListItem" to='/files'>
                Files
            </Link>
            <Link className="sidebarListItem" to='/settings'>
                Settings
            </Link>
            
        </ui>
    </div>
  </div>
  )
}

const mapStateToProps = state => {
    return{
        messageCount: state.messanger.alerts.length
    }
}

export default connect(mapStateToProps, {})(LeftBat) 
