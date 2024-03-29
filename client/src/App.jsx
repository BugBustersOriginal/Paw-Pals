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
import ForgotPassword from './Components/Login-Register/ForgotPassword.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faUser, faLocationDot, faComments } from '@fortawesome/free-solid-svg-icons';


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
  const [notificationBadge, setNotificationBadge] = useState(true);

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


        navigate("/login");
      } catch (err) {
        console.log(err)
      }
    } else if (e.target.innerText === 'FriendTileList') {

      navigate('/home');

    } else {

      navigate(`/${(e.target.innerText).toLowerCase()}`);
    }
  }

 //handles visibility of nav and logo elements
 function hideLogoNav (pathname) {
  if(['/', '/login', '/register', '/forgotpassword'].includes(pathname)) {
    setHidden(false);
  } else {
    setHidden(true);
  }
}
  //set userInfo from postgres into state
  const handleUserLogin = (data) => {

      let userFromProsgres = {userId: data.username};
       setUserRealId(userFromProsgres);
  };

  //clears notification badge on notification page
  const notificationView = () => {
    setNotificationBadge(false);
  }

  // creates user object with coordinate location
  useEffect(() => {
    if (userId) {
      axios.get('/getUserInfo', {params: {userId: userId} })
        .then((result) => {
          let userInfo = result.data;
          axios.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {address: userInfo.location || '90680', key: 'AIzaSyDzYeSOmXDSnEUDWziiihd5ngEZ9EXylbs'} }) // restricted key
          .then((result) => {
              console.log('result', result.data)
            if (result.data.results[0]) {
              userInfo.location = result.data.results[0].geometry.location
              setUserLocation(userInfo)
            } else {
              userInfo.location = { lat: 33.804, lng: -117.996 };
              setUserLocation(userInfo);
            }
          })
          .catch((err) => {
              console.error('error getting location', err);
            })
        })
      }
  }, [userId])

  // creates array of objects that contain friends and their coordinate location
  useEffect(() => {
    let temp = []
    if (userLocation) {
      // if (userLocation.friends.length > 0) {
        userLocation.friends.forEach((friend, idx) => {
          axios.get('/getUserInfo', {params: {userId: friend} })
          .then((result) => {
            let friendInfo = result.data;
            axios.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {address: friendInfo.location.slice(-5) || '90680', key: 'AIzaSyDzYeSOmXDSnEUDWziiihd5ngEZ9EXylbs'} })
            .then((result) => {
              // console.log('result', result.data)
              {
                // if (result.data.results[0]) {
                //   temp[idx] = {userId: friendInfo.userId, thumbnailUrl: friendInfo.thumbnailUrl, location: result.data.results[0].geometry.location }
                //   // setFriendsLocation(current => [...current, friend])
                //   setFriendsLocation(temp)
                // } else {
                  temp[idx] = {userId: friendInfo.userId, thumbnailUrl: friendInfo.thumbnailUrl, location: { lat: (33.804 + (1+idx)**2), lng: (-117.996 + (1+idx)**2) }}
                  // setFriendsLocation(current => [...current, friend])
                  setFriendsLocation(temp)
                }
                // console.log(friendsLocation)
              })
          })
          .catch((err) => {
            console.error(err);
          })
        })
      // }
    }
  }, [userLocation])


  //runs on document change
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;

      axios.get('/authUser')
       .then((result) => {
          if (result.data) {
            let authUser = result.data;
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
        // console.log('check if user login success ', user);
         axios.get('/getUserInfo', {params: {userId: user} })
          .then((result) => {
            let userInfo = result.data;
            //userInfo.location = userInfo.location.slice(-5);
            userInfo.location = '90066'
            setUserId(userInfo.userId);
            setUserInfo(userInfo);
            setUserFriends(userInfo.friends);
            setPendingRequests(userInfo.sentRequest);
            setIncomingRequests(userInfo.incomingNotifications);
          })

      })
      .catch((err) => {
        console.error(err);
      })
      setNotificationBadge(true);
      hideLogoNav(location.pathname);
   }, [location,theme]);


 //this is for page refresh set to every 5 seconds
 useEffect(() => {
  if (userId) {

    const interval = setInterval(() => {
      axios.get('/getUserInfo', {params: {userId: userId} })
          .then((result) => {
            // console.log('data refreshed');
            let userInfo = result.data;

            setUserInfo(userInfo);
            setUserFriends(userInfo.friends);
            setPendingRequests(userInfo.sentRequest);
            setIncomingRequests(userInfo.incomingNotifications);
          })
          .catch((err) => {
            console.error(err);
          })
      }, 5000)

      return () => clearInterval(interval);
  }
}, [userId]);


return (
  <div className={`App ${theme}`} onClick={() => hideLogoNav(location.pathname)}>
    <img hidden={hide} className={`logo-${theme}`} src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494__480.png" alt="fluffy doggy" ></img>
    <div className='notification-bar' hidden={!hide}>
    <FontAwesomeIcon icon={faBell} onClick={() => navigate('/notifications')} className="iconButton" />
        {incomingRequests.length && notificationBadge ? <span className="notification-badge"><p>{incomingRequests.length}</p></span> : null}
    </div>


    <Routes>
      <Route   path="/home"  element= {<FriendTileList userId={userId} userInfo={userInfo} userFriends={userFriends} incomingRequests={incomingRequests} pendingRequests={pendingRequests} theme={theme} />}  />
        {/* <Route   path="/"  element= {<Login />}  /> */}
      <Route   path="/login"  element= {<Login handleUserLogin={handleUserLogin}/>}  />
      <Route   path="/forgotpassword"  element= {<ForgotPassword/>}  />
      <Route   path="/register"  element= {<Register />}  />
      <Route   path="/map"  element= {<Map userInfo={userLocation} userFriends={friendsLocation} theme={theme} />}  />
      <Route   path="/profile"  element= {<Profile toggleTheme={toggleTheme} userId={userRealId} userInfo={userInfo} />}  />
      <Route   path="/friendtile"  element= {<FriendTile />}  />
      <Route   path="/messagewindow"  element= {<MessageWindow userId={userId} theme={theme} />}  />
      <Route   path="/notifications" element={<Notifications userId={userId} incomingRequests={incomingRequests} notificationView={notificationView} theme={theme} />} />
    </Routes>

    <div className={`devButtons-${theme}`} hidden={!hide}>
      <div>
        <FontAwesomeIcon icon={faUser} onClick={() => navigate('/profile')} className={`iconButton navigationButton-${theme}`} />
        <FontAwesomeIcon icon={faComments} onClick={() => navigate('/home')} className={`iconButton navigationButton-${theme} messageNavButton-${theme}`} />
        <FontAwesomeIcon icon={faLocationDot} onClick={() => navigate('/map')} className={`iconButton navigationButton-${theme}`} />
      </div>
    </div>


  </div>
)
}

