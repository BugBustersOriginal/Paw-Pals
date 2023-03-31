import React, { useEffect, useState } from 'react';
import { Search } from './Search/Search.jsx';
import FriendTile from './FriendTile.jsx';
import axios from 'axios'

const FriendTileList = ( props ) => {

  const [conversations, setConversations] = useState([]);

  //will use userId to retrieve conversations with each friend from message server
  useEffect(() => {
    axios.get('/latestChat/' + props.userId)
      .then((res) => {
        setConversations(res.data)
      })
  }, [props.userId])

  return (
    <div>
      <Search userFriends={props.userFriends} userInfo={props.userInfo} userId={props.userId} incomingRequests={props.incomingRequests} pendingRequests={props.pendingRequests} />
      {conversations.map((conversation, index) => <FriendTile conversation={conversation} key={index} userId={props.userId}/>
      )}
    </div>
  )
}

export default FriendTileList;