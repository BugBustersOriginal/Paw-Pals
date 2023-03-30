import React, { useEffect, useState } from 'react';
import { Search } from './Search/Search.jsx';
import FriendTile from './FriendTile.jsx';
import axios from 'axios'

const FriendTileList = ( props ) => {

  // const [friends, setFriends] = useState([])
  const [conversations, setConversations] = useState([]);

  //will use userId to retrieve conversations with each friend from message server
  useEffect(() => {
    axios.get('/latestChat/' + props.userId)
      .then((res) => {
        console.log(res.data, 'line 15 FriendTileList')
        setConversations(res.data)
      })
  }, [props.userId])

  return (
    <div>
      <Search userFriends={props.userFriends} userInfo={props.userInfo} userId={props.userId} pendingRequests={props.pendingRequests} />
      {conversations.map((conversation) => <FriendTile conversation={conversation} userId={props.userId} userInfo={props.userInfo}/>
      )}
    </div>
  )
}

export default FriendTileList;