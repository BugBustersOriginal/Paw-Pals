import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Map } from './Components/Map/Map.jsx';
import FriendTile from './Components/MessageList/FriendTile.jsx';
import FriendTileList from './Components/MessageList/FriendTileList.jsx';


export function App()  {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    fetch('/api/key')
      .then(response => response.json())
      .then(data => setApiKey(data.apiKey))
      .catch(error => console.log(error));
  })

  return (
    <div>
      <h1>Hello World!</h1>
      <FriendTile />
      <FriendTileList />
      <Map apiKey={apiKey}/>
    </div>
  )
}

