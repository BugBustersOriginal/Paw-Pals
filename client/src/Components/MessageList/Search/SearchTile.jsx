import React from 'react';
import {FriendRequest} from './FriendRequest.jsx';
import {SelectFriend} from './SelectFriend.jsx';

export function SearchTile (props) {

  return (
    <div>
      {props.friendInfo.friend ?
      <SelectFriend userId={props.userId} friendInfo={props.friendInfo} handleSelection={props.handleSelection}/> :
      <FriendRequest userId={props.userId} friendInfo={props.friendInfo} handleSelection={props.handleSelection}/>}
    </div>
  )

}