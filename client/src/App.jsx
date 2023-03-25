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
  const [userId, setUserId] =useState('');
  const [userFriends, setUserFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [userRealId, setUserRealId] = useState({});

  async function handleDevClick (e) {
    if(e.target.innerText === 'Logout') {
      try {
        setUserRealId({});
        // setUserInfo(null);
        // setPendingRequests([]);
        // setIncomingRequests([]);
        const guest = await axios.get('/logout');
        //for testing
        console.log(guest.data.reminder);

        navigate("/login");
      } catch (err) {
        console.log(err)
      }
    } else if (e.target.innerText === 'FriendTileList') {
      //for testing

      console.log('home has userId',userRealId)

      navigate('/home');

    } else {
      //for testing
      console.log(`${(e.target.innerText).toLowerCase()} has userId`, userRealId);

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
  //set userInfo from postgres into state
  const handleUserLogin = (data) => {
      //  let {address1, address2, city, state, country, zipcode} = data;
      //  let userFromProsgres = {userId: data.username, thumbnailUrl: data.avatar_url, address1, address2, city, state, country, zipcode};
      //  console.log('login path', userFromProsgres);
      let userFromProsgres = {userId: data.username};
       setUserRealId(userFromProsgres);
  };
  //sample userId data to pass down to other components (useState)
  // let userId = 'superman';
  let profileIcon = 'profileIcon';
  let userName = '@testUserName'


  // const getUserInfo = (user) => {
  //   axios.get('/getUserInfo', {params: {userId: userId} })
  //   .then((result) => {
  //     let userInfo = result.data;
  //     setUserInfo(userInfo);
  //     setUserFriends(userInfo.friends);
  //     setPendingRequests(userInfo.sentRequest);
  //     setIncomingRequests(userInfo.incomingRequests);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })
  // }



  useEffect(() => {
      axios.get('/authUser')
       .then((result) => {
          if (result.data) {
            let authUser = result.data;
            // let {address1, address2, city, state, country, zipcode} = authUser;
            // let userFromProsgres = {userId: authUser.username, thumbnailUrl: authUser.avatar_url, address1, address2, city, state, country, zipcode};
            // console.log('auth path', userFromProsgres);
            let userFromProsgres = {userId: authUser.username};
            setUserRealId(userFromProsgres);
            return authUser.username;
          }
        })
      .then((userName) => {
        let user;
        if (userName) {
          user = userName;
        } else if (userRealId.userId) {
          user = userRealId.userId;
        } else {
          //user in register page, in login page or not login success, do nothing
          return null;
        }
        console.log('check if user login success ', user);
        axios.get('/getUserInfo', {params: {userId: user} })
          .then((result) => {
            console.log('get user info from mongodb', result.data);
            let userInfo = result.data;
            setUserId(userInfo.userId);
            setUserInfo(userInfo);
            setUserFriends(userInfo.friends);
            setPendingRequests(userInfo.sentRequest);
            setIncomingRequests(userInfo.incomingRequests);
          })

      })
      .catch((err) => {
        console.error(err);
      })
      // getUserInfo(userId);

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
      <Route   path="/home"  element= {<FriendTileList userId={userId} userInfo={userInfo} userFriends={userFriends} pendingRequests={pendingRequests}/>}  />
        {/* <Route   path="/"  element= {<Login />}  /> */}
        <Route   path="/login"  element= {<Login handleUserLogin={handleUserLogin}/>}  />
        <Route   path="/register"  element= {<Register />}  />
        <Route   path="/map"  element= {<Map />}  />
        <Route   path="/friendtile"  element= {<FriendTile />}  />
        <Route   path="/messagewindow"  element= {<MessageWindow userId={userId} />}  />
        <Route   path="/notifications" element={<Notifications userId={userId} incomingRequests={incomingRequests} />} />
      </Routes>

      {/*
      <FriendTile />
      <FriendTileList />
      <Map />
      */}
    </div>
  )
}





