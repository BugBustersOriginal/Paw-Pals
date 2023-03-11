import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MessageWindow from './Components/MessageWindow/MessageWindow.jsx'
export class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <MessageWindow/>
      </div>
    )
  }
}

