import React, { useEffect, useState } from 'react';
import { Search } from './Search/Search.jsx';
import FriendTile from './FriendTile.jsx';
import axios from 'axios'

const FriendTileList = ( props ) => {
  //will receive userId from App.jsx
  console.log(props.userId, 'line 8 props FriendTileList')
  // console.log(userId, 'line 9 userID from FriendTileList')//undefined
  // const userName = userId

  const [chats, setChats] = useState([])

  //will use userId to retrieve chats from message server
  useEffect(() => {
    axios.post('/conversations/' + props.userId)
      .then((res) => {
        console.log(res.data, 'line 16 FriendTileList')
        setChats(res.data)
      })
  }, [])

  return (
    <div>
      <Search userFriends={props.userFriends} userInfo={props.userInfo} userId={props.userId} pendingRequests={props.pendingRequests} />
      {chats.map((chat) => <FriendTile chat={chat} userId={props.userId}/>)}
    </div>
  )
}

export default FriendTileList;