import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js'

export default function MessageWindow(props) {
  const [messageID, setMessageID] = useState(''); // messageID should tell us who the two users are
  const [messages, setMessages] = useState({});
  useEffect(() => {
    // call to get allMessages
  }, [])

  function connect () {
    socket.connect();
  }
  function disconnect () {
    socket.disconnect()
  }
  return (
    <div>
     <button onClick={ connect }>Connect to Socket.IO</button>
      <button onClick={ disconnect }>Disconnect Socket.IO</button>
    </div>
  )
}