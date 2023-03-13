import React from 'react';

export function FriendRequest (props) {
  return (
    <div class="friend-request-tile">
      <img class="friend-request-icon" src="https://cdn-icons-png.flaticon.com/512/4458/4458569.png"/>
      <img class="user-photo-thumbnail" src={props.userInfo.thumbnailUrl}/>
      <p>{props.userInfo.userName}</p>
    </div>
  )
}