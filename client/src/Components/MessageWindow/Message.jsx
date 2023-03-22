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
  const [img, setImg] = useState('');
  const [time, settime] = useState('');
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
    setImg(event.target.files[0])
  }

  const handleSendImg = () =>{

      let fileImage = new FormData;
      let IMGBB_API = 'f930789c2a22d062cb0f89a54f461c77';
      fileImage.append("image", img);
      fileImage.append('key', IMGBB_API);
      return axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: fileImage
      })
        .then ((res) => {
          setNewMessage({...newMessage,content:"<img>"+res.data.data.image.url+"</img>"})
          return res;
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

  const setTime=(e)=>{
    console.log(e.target.value)
    settime({time:e.target.value})
  }

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
            <button onClick={()=>{handleSendImg()}}>send snap</button>
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
         <select onChange={(e)=>{setTime(e)}}>
          <option value={2000}>2 seconds</option>
          <option value={30000}>30 seconds</option>
          <option value={60000}>60 seconds</option>
         </select>
    </div>
  )
}