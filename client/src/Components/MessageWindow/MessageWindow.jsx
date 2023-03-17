import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js'
import "../../../../client/chat.css"
import Message from '../MessageWindow/Message.jsx'
import MessageBox from '../MessageWindow/MessageBox.jsx'


export default function MessageWindow(props) {
  const [conversationID, setConversationID] = useState('6173c3d2a87a173a1b6f60e6'); // messageID should tell us who the two users are
  const [conversation, setConversation] = useState([]);
  const [message, setMessage]  = useState('');
  const [mappedMessages, setMappedMessages] = useState([]);
  const [sender, setSender] = useState(1)

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
    if(conversation.length !== 0) {
      const newMappedMessages = conversation.map((message) => {
        return <MessageBox key={message._id} sender={message.sender} content={message.content} />;
      });
      setMappedMessages(newMappedMessages);
    }
  },[conversation])


  // set state message
  const new_message = (new_message)=>{
   setMessage(new_message)
  }
  useEffect(()=> {
    console.log("message", message)
    //socket.emit('new-message', message)
  })
  return (
  <div class = "window">
    {mappedMessages}
    <Message sender = {sender} newMessage = {new_message}/>
  </div>
  )
}