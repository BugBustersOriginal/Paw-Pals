import React, { useEffect, useState } from 'react';
import { Search } from './Search/Search.jsx';
import FriendTile from './FriendTile.jsx';
import axios from 'axios'

const FriendTileList = ( {userId} ) => {
  //will receive userId from App.jsx
  // console.log(props, 'line 8 FriendTileList')
  console.log(userId, 'line 9 userID from FriendTileList')
  // const userName = userId

  const [chats, setChats] = useState([])

  //will use userId to retrieve chats from message server
  useEffect(() => {
    axios.post('/conversations/' + userId)
      .then((res) => {
        console.log(res.data, 'line 16 FriendTileList')
        setChats(res.data)
      })
  }, [])

  return (
    <div>
      <Search userId={userId} />
      {chats.map((chat) => <FriendTile chat={chat} userId={userId}/>)}
    </div>
  )
}

export default FriendTileList;