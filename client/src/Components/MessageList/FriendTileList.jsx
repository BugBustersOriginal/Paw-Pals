import React, { useEffect, useState } from 'react';
import { Search } from './Search/Search.jsx';
import FriendTile from './FriendTile.jsx';
import axios from 'axios'

const FriendTileList = ( props, {userId} ) => {
  //will receive userId from App.jsx

  // const [chats, setChats] = useState([])
  const [friends, setFriends] = useState([])

  // will use userId to retrieve chats from message server
  // useEffect(() => {
  //   axios.post('/conversations/' + userId)
  //     .then((res) => {
  //       console.log(res.data, 'line 16 FriendTileList')
  //       setChats(res.data)
  //     })
  // }, [])

  // will use userId to retrieve friends from message server
  useEffect( () => {
    axios.get('/friendList/' + userId)
    .then( (res) => {
      console.log(res.data, 'line 24 FriendTileList')
      setFriends(res.data)
    })
  }, [])

  // return (
  //   <div>
  //     <Search userId={userId} userFriends={props.userFriends} userInfo={props.userInfo} userId={props.userId} pendingRequests={props.pendingRequests} />
  //     {chat.map((chat) => <FriendTile chat={chat} userId={userId}/>)}
  //   </div>
  // )

  return (
    <div>
      <Search userId={userId} />
      {friends.map((friend) => <FriendTile friend={friend} userId={userId}/>)}
    </div>
  )
}

export default FriendTileList;