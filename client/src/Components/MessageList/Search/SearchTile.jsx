import React from 'react';
import {FriendRequest} from './FriendRequest.jsx';
import {SelectFriend} from './SelectFriend.jsx';

export function SearchTile (props) {

  return (
    <div>
      {props.userInfo.friend ?
      <SelectFriend userInfo={props.userInfo} handleSelection={props.handleSelection}/> :
      <FriendRequest userInfo={props.userInfo} handleSelection={props.handleSelection}/>}
    </div>
  )

}