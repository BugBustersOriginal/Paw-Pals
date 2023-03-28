import React from 'react';
import { useNavigate } from 'react-router-dom';

const FriendTile = ( {friend} ) => {
  console.log(friend, 'line 5 friend FriendTile')

  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate('/messagewindow', {state: {}})
    // navigate('/messagewindow')
  }

  return (
    <div className="friend-tile-container">
      <img className="user-photo-thumbnail" src="https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg/"/>
      <div className="friend-tile-username" onClick={handleClick}>{friend.friend}</div>
      <div>{friend.messages? friend.messages[friend.messages.length-1].content : 'no messages yet'}</div>
      <div>{friend.messages? friend.messages[friend.messages.length-1].createdAt : ''}</div>
    </div>
  )
}

export default FriendTile;