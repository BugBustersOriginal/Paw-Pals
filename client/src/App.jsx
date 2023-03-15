import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MessageWindow from './Components/MessageWindow/MessageWindow.jsx'
import { Map } from './Components/Map/Map.jsx';
import FriendTile from './Components/MessageList/FriendTile.jsx';
import FriendTileList from './Components/MessageList/FriendTileList.jsx';


export class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <MessageWindow/>
        <FriendTile />
        <FriendTileList />
        <Map/>
      </div>
    )
  }
}

