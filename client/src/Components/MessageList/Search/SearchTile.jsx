import React, {useState, useEffect} from 'react';
import {FriendRequest} from './FriendRequest.jsx';
import {SelectFriend} from './SelectFriend.jsx';

export function SearchTile (props) {

  const [isFriend, setIsFriend] = useState(false);

  let friendInfo = props.searchResult;
  let userId = props.userId
  console.log('current user: ', userId)
  console.log('friend info: ', friendInfo)

  // console.log(friendInfo.friendList.indexOf(userId));
  if (friendInfo.friendList) {
    console.log('friend?', friendInfo.friendList.indexOf(userId));
  }

  // if (props.friendInfo.friendList.length) {
  //   if (props.friendInfo.friendList.indexOf(userId)) {
  //     console.log('is friend');
  //   }
  // }

  // if (props.friendList) {
  //   console.log('find result', friendList.indexOf(userId));
  //   // if (friendList.indexOf(userId)) {
  //   //   setIsFriend(true);
  //   // }
  // }




  return (
    <div>
      {isFriend ?
      <SelectFriend userId={props.userId} friendInfo={friendInfo} handleSelection={props.handleSelection}/> :
      <FriendRequest userId={props.userId} friendInfo={friendInfo} handleSelection={props.handleSelection}/>}
    </div>
  )

}