import React, { useState } from 'react';

export function NotificationTile (props) {
  // console.log('friend tile: ', props.friend)
  const [accepted, setAccepted] = useState(false);

  const handleAccept = (userId) => {
    props.acceptRequest(userId);
    setAccepted(true);
  }

  return (
    <div>
      {!accepted ?  <div className="notification-tile">
        <img className="user-photo-thumbnail" src={props.thumbnailUrl}/>
      <p>@{props.userId} sent you a friend request!</p>
      <button onClick={() => handleAccept(props.userId)}>Accept</button>
    </div> : null}
    </div>

    // <div className="notification-tile">
    //     <img className="user-photo-thumbnail" src={props.thumbnailUrl}/>
    //   <p>@{props.userId} sent you a friend request!</p>
    //   <button onClick={() => props.acceptRequest(props.userId)}>Accept</button>
    // </div>
  )
}