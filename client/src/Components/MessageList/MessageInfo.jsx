import React, { useState } from 'react';
//import axios from 'axios'; //I don't think I will need this since props provided from message chat history

const MessageInfo = (props) => {
  console.log(props, 'line 5 FriendTile')
  /**
   * note: the state will change based on the message chat history so will need props from message chat history component
   * questions:
   *   - what will props provide? username? datestamp?
   *   - what format? if it's an array, I can access the last object in the array
   *   - I need props from both message chat history and login profile (profile icon)
   *     -- userid will be in both message chat history and login profile
   */


  const [latestMessage, setLatestMessage] = useState('')

  // let props = { //this will be replaced by real props once connected to other components
  //   url: 'url',
  //   username: '@mspaws',
  //   datestamp: '12.19',
  //   latestMessage: 'hello, hi there'
  // }

  return (
    <div className="friend-tile">
      <li>
        <ul>{props.profileIcon}</ul>
        <ul>username: {props.username}</ul>
        <ul>{props.datestamp}</ul>
        <ul>message: {props.message}</ul>
        <ul>{props.image}</ul>
        <ul>message notification: {props.messageNotificationStatus}</ul>
        <ul>image notification: {props.imageNotificationStatus}</ul>
      </li>

    </div>
  )
}

export default MessageInfo;