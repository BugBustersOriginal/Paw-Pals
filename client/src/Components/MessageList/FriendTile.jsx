import React from 'react';
import { Route, Routes, useNavigate, useLocation, withRouter, redirect } from 'react-router-dom';

const FriendTile = ( {visibleChat, userId} ) => {

  if (visibleChat.messages === undefined) {
    visibleChat.messages = []
  }

  let formattedTime;

  if (visibleChat.messages.length > 0) {
   let formattedDate = new Date(visibleChat.messages[visibleChat.messages.length-1].createdAt);
   formattedTime = formattedDate.toLocaleString('en-US', {hour12: true, hour: 'numeric', minute: '2-digit'});
  } else {
    formattedTime = '';
  }

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    let userOne = userId;
    let userTwo = visibleChat.friend.userId;
    let participants = [userOne, userTwo]
    navigate('/messagewindow', {state: {
      users: participants,
      currentUser: userOne,
      userTwo: userTwo,
      userTwoProfileIcon: visibleChat.friend.thumbnailUrl
    }})
  }

  return (
    <div className="friend-tile-container" onClick={handleClick}>
      <img className="friend-profile-icon" src={visibleChat.friend.thumbnailUrl}/>
      <div>
        <div className="name-timestamp">
          <div className="friend-username">@{visibleChat.friend.userId}</div>
          <div className="timestamp">{formattedTime}</div>
        </div>
        <div className="message">{visibleChat.messages.length > 0 ? (
          visibleChat.messages[visibleChat.messages.length-1].type === 'image' ? (
            'I just sent you a photo!'
          ) : (
            visibleChat.messages[visibleChat.messages.length-1].content
          )
          ) : (
            'no messages yet'
          )}
          </div>
    </div>
    </div>

  )
}

export default FriendTile;