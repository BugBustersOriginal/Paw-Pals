import React, {useState, useEffect, useRef, useCallback} from 'react';
import {socket} from '../../socket.js'
import "../../../../client/chat.css"
import Message from '../MessageWindow/Message.jsx'
import MessageBox from '../MessageWindow/MessageBox.jsx'
import DateSplitter from './DateSplitter.jsx'
import { useLocation } from 'react-router-dom';


export default function MessageWindow(props) {
  //const [conversationID, setConversationID] = useState(props.conversationID||''); // messageID should tell us who the two users are
  const [conversationID, setConversationID] = useState('');
  const [conversation, setConversation] = useState([]);
  const [message, setMessage]  = useState('');
  const [mappedMessages, setMappedMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [participant, setParticipant] = useState('');
  const [participantProfilePic, setProfilePic] = useState('')
  const senderInputRef = useRef(null);
  const messageContainerRef= useRef(null);
  const participantRef = useRef(null);
  const [participants, setParticipants] = useState([]);
  const location = useLocation();

  function isSameDay(date1, date2) {
    console.log(`date1 is equal to ${date1}, date2 is equal to ${date2}`);
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  useEffect(() => {
    if(location.state?.users && location.state?.currentUser && location.state?.userTwo ) {
      // console.log(`users in message window is equal to ${location.state?.users}`)
      // console.log(`users in message window is equal to ${location.state?.currentUser}`)
      if(location.state?.userTwoProfileIcon) {
        setProfilePic(location.state?.userTwoProfileIcon)
      }
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
      const mappedMessages = conversation.map((message, index) => {
        var createdAtDate = new Date(message.createdAt);
        let showDateSeparator = false;
        if(index > 0) {
          const prevDate = new Date(conversation[index-1].createdAt);
          const currDate = new Date(conversation[index].createdAt);
          showDateSeparator = prevDate && !isSameDay(prevDate, currDate);
        } else if (index === 0) {
          showDateSeparator = true;
        }
        // uncomment only if you want the receiver to see images and not the sender
        // if(message.type === 'image' && message.sender === sender) {
        //   return ''
        // }
        return (
          <React.Fragment key = {message._id}>
            {showDateSeparator && (
            <DateSplitter date={createdAtDate} />
            )}
            <MessageBox sender={message.sender} content={message.content} currentUser = {sender} type={message.type} expirationTime = { message.expirationTime} />
          </React.Fragment>
        )
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
    setParticipants(prevParticipant => [sender,newParticipant]);
  }


  return (
  <div className ={`window-${props.theme}`}>
    <div className = 'participant-info' style={{ display: 'flex', alignItems: 'center' }}>
    <img src= {participantProfilePic} style={{ width: "75px", height: "75px", borderRadius: "50%" }}/>   <span style={{ marginLeft: "10px" }}> </span> @{participant !== undefined ? participant : ''}
    </div>
    <hr />
    {/* dev buttons below for troubleshooting  */}
    {/* <form> <input name ='userID' type = 'text' ref= {senderInputRef} /> <button onClick ={changeSender}>change user</button> </form>
    <form> <input name ='participantID' type = 'text' ref= {participantRef } /> <button onClick ={changeParticipant}>change participant</button> </form> */}
    <div className="message-container" ref={messageContainerRef}>
      {mappedMessages}
    </div>
    <Message sender = {sender} newMessage = {new_message} conversationID={conversationID} participants = {participants}/>
  </div>
  )
}