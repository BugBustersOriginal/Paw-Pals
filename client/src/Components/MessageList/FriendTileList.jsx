import React, { useEffect, useState } from 'react';
import { Search } from './Search/Search.jsx';
import FriendTile from './FriendTile.jsx';
import axios from 'axios'

const FriendTileList = ( props ) => {
  //will receive userId from App.jsx
  console.log(props, 'line 8 props FriendTileList')

  const [conversations, setConversations] = useState([])
  const [friends, setFriends] = useState([])

  //will use userId to retrieve chats from message server
  // useEffect(() => {
  //   axios.post('/conversations/' + props.userId)
  //     .then((res) => {
  //       console.log(res.data, 'line 16 FriendTileList')
  //       setChats(res.data)
  //     })
  // }, [])

  //will use userId to retrieve friends list from message server
  useEffect(() => {
    axios.get('/friendList/' + props.userId)
      .then((res) => {
        // console.log(res.data.friends, 'line 26 FriendTileList')
        // console.log(res.data.conversations, 'line 27')
        // setFriends(res.data.friends)
        // setConversations(res.data.conversations)
        console.log(res.data)
        setFriends(res.data)
      })
  }, [props.userId])

  // return (
  //   <div>
  //     <Search userFriends={props.userFriends} userInfo={props.userInfo} userId={props.userId} pendingRequests={props.pendingRequests} />
  //     {chats.map((chat) => <FriendTile chat={chat} userId={props.userId}/>)}
  //   </div>
  // )

  return (
    <div>
      <Search userFriends={props.userFriends} userInfo={props.userInfo} userId={props.userId} pendingRequests={props.pendingRequests} />
      {friends.map((friend) => <FriendTile friend={friend}/>)}
    </div>
  )
}

export default FriendTileList;