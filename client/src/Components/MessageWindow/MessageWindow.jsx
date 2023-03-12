import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js'

export default function MessageWindow(props) {
  const [messageID, setMessageID] = useState(''); // messageID should tell us who the two users are
  const [messages, setMessages] = useState({});
  const [socketConnection, setSocket] = useState('')
  useEffect(() => {
    if(socket.connected === true) {
      setSocket(socketConnection => true)
    }
  }, [])

  function connect () {
    console.log(socket.connected)
    socket.connect()
    setSocket(socketConnection => socket.connected)



  }
  function disconnect () {
    socket.disconnect()
    setSocket(socketConnection => socket.connected)
  }

  useEffect(() => {
    console.log(`socketConnection is equal to ${socketConnection}`)
  },[socketConnection])
  return (
    <div>
      <h1>{String(socketConnection)}</h1>
     <button onClick={ connect }>Connect to Socket.IO</button>
      <button onClick={ disconnect }>Disconnect </button>
    </div>
  )
}