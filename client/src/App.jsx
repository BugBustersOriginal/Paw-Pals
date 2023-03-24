import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MessageWindow from './Components/MessageWindow/MessageWindow.jsx'
import { Route, Routes, useNavigate, useLocation, withRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Map } from './Components/Map/Map.jsx';
import  { Notifications }  from './Components/Notifications/Notifications.jsx';
// import MessageInfo from './Components/MessageList/MessageInfo.jsx';
import FriendTileList from './Components/MessageList/FriendTileList.jsx';
import FriendTile from './Components/MessageList/FriendTile.jsx';
import Login from './Components/Login-Register/Login.jsx';
import Register from './Components/Login-Register/Register.jsx';

export function App()  {
  const navigate = useNavigate();
  const location = useLocation();
  let history = createBrowserHistory();
  const [hide, setHidden] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);

  async function handleDevClick (e) {
    if(e.target.innerText === 'Logout') {
      try {
        const guest = await axios.get('/logout');

        //for testing
        console.log(guest.data.reminder);

        navigate("/login");
      } catch (err) {
        console.log(err)
      }
    } else if (e.target.innerText === 'FriendTileList') {
      // const guest = await axios.get('/auth');

      //for testing
      // console.log(guest.data.reminder);

      navigate('/home');

    } else {
      navigate(`/${(e.target.innerText).toLowerCase()}`);
    }

    //console.log(location.pathname);
  }

  function hideLogoNav (pathname) {
    if(['/', '/login', '/register'].includes(pathname)) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }

  //sample userId data to pass down to other components (useState)
  let userId = 'superman';
  let profileIcon = 'profileIcon';
  let userName = '@testUserName'

  const getUserInfo = () => {
    axios.get('/getUserInfo', {params: {userId: userId} })
    .then((result) => {
      let userInfo = result.data;
      setUserInfo(userInfo);
      setUserFriends(userInfo.friends);
      setPendingRequests(userInfo.sentRequest);
      setIncomingRequests(userInfo.incomingRequests);
    })
    .catch((err) => {
      console.error(err);
    })
  }


  useEffect(() => {

    getUserInfo();

    hideLogoNav(location.pathname);
  }, [location]);


  return (
    <div className="App" onClick={() => hideLogoNav(location.pathname)}>
      <img hidden={hide} className="logo" src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494__480.png" alt="fluffy doggy" ></img>
      <h4 hidden={!hide}>Navigation</h4>
      <div className="devButtons" hidden={!hide}>
        <button onClick={(e) => handleDevClick(e)}>Logout</button>
        {/*<img src="./fluffyDog.webp" alt="fluffy doggy"><button onClick={(e) => handleDevClick(e)}>FriendTile</button> */}
        <button onClick={(e) => handleDevClick(e)}>FriendTileList</button>
        <button onClick={(e) => handleDevClick(e)}>Map</button>
        <button onClick={(e) => handleDevClick(e)}>MessageWindow</button>
        <button onClick={(e) => handleDevClick(e)}>Notifications</button>
          {incomingRequests.length ? <span className="notification-badge"><p>{incomingRequests.length}</p></span> : null}
      </div>

      <Routes>
      <Route   path="/home"  element= {<FriendTileList userId={userId} userInfo={userInfo} userFriends={userFriends} pendingRequests={pendingRequests} />}  />
        {/* <Route   path="/"  element= {<Login />}  /> */}
        <Route   path="/login"  element= {<Login />}  />
        <Route   path="/register"  element= {<Register />}  />
        <Route   path="/map"  element= {<Map />}  />
        <Route   path="/friendtile"  element= {<FriendTile />}  />
        <Route   path="/messagewindow"  element= {<MessageWindow userId={userId} />}  />
        <Route   path="/notifications" element={<Notifications userId={userId} incomingRequests={incomingRequests} rerender={getUserInfo}/>} />
      </Routes>

      {/*
      <FriendTile />
      <FriendTileList />
      <Map />
      */}
    </div>
  )
}





