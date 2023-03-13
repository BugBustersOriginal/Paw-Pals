import React from 'react';

export function SelectFriend (props) {
  return (
    <div class="select-friend-tile">
      <input type="checkbox" name="select" value="true"/>
      <img class="user-photo-thumbnail" src={props.userInfo.thumbnailUrl}/>
      <p>{props.userInfo.userName}</p>
    </div>
  )
}