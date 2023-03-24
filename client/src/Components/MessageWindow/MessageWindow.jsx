import React, {useState, useEffect, useRef, useCallback} from 'react';
import {socket} from '../../socket.js'
import "../../../../client/chat.css"
import Message from '../MessageWindow/Message.jsx'
import MessageBox from '../MessageWindow/MessageBox.jsx'


export default function MessageWindow(props) {
  //const [conversationID, setConversationID] = useState(props.conversationID||''); // messageID should tell us who the two users are
  const [conversationID, setConversationID] = useState('641cf574970e49637b8464bc');
  const [conversation, setConversation] = useState([]);
  const [message, setMessage]  = useState('');
  const [mappedMessages, setMappedMessages] = useState([]);
  const [sender, setSender] = useState(1);
  const senderInputRef = useRef(null);
  const messageContainerRef= useRef(null);
  const [participants, setParticipants] = useState([1,2]);

  useEffect(() => {
    // sets up new conversation if conversation between two users is new
    if(!conversationID) {
      socket.on('new-conversation', (data) => {
        if(!conversationID) {
          setConversationID(data.conversationId);
        }

      });
    }
  },[])
  useEffect(() => {
    socket.off('new-message'); // remove previous event listener
    socket.emit("join-conversation", conversationID, participants);
    socket.emit('get-conversation', conversationID);
    socket.on('conversation', (data) => {
      setConversation([...data]);
    });
    socket.on('new-message', (data) => {
        setConversation((prevConversation) => [...prevConversation, data]);
    });
    //initializeSocketEvents()
    // prevents memory leaks, this function is executed when the component unmounts
    return () => {
      socket.off("get-conversation");
      socket.off('conversation')

    }
  },[conversationID,sender])

  useEffect(()=> {
    if(conversation.length !== 0) {
      const mappedMessages = conversation.map((message) => {
        return <MessageBox key={message._id} sender={message.sender} content={message.content} currentUser = {sender} type={message.type} />;
      });
      setMappedMessages(mappedMessages);
    }
  },[conversation, sender])

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [mappedMessages]);
  // set state message
  const new_message = (new_message)=>{
   setMessage(new_message)
  }

  const changeSender = (event) => {
    event.preventDefault()
    let newSender = Number(senderInputRef.current.value);
    setSender(prevSender => newSender);
  }

  return (
  <div className = "window">
    Current User Id : {sender}
    <form> <input name ='userID' type = 'text' ref= {senderInputRef} /> <button onClick ={changeSender}>change user</button> </form>
    <div className="message-container" ref={messageContainerRef}>
      {mappedMessages}
    </div>
    <Message sender = {sender} newMessage = {new_message} conversationID={conversationID}/>
  </div>
  )
}