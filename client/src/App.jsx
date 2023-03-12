import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import MessageWindow from './Components/MessageWindow/MessageWindow.jsx'
=======
import { Map } from './Components/Map/Map.jsx';
import FriendTile from './Components/MessageList/FriendTile.jsx';
import FriendTileList from './Components/MessageList/FriendTileList.jsx';


>>>>>>> 85ce16a1bcb7eb603c8258d83e5d1424e158303f
export class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
<<<<<<< HEAD
        <MessageWindow/>
=======
        <FriendTile />
        <FriendTileList />
        <Map/>
>>>>>>> 85ce16a1bcb7eb603c8258d83e5d1424e158303f
      </div>
    )
  }
}

