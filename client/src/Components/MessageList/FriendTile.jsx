import React from 'react';
import { useNavigate } from 'react-router-dom';

const FriendTile = ( {conversation, userId} ) => {
  console.log(conversation.friend, 'line 5 conversation FriendTile')
  console.log(userId, 'line 6, FriendTile')
  console.log(conversation.messages, 'line 7')

  const navigate = useNavigate();

  const handleClick = (e) => {
    let userOne = userId;
    let userTwo = conversation.friend;
    let participants = [userOne, userTwo]
    navigate('/messagewindow', {state: {
      users: participants,
      currentUser: userOne,
      userTwo: userTwo
    }})
  }

  return (
    <div className="friend-tile-container">
      <img className="user-photo-thumbnail" src="https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg/"/>
      <div className="friend-tile-username" onClick={handleClick}>{conversation.friend}</div>
      <div>{conversation.messages? conversation.messages[conversation.messages.length-1].content : 'no messages yet'}</div>
      <div>{conversation.messages? conversation.messages[conversation.messages.length-1].createdAt : ''}</div>
    </div>
  )
  // return (
  //   <div className="friend-tile-container">
  //     <img className="user-photo-thumbnail" src="https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg/"/>
  //     <div className="friend-tile-username" onClick={handleClick}>{friend.friend}</div>
  //     <div>{friend.messages? friend.messages[friend.messages.length-1].content : 'no messages yet'}</div>
  //     <div>{friend.messages? friend.messages[friend.messages.length-1].createdAt : ''}</div>
  //   </div>
  // )
}

export default FriendTile;