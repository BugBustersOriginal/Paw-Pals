import React from 'react';
import { useNavigate } from 'react-router-dom';

const FriendTile = ( {conversation, userId, userInfo} ) => {
  // console.log(conversation.friend, 'line 5 conversation FriendTile')
  // console.log(userId, 'line 6, FriendTile')
  // console.log(conversation.messages, 'line 7')
  // console.log(userInfo.thumbnailUrl, 'line 8')

  if (conversation.messages === undefined) {
    conversation.messages = []
  }
  console.log(conversation.messages, 'line 9 Friendtile')

  const navigate = useNavigate();

  const handleClick = (e) => {
    let userOne = userId;
    let userTwo = conversation.friend.userId;
    let participants = [userOne, userTwo]
    navigate('/messagewindow', {state: {
      users: participants,
      currentUser: userOne,
      userTwo: userTwo
    }})
  }

  return (
    <div className="friend-tile-container" onClick={handleClick}>
      <img className="user-photo-thumbnail" src={conversation.friend.thumbnailUrl}/>
      <div>
        <div className="name-timestamp space-between">
          <div>{conversation.friend.userId}</div>
          <div>{conversation.messages.length > 0? conversation.messages[conversation.messages.length-1].createdAt : ''}</div>
        </div>
        <div>{conversation.messages.length > 0? conversation.messages[conversation.messages.length-1].content : 'no messages yet'}</div>
    </div>
    </div>
  )
}

export default FriendTile;