import React from 'react';
import {FriendRequest} from './FriendRequest.jsx';
import {SelectFriend} from './SelectFriend.jsx';

export function SearchTile (props) {

  return (
    <div>
      {props.userInfo.friend ? <SelectFriend userInfo={props.userInfo}/> : <FriendRequest userInfo={props.userInfo}/>}
    </div>
  )

}