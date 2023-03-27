import React, { useState, useEffect } from 'react';

export function NotificationTile (props) {
  // console.log('friend tile: ', props.savedPhoto)
  console.log('request list: ', props.requestList);
  let savedPhoto = props.savedPhoto;
  let request = props.requestList;

  const [accepted, setAccepted] = useState(false);
  const [requestTile, setRequestTile] = useState(false);
  const [savedTile, setSavedTile] = useState(false);

  useEffect(() => {
    if (savedPhoto.indexOf(props.userId) !== -1) {
      setSavedTile(true);
    }
    if (request.indexOf(props.userId) !== -1) {
      setRequestTile(true);
    }
  })

  const handleAccept = (userId) => {
    props.acceptRequest(userId);
    setAccepted(true);
  }

  return (
    <div>
      {!accepted && requestTile ?  <div className="notification-tile">
        <img className="user-photo-thumbnail" src={props.thumbnailUrl}/>
      <p>@{props.userId} sent you a friend request!</p>
      <button onClick={() => handleAccept(props.userId)}>Accept</button>
    </div> : null}

    {savedTile ? <div className="notification-tile">
      <img className="user-photo-thumbnail" src={props.thumbnailUrl}/>
      <p>@{props.userId} saved your photo!</p>
      <button>Dismiss</button>
      </div> : null}
    </div>
  )
}