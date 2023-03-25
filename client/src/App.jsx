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
import Profile from './Components/Profile/Profile.jsx';

export function App()  {
  const navigate = useNavigate();
  const location = useLocation();
  let history = createBrowserHistory();
  const [hide, setHidden] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [userRealId, setUseRealId] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  //toggles darkmode
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  //handles Navigation
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

  //handles visibility of nav and logo elements
  function hideLogoNav (pathname) {
    if(['/', '/login', '/register'].includes(pathname)) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }
  //set userInfo from postgres into state
  const handleUserLogin = (data) => {
       let {address1, address2, city, state, country, zipcode} = data;
       let userFromProsgres = {userId: data.username, thumbnailUrl: data.avatar_url, address1, address2, city, state, country, zipcode};
       console.log('login path', userFromProsgres)
       setUseRealId(userFromProsgres);
  };
  //sample userId data to pass down to other components (useState)
  let userId = 'superman';
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


  //runs on document change
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;

    axios.get('/authUser')
     .then((result) => {
       let authUser = result.data;

        let {address1, address2, city, state, country, zipcode} = authUser;
        let userFromProsgres = {userId: authUser.username, thumbnailUrl: authUser.avatar_url, address1, address2, city, state, country, zipcode};
        console.log('auth path', userFromProsgres);
        setUseRealId(userFromProsgres);
        return {'queryUserId': authUser.username}
        })
      .then((result) => {
        console.log('result can be used to getUserInfo in mongodb', result);
      })
    // all mongodb fetch data should wrapped into .then(), means: first getAuthUser, then get data from mongodb
    // axios call to get userInfo from MongoDB
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
    // getUserInfo(userId);

    hideLogoNav(location.pathname);
  }, [location, theme]);


  return (
    <div className={`App ${theme}`} onClick={() => hideLogoNav(location.pathname)}>
      <img hidden={hide} className={`logo-${theme}`} src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494__480.png" alt="fluffy doggy" ></img>
      <div className='notification-bar' hidden={!hide}>
      <button onClick={(e) => handleDevClick(e)}>Notifications</button>
          {incomingRequests.length ? <span className="notification-badge"><p>{incomingRequests.length}</p></span> : null}
      </div>

      <Routes>
        <Route   path="/home"  element= {<FriendTileList userId={userId} userInfo={userInfo} userFriends={userFriends} pendingRequests={pendingRequests}/>}  />
          {/* <Route   path="/"  element= {<Login />}  /> */}
        <Route   path="/login"  element= {<Login handleUserLogin={handleUserLogin}/>}  />
        <Route   path="/register"  element= {<Register />}  />
        <Route   path="/profile"  element= {<Profile toggleTheme={toggleTheme}/>}  />
        <Route   path="/map"  element= {<Map />}  />
        <Route   path="/friendtile"  element= {<FriendTile />}  />
        <Route   path="/messagewindow"  element= {<MessageWindow userId={userId} />}  />
        <Route   path="/notifications" element={<Notifications userId={userId} incomingRequests={incomingRequests} />} />
      </Routes>

      <div className="devButtons" hidden={!hide}>
        <h4>Navigation</h4>
        <div>
          <button onClick={(e) => handleDevClick(e)}>Profile</button>
          <button onClick={(e) => handleDevClick(e)}>FriendTileList</button>
          <button onClick={(e) => handleDevClick(e)}>Map</button>
          {/*<button onClick={(e) => handleDevClick(e)}>MessageWindow</button>*/}
        </div>
      </div>


    </div>
  )
}





