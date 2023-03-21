import React, {useState, useEffect} from 'react';
import "../../../../client/chat.css";
import {socket} from '../../socket.js'
import axios from 'axios'

export default function Message(props) {
  const [newMessage, setNewMessage] = useState({
    sender:props.sender,
    content:'',
    type:'text',
    conversationId:props.conversationID,
    test:true
  });
  const [message, setMessage] = useState('');
  const [img, setImg] = useState('')
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

  const handleNewImg = (event) =>{
    setImg(URL.createObjectURL(event.target.files[0]))
  }

  const handleSendImg = () =>{
    console.log(img)
    axios.post("http://127.0.0.1:3000/uploads").then((result) =>{
      console.log(result)
    })
    setImg('')
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
      <div>
       <textarea
            className = "write_message"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
         />
        {img !== ''?
        <div>
            <img src={img}/>
            <button onClick={
              ()=>{
                handleSendImg()
              }
            }>send snap</button>
        </div>
        : null}
        </div>
         <input
          type="file"
          accept="image/*"
          onChange={
            (event)=>{
            handleNewImg(event)
          }}
          />
    </div>
  )
}