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

  conversations.sort((a,b) => {
    const latestChatA = Math.max(...a.messages.map(m => Date.parse(m.createdAt)));
    const latestChatB = Math.max(...b.messages.map(m => Date.parse(m.createdAt)));
    return latestChatB - latestChatA;
  })

  let visibleChats = conversations.slice(0,4)

  return (
    <div>
      <Search userFriends={props.userFriends} userInfo={props.userInfo} userId={props.userId} incomingRequests={props.incomingRequests} pendingRequests={props.pendingRequests} />
      {visibleChats.map((visibleChat, index) => <FriendTile visibleChat={visibleChat} key={index} userId={props.userId}/>)}
    </div>
  )
}

export default FriendTileList;