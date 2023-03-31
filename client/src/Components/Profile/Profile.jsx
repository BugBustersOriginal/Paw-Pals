import React, {useEffect, useState} from 'react';
import { Route, Routes, useNavigate, useLocation, withRouter } from 'react-router-dom';
import axios from 'axios';

function Profile({toggleTheme, userId}) {

  const [inputs, setInput] = useState({});
  const [alerts, setAlerts] = useState('');

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
  useEffect (() => {
    console.log(userId);
  }, [userId]);

  return (
    <div className='profile'>
      <div>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <button onClick={() => handleLogout()}>Logout</button>
        <button>Change Password</button>
        <button>Change Profile Picture</button>
      </div>
      <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmit} >
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="New Password" id="newPassword" name="newPassword" onChange={handleInputChange} value={inputs.newPassword|| ''} required/>
          <button type="submit">Create New Password</button>
        </form>
        {alerts !== '' ? <button>{alerts}</button>: null}
    </div>
    </div>
  );
};

export default Profile;