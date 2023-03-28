import React, { useEffect, useState } from 'react';
import { Search } from './Search/Search.jsx';
import FriendTile from './FriendTile.jsx';
import axios from 'axios'

const FriendTileList = ( props ) => {

  const [friends, setFriends] = useState([])

  //will use userId to retrieve chats with each friend from message server
  useEffect(() => {
    axios.get('/latestChat/' + props.userId)
      .then((res) => {
        console.log(res.data, 'line 34 FriendTileList')
        setFriends(res.data)
      })
  }, [props.userId])

  return (
    <div>
      <Search userFriends={props.userFriends} userInfo={props.userInfo} userId={props.userId} pendingRequests={props.pendingRequests} />
      {friends.map((friend) => <FriendTile friend={friend}/>)}
    </div>
  )
}

export default FriendTileList;