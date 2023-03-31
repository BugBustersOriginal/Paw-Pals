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

  console.log(conversations, 'line 18')

  // for (var i = 0; i < conversations.length-1; i++) {
  //   console.log(conversations[i].messages.length, 'line 21')
  //   console.log(conversations[i].messages[conversations[i].messages.length-1].createdAt, 'line 20')
  //   let timeOfLastChat = conversations[i].messages[conversations[i].messages.length-1].createdAt;

  //   if (conversations[i].messages === undefined) {
  //     conversations[i].messages = []
  //   }
  // }

  conversations.sort((a,b) => {
    const latestChatA = Math.max(...a.messages.map(m => Date.parse(m.createdAt)));
    // console.log(latestChatA, 'line 32')
    const latestChatB = Math.max(...b.messages.map(m => Date.parse(m.createdAt)));
    // console.log(latestChatB, 'line 34')
    return latestChatB - latestChatA;
  })

  console.log(conversations, 'line 36')


  // console.log(conversations[0].messages, 'line 26')
  let visibleChats = conversations.slice(0,4)

  return (
    <div>
      <Search userFriends={props.userFriends} userInfo={props.userInfo} userId={props.userId} incomingRequests={props.incomingRequests} pendingRequests={props.pendingRequests} />
      {/* {conversations.map((conversation, index) => <FriendTile conversation={conversation} key={index} userId={props.userId}/>)} */}
      {visibleChats.map((visibleChat, index) => <FriendTile visibleChat={visibleChat} key={index} userId={props.userId}/>)}
    </div>
  )
}

export default FriendTileList;