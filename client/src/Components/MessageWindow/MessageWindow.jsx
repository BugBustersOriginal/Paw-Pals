import React, {useState, useEffect, useRef, useCallback} from 'react';
import {socket} from '../../socket.js'
import "../../../../client/chat.css"
import Message from '../MessageWindow/Message.jsx'
import MessageBox from '../MessageWindow/MessageBox.jsx'
import { useLocation } from 'react-router-dom';


export default function MessageWindow(props) {
  //const [conversationID, setConversationID] = useState(props.conversationID||''); // messageID should tell us who the two users are
  const [conversationID, setConversationID] = useState('');
  const [conversation, setConversation] = useState([]);
  const [message, setMessage]  = useState('');
  const [mappedMessages, setMappedMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [participant, setParticipant] = useState('');
  const senderInputRef = useRef(null);
  const messageContainerRef= useRef(null);
  const participantRef = useRef(null);
  const [participants, setParticipants] = useState([]);
  const location = useLocation()
  useEffect(() => {
    if(location.state?.users && location.state?.currentUser && location.state?.userTwo ) {
      // console.log(`users in message window is equal to ${location.state?.users}`)
      // console.log(`users in message window is equal to ${location.state?.currentUser}`)
      setSender(location.state?.currentUser);
      setParticipants([...location.state?.users]);
      setParticipant(location.state?.userTwo);
    }
  },[])
  useEffect(() => {
    // sets up new conversation if conversation between two users is new
    if(participants.length !== 0) {
      //console.log(`participants is equal to ${participants}`)
      socket.emit('get-conversation', participants);
    }
    socket.on('conversation', (data) => {
      //console.log(`data in convo is equal to ${JSON.stringify(data.messages)}`);
      setConversationID(data._id);
      if(data.messages.length > 0) {
        console.log(`setting conversation`)
        setConversation([...data.messages]);
      }
    });
  },[participants])
  useEffect(() => {
    socket.off('new-message'); // remove previous event listener
    socket.emit("join-conversation", conversationID, participants);
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
      //console.log(`mapping!`)
      const mappedMessages = conversation.map((message) => {
        console.log(`message is equal to ${JSON.stringify(message)}`);
        // if(message.type === 'image' && message.sender === sender) {
        //   return ''
        // }
        return <MessageBox key={message._id} sender={message.sender} view={message.viewed} participant={participants} msgId = {message._id} convId ={conversationID} content={message.content} currentUser = {sender} type={message.type} expirationTime = { message.expirationTime}  />;
      });
      setMappedMessages(mappedMessages);
  },[conversation, sender, participant])

  useEffect(() => {
    return () => {
      setMappedMessages([]);
    };
  }, []);

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
    let newSender = senderInputRef.current.value;
    setSender(prevSender => newSender);
  }

  const changeParticipant = (event) => {
    event.preventDefault()
    let newParticipant = participantRef.current.value;
    console.log(`newParticipant is equal to ${newParticipant}`);
    setParticipants(prevParticipant => [sender,newParticipant]);
  }




  return (
  <div className = "window">
    {participant !== undefined ? participant : ''}
    <div className="message-container" ref={messageContainerRef}>
      {mappedMessages}
    </div>
    <Message sender = {sender} newMessage = {new_message}  conversationID={conversationID} participants = {participants}/>
  </div>
  )
}