import React, {useState, useEffect, useRef, useCallback} from 'react';
import {socket} from '../../socket.js'
import "../../../../client/chat.css"
import Message from '../MessageWindow/Message.jsx'
import MessageBox from '../MessageWindow/MessageBox.jsx'


export default function MessageWindow(props) {
  const [conversationID, setConversationID] = useState('6173c3d2a87a173a1b6f60e6'); // messageID should tell us who the two users are
  const [conversation, setConversation] = useState([]);
  const [message, setMessage]  = useState('');
  const [mappedMessages, setMappedMessages] = useState([]);
  const [sender, setSender] = useState(1);
  const senderInputRef = useRef(null);

  useEffect(() => {
    socket.emit("join-conversation", conversationID);
    socket.on('conversation', (data) => {
      setConversation([...data]);
    });
    socket.emit('get-conversation', conversationID);
    socket.on('new-message', (data) => {
      setConversation(prevConversation => [...prevConversation, data]);
    });
    // prevents memory leaks, this function is executed when the component unmounts
    return () => {
      socket.off("get-conversation");
      socker.off('conversation')

    }
  },[])

  useEffect(()=> {
    console.log(`i'm setting the new message!`)
    if(conversation.length !== 0) {
      const mappedMessages = conversation.map((message) => {
        return <MessageBox key={message._id} sender={message.sender} content={message.content} />;
      });
      setMappedMessages(mappedMessages);
    }
  },[conversation, sender])


  // set state message
  const new_message = (new_message)=>{
   setMessage(new_message)
  }

  const changeSender = (event) => {
    event.preventDefault()
    console.log(`sender is ${senderInputRef.current.value}`);
    let newSender = Number(senderInputRef.current.value);
    setSender(prevSender => newSender);
  }

  return (
  <div class = "window">
    Current User Id : {sender}
    <form> <input name ='userID' type = 'text' ref= {senderInputRef} /> <button onClick ={changeSender}>change user</button> </form>
    <div className="message-container">
      {mappedMessages}
    </div>
    <Message sender = {sender} newMessage = {new_message} conversationID={conversationID}/>
  </div>
  )
}