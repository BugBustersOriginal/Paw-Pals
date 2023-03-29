import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MessageWindow from './Components/MessageWindow/MessageWindow.jsx'
import { Route, Routes, useNavigate, useLocation, withRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Map } from './Components/Map/Map.jsx';
import  { Notifications }  from './Components/Notifications/Notifications.jsx';
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
  const [userLocation, setUserLocation] = useState(null);
  const [userId, setUserId] =useState('');
  const [userFriends, setUserFriends] = useState([]);
  const [friendsLocation, setFriendsLocation] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [userRealId, setUserRealId] = useState({});
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
      //  let {address1, address2, city, state, country, zipcode} = data;
      //  let userFromProsgres = {userId: data.username, thumbnailUrl: data.avatar_url, address1, address2, city, state, country, zipcode};
      //  console.log('login path', userFromProsgres);
      console.log(data.username, 'line 78 App.jsx')
      let userFromProsgres = {userId: data.username};
       setUserRealId(userFromProsgres); //kona
  };
  //sample userId data to pass down to other components (useState)
  // let userId = 'batman';
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
    if (userInfo) {
      axios.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {address: userInfo.location || 90680, key: 'AIzaSyDzYeSOmXDSnEUDWziiihd5ngEZ9EXylbs'} }) // restricted key
      .then((result) => {
        userInfo.location = result.data.results[0].geometry.location
        setUserLocation(userInfo)
      })
      .catch((err) => {
          console.error('error getting location', err);
        })
      }
  }, [userInfo])

  useEffect(() => {
    let temp = []
    userFriends.forEach((friend, idx) => {
      axios.get('/getUserInfo', {params: {userId: friend} })
      .then((result) => {
        // console.log('result', result.data)
        let friendInfo = result.data;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {address: friendInfo.location.slice(-5) || 90680, key: 'AIzaSyDzYeSOmXDSnEUDWziiihd5ngEZ9EXylbs'} })
        .then((result) => {
          temp[idx] = {userId: friendInfo.userId, thumbnailUrl: friendInfo.thumbnailUrl, location: result.data.results[0].geometry.location }
          // setFriendsLocation(current => [...current, friend])
          setFriendsLocation(temp)
          console.log(friendsLocation)
        })
      })
      .catch((err) => {
        console.error(err);
      })
    })
  }, [userFriends])

  //runs on document change
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;

      axios.get('/authUser')
       .then((result) => {
         console.log(result.data, 'line 111 App.jsx')
          if (result.data) {
            let authUser = result.data;
            console.log(authUser.username, 'line 113 App.jsx')
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
            userInfo.location = userInfo.location.slice(-5);
            setUserInfo(userInfo);
            setUserFriends(userInfo.friends);
            setPendingRequests(userInfo.sentRequest);
            setIncomingRequests(userInfo.incomingNotifications);
          })

      })
      .catch((err) => {
        console.error(err);
      })
      // getUserInfo(userId);

      hideLogoNav(location.pathname);
   }, [location,theme]);




  return (
    <div className={`App ${theme}`} onClick={() => hideLogoNav(location.pathname)}>
      <img hidden={hide} className={`logo-${theme}`} src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494__480.png" alt="fluffy doggy" ></img>
      <div className='notification-bar' hidden={!hide}>
      <button onClick={(e) => handleDevClick(e)}>Notifications</button>
          {/* {incomingRequests.length ? <span className="notification-badge"><p>{incomingRequests.length}</p></span> : null} */}
      </div>

      <Routes>
        <Route   path="/home"  element= {<FriendTileList userId={userId} userInfo={userInfo} userFriends={userFriends} pendingRequests={pendingRequests}/>}  />
          {/* <Route   path="/"  element= {<Login />}  /> */}
        <Route   path="/login"  element= {<Login handleUserLogin={handleUserLogin}/>}  />
        <Route   path="/register"  element= {<Register />}  />
        {/* <Route   path="/map"  element= {<Map userInfo={userLocation} userFriends={friendsLocation} />}  /> */}
        <Route   path="/profile"  element= {<Profile toggleTheme={toggleTheme}/>}  />
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





