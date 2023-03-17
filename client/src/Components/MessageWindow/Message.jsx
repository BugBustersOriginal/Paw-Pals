import React, {useState, useEffect} from 'react';
import "../../../../client/chat.css"

export default function Message(props) {
  const [message, setMessage] = useState([]);
  const handleChange = (event) => {
    setMessage(event.target.value)

  }
  const handleKeyDown =  (event) =>{
    if (event.key === 'Enter') {
      console.log('do validate');
      props.newMessage(message)
      setMessage('')
    }
  }

  React.useEffect(()=>{
    console.log(message)
  })
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