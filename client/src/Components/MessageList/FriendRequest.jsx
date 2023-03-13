import React, {useState, useEffect} from 'react';

export function FriendRequest (props) {

  const [requestSent, setRequestSent] = useState(false);

  const handleFriendRequest = (event) => {
    setRequestSent(true);
    //make an axios call to send a friend request
  }

  return (
    <div class="friend-request-tile">
      {requestSent ? <img class="friend-request-icon" src="https://cdn-icons-png.flaticon.com/512/3602/3602500.png" onClick={handleFriendRequest}/> : <img class="friend-request-icon" src="https://cdn-icons-png.flaticon.com/512/4458/4458569.png" onClick={handleFriendRequest}/>}
      <img class="user-photo-thumbnail" src={props.userInfo.thumbnailUrl}/>
      <p>{props.userInfo.userName}</p>
    </div>
  )
}