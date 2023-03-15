import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js'

export default function MessageWindow(props) {
  const [conversationID, setConversationID] = useState('6173c3d2a87a173a1b6f60e6'); // messageID should tell us who the two users are
  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    socket.emit("join-conversation", conversationID);
    socket.emit('get-conversation', conversationID);
    socket.on('conversation', (data) => {
      console.log(`convo is equal to ${JSON.stringify(data)}`);
      setConversation([...data]);
    })
    // prevents memory leaks, this function is executed when the component unmounts
    return () => {
      socket.off("get-conversation");
    }
  },[]) // change to props.conversationID

  useEffect(()=> {
    let messages = conversation[0]
    console.log(`messages is equal to ${JSON.stringify(messages)}`);
    // const mappedMessages = reviews.map((review) => {
    //   return <IndividualReview reviewInfo = {review} key = {review.review_id} review_id = {review.review_id}/>
    // })
  },[conversation])

  return (
    <div>
      MessageWindow
    </div>
  )
}