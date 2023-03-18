import React, {useState, useEffect} from 'react';
import "../../../../client/chat.css";
import {socket} from '../../socket.js'

export default function Message(props) {
  const [newMessage, setNewMessage] = useState({
    sender:props.sender,
    content:'',
    type:'text',
    conversationId:props.conversationID,
    test:true
  });
  const [message, setMessage] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value)
  }
  const handleKeyDown =  (event) => {
    if (event.key === 'Enter') {
      setNewMessage({...newMessage,content:event.target.value})
    }
  };

  const handleNewMessage = async () => {
    try {
      if (newMessage.content) {
        await socket.emit('new-message', newMessage);
        setMessage('');
      }
    } catch (err) {
      console.error(`errors while emitting new-message ${err}`);
    }
  }

  useEffect(() => {
    setNewMessage(prevNewMessage => ({
      ...prevNewMessage,
      sender: props.sender
    }));
    },[props.sender]);

  useEffect(()=>{
    if(newMessage.content){
      handleNewMessage()
    }
  },[newMessage]);
  return (
    <div className = 'user_input'>
       <textarea
            class = "write_message"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
         />
         <input type="file" accept="image/*" />
    </div>
  )
}