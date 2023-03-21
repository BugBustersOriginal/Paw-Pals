import React, {useState, useEffect} from 'react';
import {FriendRequest} from './FriendRequest.jsx';
import {SelectFriend} from './SelectFriend.jsx';

export function SearchTile (props) {

  const [isFriend, setIsFriend] = useState(false);

  let friendInfo = props.searchResult;
  let userId = props.userId
  let userFriends = props.userFriends;

  // console.log('userFriends search tile: ', userFriends);
  // console.log('indexOf: ', userFriends.indexOf(userId));
  // console.log('friend info: ', friendInfo);
      // console.log('friend indexOf: ', friendList.indexOf(friendInfo.userId));

  const checkFriendStatus = (friendList) => {
    if (friendList.length) {
      // if (friendList.indexOf(friendInfo.userId) === 1) {
      //   setIsFriend(true);
      // } else {
      //   setIsFriend(false);
      // }
      // console.log('friend indexOf: ', friendList.indexOf(friendInfo.userId));
    }

    // console.log('friend: ', friendInfo);
  }

  useEffect(() => {
    // checkFriendStatus(userFriends);
    if (userFriends.length) {
      if (userFriends.indexOf(friendInfo.userId) !== -1) {
        console.log('is friends');
        setIsFriend(true);
      } else {
        console.log('is not friends');
        setIsFriend(false);
      }
      // console.log('friend indexOf: ', friendList.indexOf(friendInfo.userId));
    }
  },[friendInfo])

  return (
    <div>
      {isFriend ?
      <SelectFriend userId={props.userId} friendInfo={friendInfo} handleSelection={props.handleSelection}/> :
      <FriendRequest userId={props.userId} friendInfo={friendInfo} handleSelection={props.handleSelection}/>}
    </div>
  )

}