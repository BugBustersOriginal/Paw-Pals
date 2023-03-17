import React, {useState, useEffect} from 'react';
import "../../../../client/chat.css"

export default function Message(props) {
  const [newMessage, setNewMessage] = useState({
    sender:props.sender,
    content:'',
    type:'text'
  });
  const [message, setMessage] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value)

}
  const handleKeyDown =  (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value)
      setNewMessage({...newMessage,content:event.target.value})
    }
  }

  useEffect(()=>{
    console.log(`new message is equal to ${JSON.stringify(newMessage)}`)
  },[newMessage])
 return (
      <textarea
            class = "write_message"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
         />
 )
}