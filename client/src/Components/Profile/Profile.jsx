import React, {useEffect, useState} from 'react';
import { Route, Routes, useNavigate, useLocation, withRouter } from 'react-router-dom';
import axios from 'axios';

function Profile({toggleTheme, userId, userInfo}) {

  const [inputs, setInput] = useState({});
  const [alerts, setAlerts] = useState('');
  const [hidePButtons, setPHidden] = useState(false);
  const [hideChangePassword, setCPHidden] = useState(true);
  const [hideChangePFP, setCPFPHidden] = useState(true);
  const [profileUrl, setPUrl] = useState('');

  const [changePassText, setPT] = useState('ChangePassword');

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    event.persist();
    setInput(inputs => (
      {...inputs, [event.target.name]:event.target.value}
    ))
  };

  async function handleLogout (e) {
      try {
        const guest = await axios.get('/logout');
        //for testing
        console.log(guest.data.reminder);

        navigate("/login");
      } catch (err) {
        console.log(err)
      }
  };

  const handleSubmit = async() => {
    event.preventDefault();
    try {
      //console.log('userId', userId);
      const guest = await axios.post('/changepassword', inputs);
      //for testing
      console.log(111, guest.data);
      if (guest.data.alert === undefined) {
        //render login page
        navigate(guest.data.url);

      } else {
       setAlerts(() => (
        guest.data.alert
       ))
      }
      // navigate('/login');

    } catch (err) {
      console.log(err);
    }

  };

  function toggleChangePassword () {
    setPHidden(!hidePButtons);
    setCPHidden(!hideChangePassword);
    if(!hidePButtons) {
      setPT('Go Back');
    } else {
      setPT('Change Password');
    }
  };

  useEffect (() => {
    inputs.username = userId.userId
    if (userInfo !== null) {
      if (userInfo.thumbnailUrl !== profileUrl) {
        setPUrl(userInfo.thumbnailUrl);
      }
    }
  }, [userId, userInfo]);

  return (
    <div className='profile'>
      <img className='profilePicture' src={profileUrl} alt="User Profile Picture" ></img>

      <div className='profileButtons' hidden={hidePButtons} className='auth-form-container'>
        <button className='profileButtons' hidden={hidePButtons} onClick={toggleTheme}>Toggle Theme</button>
        <button className='profileButtons' hidden={hidePButtons} onClick={() => handleLogout()}>Logout</button>
        <button className='profileButtons' onClick={() => toggleChangePassword()}>{changePassText}</button>
        <button className='profileButtons' hidden={hidePButtons} >Change Profile Picture</button>
      </div>
      <div hidden={hideChangePassword} className="auth-form-container">
        <form hidden={hideChangePassword} className="login-form" onSubmit={handleSubmit} >
          <label hidden={hideChangePassword} htmlFor="password">Password</label>
          <input hidden={hideChangePassword} type="password" placeholder="New Password" id="newPassword" name="newPassword" onChange={handleInputChange} value={inputs.newPassword|| ''} required/>
          <button hidden={hideChangePassword} type="submit">Set New Password</button>
        </form>
        {alerts !== '' ? <button>{alerts}</button>: null}
    </div>
    </div>
  );
};

export default Profile;