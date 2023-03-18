import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js';
import "../../../../client/chat.css";

export default function MessageBox(props) {

  return (
    <div class ="msg_box">
      <div class = 'username'>{props.sender}</div>
      <div class = 'content'>{props.content}</div>
    </div>
  )
}