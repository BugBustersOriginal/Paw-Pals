import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile({toggleTheme},{handleDevClick}) {

  const navigate = useNavigate();

  async function handleLogout (e) {
      try {
        const guest = await axios.get('/logout');
        //for testing
        console.log(guest.data.reminder);

        navigate("/login");
      } catch (err) {
        console.log(err)
      }

  }

  return (
    <div className='profile'>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => handleLogout()}>Logout</button>
      <button>Change Password</button>
      <button>Change Profile Picture</button>
    </div>
  );
};

export default Profile;