import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js';
import "../../../../client/chat.css";

export default function MessageBox(props) {

  const [isSender, setIsSender] =useState(false)

  useEffect (() => {
    setIsSender(props.sender.toString() === props.currentUser.toString())
    console.log(`props.sender is equal to ${props.sender} while props.currentUser is equal to ${props.currentUser} checking truth is ${props.sender === props.currentUser}`)
  })

  return (
    <div className ={`msg_box${isSender? ' sent':''}`}>
      <div>
      <div className={`line${isSender? ' sent':''}`}></div>
      <div className = 'username'>{isSender? 'me': props.sender}</div>
      <div className = 'content'>{props.content}</div>
      </div>
    </div>
  )
}