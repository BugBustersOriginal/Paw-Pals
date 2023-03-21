import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js';
import "../../../../client/chat.css";

export default function MessageBox(props) {

  return (
    <div className ="msg_box">
      <div className = 'username'>{props.sender}</div>
      <div className = 'content'>{props.content}</div>
    </div>
  )
}