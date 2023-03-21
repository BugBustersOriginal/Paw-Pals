import React from 'react';

const FriendTile = (props) => {
  // console.log(props, 'line 4 FriendTile')
  // console.log(props)

  const otherParticipant = props.chat.participants.find((e) => {
    return e.userId !== props.userId;
  })

  const latestMessage = props.chat.messages[props.chat.messages.length - 1]

  return (
    <div className="friend-tile-container">
        <div className="friend-tile-username">{otherParticipant.username}</div>
        <div>{otherParticipant.profileIcon}</div>
        <div>{latestMessage.content}</div>
        <div className="friend-time-timestamp">{latestMessage.timestamp}</div>
    </div>
  )
}

export default FriendTile;