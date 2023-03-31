import React from 'react';
import { Route, Routes, useNavigate, useLocation, withRouter, redirect } from 'react-router-dom';

const FriendTile = ( {conversation, userId} ) => {

  if (conversation.messages === undefined) {
    conversation.messages = []
  }

  let formattedTime;

  if (conversation.messages.length > 0) {
   let formattedDate = new Date(conversation.messages[conversation.messages.length-1].createdAt);
   formattedTime = formattedDate.toLocaleString('en-US', {hour12: true, hour: 'numeric', minute: '2-digit'});
  } else {
    formattedTime = '';
  }

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    let userOne = userId;
    let userTwo = conversation.friend.userId;
    let participants = [userOne, userTwo]
    navigate('/messagewindow', {state: {
      users: participants,
      currentUser: userOne,
      userTwo: userTwo,
      userTwoProfileIcon: conversation.friend.thumbnailUrl
    }})
  }

  return (
    <div className="friend-tile-container" onClick={handleClick}>
      <img className="friend-profile-icon" src={conversation.friend.thumbnailUrl}/>
      <div>
        <div className="name-timestamp">
          <div className="friend-username">{conversation.friend.userId}</div>
          <div className="timestamp">{formattedTime}</div>
        </div>
        <div className="message">{conversation.messages.length > 0 ? (
          conversation.messages[conversation.messages.length-1].type === 'image' ? (
            'I just sent you a photo!'
          ) : (
            conversation.messages[conversation.messages.length-1].content
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