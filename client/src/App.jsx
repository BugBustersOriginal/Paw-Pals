import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MessageWindow from './Components/MessageWindow/MessageWindow.jsx'
import { Route, Routes, useNavigate, useLocation, withRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Map } from './Components/Map/Map.jsx';
// import MessageInfo from './Components/MessageList/MessageInfo.jsx';
import FriendTileList from './Components/MessageList/FriendTileList.jsx';
import FriendTile from './Components/MessageList/FriendTile.jsx';
import Login from './Components/Login-Register/Login.jsx';
import Register from './Components/Login-Register/Register.jsx';

export function App()  {
  const navigate = useNavigate();
  const location = useLocation();
  let history = createBrowserHistory();
  let hide = false;

  function handleDevClick (e) {
    if(e.target.innerText === 'Login') {
      navigate("/");
    } else if (e.target.innerText === 'FriendTileList') {
      navigate("/home");
    } else {
      navigate(`/${(e.target.innerText).toLowerCase()}`);
    }

    //console.log(location.pathname);
  }

  function hideLogoNav (pathname) {
    console.log(pathname === '/');
    if(pathname === '/') {
      hide = true;
    }
  }

  //sample userId data to pass down to other components
  let userId = 'testUser';




  useEffect(() => {
    console.log(hide);
    hideLogoNav(location.pathname);
  }, [location]);

  return (
    <div className="App">
      <img className="logo" src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494__480.png" alt="fluffy doggy" ></img>
      <h4 >Navigation</h4>
      <div className="devButtons" >
        <button onClick={(e) => handleDevClick(e)}>Login</button>
        <button onClick={(e) => handleDevClick(e)}>Register</button>
        {/*<img src="./fluffyDog.webp" alt="fluffy doggy"><button onClick={(e) => handleDevClick(e)}>FriendTile</button> */}
        <button onClick={(e) => handleDevClick(e)}>FriendTileList</button>
        <button onClick={(e) => handleDevClick(e)}>Map</button>
        <button onClick={(e) => handleDevClick(e)}>MessageWindow</button>
      </div>

      <Routes>
        <Route   path="/home"  element= {<FriendTileList userId={userId}/>}  />
        <Route   path="/"  element= {<Login />}  />
        <Route   path="/login"  element= {<Login />}  />
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





