import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MessageWindow from './Components/MessageWindow/MessageWindow.jsx'
import { Map } from './Components/Map/Map.jsx';
import FriendTile from './Components/MessageList/FriendTile.jsx';
import FriendTileList from './Components/MessageList/FriendTileList.jsx';


export class App extends Component {
  constructor(props){
  super(props);
  this.state = {
    chatView: false
  };
  this.chatBtn = this.chatBtn.bind(this);
}




  chatBtn = () => {
    this.setState({
      chatView: true
    });
  };
  render() {
    if(this.state.chatView){
      return (
          <MessageWindow/>
      )}
    else{
      return (
        <div>
          <h1>Hello World!</h1>
          <button onClick={() => {this.chatBtn()}}>
          Chat Window
        </button>
          <FriendTile />
          <FriendTileList />
          {/* <Map/> */}
        </div>
      )

      }

  }

}

