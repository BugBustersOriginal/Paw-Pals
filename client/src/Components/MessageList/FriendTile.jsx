import React from 'react';
import { Route, Routes, useNavigate, useLocation, withRouter, redirect } from 'react-router-dom';

const FriendTile = ( {chat, userId} ) => {
  console.log(chat, 'line 4 chat from FriendTile')
  console.log(userId, 'line 5 userId from FriendTile')

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    let userOne = userId;
    let userTwo = conversation.friend.userId;
    let participants = [userOne, userTwo]
    navigate(‘/messagewindow’, {state: {
      users: participants,
      currentUser: userOne,
      userTwo: userTwo,
      userTwoIcon: conversation.friend.thumbnailUrl
    }})
  }

  const otherParticipant = chat.participants.find((e) => {
    return e.userId !== userId;
  })

  let last = chat.messages.length-1
  const latestMessage = chat.messages[last]

  return (
    <div className="friend-tile-container">
        <div className="friend-tile-username">{otherParticipant.username}</div>
        <div>{otherParticipant.profileIcon}</div>
        <div onClick={handleClick}>{latestMessage.content}</div>
        <div className="friend-time-timestamp">{latestMessage.createdAt}</div>
    </div>

  )
}

export default FriendTile;