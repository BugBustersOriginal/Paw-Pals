import React, {useState, useEffect} from 'react';
import {FriendRequest} from './FriendRequest.jsx';
import {SelectFriend} from './SelectFriend.jsx';

export function SearchTile (props) {

  const [isFriend, setIsFriend] = useState(false);

  let friendInfo = props.searchResult;
  let userId = props.userId
  let userFriends = props.userFriends;


  useEffect(() => {
    if (userFriends.length) {
      if (userFriends.indexOf(friendInfo.userId) !== -1) {
        console.log('is friends');
        setIsFriend(true);
      } else {
        console.log('is not friends');
        setIsFriend(false);
      }

    }
  },[friendInfo])

  return (
    <div>
      {isFriend ?
      <SelectFriend userId={props.userId} friendInfo={friendInfo} handleSelection={props.handleSelection}/> :
      <FriendRequest userId={props.userId} friendInfo={friendInfo} pendingRequests={props.pendingRequests} handleSelection={props.handleSelection}/>}
    </div>
  )

}