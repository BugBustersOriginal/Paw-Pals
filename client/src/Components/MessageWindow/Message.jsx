import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js';
import axios from 'axios';
import "../../../../client/chat.css";

export default function Message(props) {
  console.log("message", props)
  const [newMessage, setNewMessage] = useState({
    sender:props.sender,
    content:'',
    type:'text', // change to image if sending image
    image:'',
    participants: [], // need to change this in the future once mary ann finishes their service
    expirationTime: '',
    conversationId:props.conversationID,
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
    event.preventDefault()
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
          //console.log(`res from image upload is equal to ${res.data.data.image.url}`)
          // setNewMessage({...newMessage,content:"<img>"+res.data.data.image.url+"</img>"})
          setNewMessage({...newMessage,content:res.data.data.image.url, type:'image'})
          return res;
        })
    setImg('')
  }

  useEffect(() => {
    //console.log(`props.conversationID is equal to ${props.conversationID}`)
    setNewMessage(prevNewMessage => ({
      ...prevNewMessage,
      sender: props.sender,
      conversationId: props.conversationID,
      participants: props.participants
    }));
    },[props.sender, props.conversationID, props.participants]);

  useEffect(()=>{
    //console.log(`newMessage is currently equal to ${JSON.stringify(newMessage)}`);
    if(newMessage.content){
      handleNewMessage()
    }
  },[newMessage]);

  const setTime=(e)=>{
    //console.log(e.target.value)
    settime({time:e.target.value})
    setNewMessage({...newMessage,'expirationTime':Number(e.target.value)})
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
            data-testid="write_message"
         />
        {img !== ''?
        <div>
            <img src={img} style={{ width: "20px", height: "20px" }}/>
            <button onClick={()=>{handleSendImg()}}>send snap</button>
        </div>
        : null}
        </div>
         <input
          className = "user-input"
          type="file"
          accept="image/*"
          onChange={handleNewImg}
        />
         <select onChange={(e)=>{setTime(e)}}>
          <option value={2000}>2 seconds</option>
          <option value={30000}>30 seconds</option>
          <option value={60000}>60 seconds</option>
         </select>
    </div>
  )
}