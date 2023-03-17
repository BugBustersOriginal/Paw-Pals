import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MessageWindow from './Components/MessageWindow/MessageWindow.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Map } from './Components/Map/Map.jsx';
// import MessageInfo from './Components/MessageList/MessageInfo.jsx';
import FriendTileList from './Components/MessageList/FriendTileList.jsx';
import FriendTile from './Components/MessageList/FriendTile.jsx';
import Login from './Components/Login-Register/Login.jsx';
import Register from './Components/Login-Register/Login.jsx';

export function App()  {
  const navigate = useNavigate();

  function handleDevClick (e) {
    console.log(e.target.innerText);

    if(e.target.innerText === 'Login') {
      navigate("/");
    } else if (e.target.innerText === 'FriendTileList') {
      navigate("/home");
    } else {
      navigate(`/${(e.target.innerText).toLowerCase()}`);
    }
  }

  return (
    <div>
      <h1>Hello World!</h1>
      <h5>DEV BUTTONS</h5>
      <button onClick={(e) => handleDevClick(e)}>Login</button>
      <button onClick={(e) => handleDevClick(e)}>Register</button>
      <button onClick={(e) => handleDevClick(e)}>FriendTile</button>
      <button onClick={(e) => handleDevClick(e)}>FriendTileList</button>
      <button onClick={(e) => handleDevClick(e)}>Map</button>
      <button onClick={(e) => handleDevClick(e)}>MessageWindow</button>

      <Routes>
        <Route   path="/home"  element= {<FriendTileList />}  />
        <Route   path="/"  element= {<Login />}  />
        <Route   path="/register"  element= {<Register />}  />
        <Route   path="/map"  element= {<Map />}  />
        <Route   path="/friendtile"  element= {<FriendTile />}  />
        <Route   path="/messagewindow"  element= {<MessageWindow />}  />
      </Routes>

      {/*
      <FriendTile />
      <FriendTileList />
      <Map />
      */}
    </div>
  )
}





