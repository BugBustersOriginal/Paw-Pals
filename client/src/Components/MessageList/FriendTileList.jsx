import React, { useEffect, useState } from 'react';
import { Search } from './Search/Search.jsx';
import FriendTile from './FriendTile.jsx';
import axios from 'axios'

const FriendTileList = (props) => {
  //will receive {profileInfo}, {mostRecentMessages} as props
  console.log(props, 'line 9 FriendTileList')

  const [chats, setChats] = useState([])

  useEffect(() => {
    axios.post('/conversations/' + props.userId)
      .then((res) => {
        setChats(res.data)
      })

  }, [])



  return (
    <div>
      <Search userId={props.userId} />
      FriendTileList

      {chats.map((chat) => <FriendTile chat={chat} userId={props.userId}/>)}
    </div>
  )
}

export default FriendTileList;