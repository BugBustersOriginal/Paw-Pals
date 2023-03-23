import React from 'react';
import { useNavigate } from 'react-router-dom';

const FriendTile = ( {chat, userId} ) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/messagewindow')
    //send friendUserName to message window
  }

  const otherParticipant = chat.participants.find((e) => {
    return e.userId !== userId;
  })

  let last = chat.messages.length-1
  const latestMessage = chat.messages[last]

  return (
    <div className="friend-tile-container">
        <div className="friend-tile-username" onClick={handleClick}>{otherParticipant.username}</div>
        <div>{otherParticipant.profileIcon}</div>
        <div onClick={handleClick}>{latestMessage.content}</div>
        <div className="friend-time-timestamp">{latestMessage.createdAt}</div>
    </div>

  )
}

export default FriendTile;