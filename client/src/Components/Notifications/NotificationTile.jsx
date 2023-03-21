import React from 'react';

export function NotificationTile (props) {
  // console.log('friend tile: ', props.friend)
  return (
    <div className="notification-tile">
      <div>
        <img className="user-photo-thumbnail" src={props.thumbnailUrl}/>
        <p>@{props.userId}</p>
      </div>
      <p>Sent you a friend request!</p>
      <button>Accept</button>
    </div>
  )
}