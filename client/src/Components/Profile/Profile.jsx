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
  const [updateUrl, setUpdateUrl] = useState ('');

  const [changePassText, setPT] = useState('ChangePassword');
  const [changePFPText, setPFPText] =useState('Change Profile Picture')

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

  const handlePFPSubmit = async() => {
    event.preventDefault();
    const submission = {
      userId: userId.userId,
      picUrl: updateUrl
    };
    try {
      //console.log('userId', userId);
      const guest = await axios.post('/changePFP', submission);
      //for testing
      console.log('Submitted data', guest.data);
      setUpdateUrl('');
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

  function toggleChangePFP () {
    setPHidden(!hidePButtons);
    setCPFPHidden(!hideChangePFP);
    if(!hidePButtons) {
      setPFPText('Go Back');
    } else {
      setPFPText('Change Profile Picture');
    }
  };

  const handleImg = async (e) => {
    e.preventDefault();
    let fileImage = new FormData();
    let IMGBB_API = 'f930789c2a22d062cb0f89a54f461c77';
    fileImage.append("image", e.target.files[0])
    fileImage.append('key', IMGBB_API);

    const preview = await axios ({
      method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: fileImage
    });

    try {
      if(preview.data.data.image.url !== null) {
        console.log('new Url', preview.data.data.image.url);
        setUpdateUrl(`${preview.data.data.image.url}`);
        //e.target.value = '';
      }
    } catch (err) {
      console.log('this happened when handling message preview',err);
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
        <button className='profileButtons' hidden={hidePButtons && hideChangePassword} onClick={() => toggleChangePassword()}>{changePassText}</button>
        <button className='profileButtons' hidden={hidePButtons && hideChangePFP} onClick={() => toggleChangePFP()}>{changePFPText}</button>
      </div>

      <div hidden={hideChangePassword} className="auth-form-container">
        <form hidden={hideChangePassword} className="login-form" onSubmit={handleSubmit} >
          <label hidden={hideChangePassword} htmlFor="password">Password</label>
          <input hidden={hideChangePassword} type="password" placeholder="New Password" id="newPassword" name="newPassword" onChange={handleInputChange} value={inputs.newPassword|| ''} required/>
          <button hidden={hideChangePassword} type="submit">Set New Password</button>
        </form>
        {alerts !== '' ? <button>{alerts}</button>: null}
      </div>

      <div hidden={hideChangePFP} className="auth-form-container">
        <form hidden={hideChangePFP} className="login-form" onSubmit={handlePFPSubmit} >
          {updateUrl !== '' ? <img className='profilePicture' src={updateUrl} alt='New User Picture'></img>: null}
          <input hidden={hideChangePFP} className="imageSubmission" type="file" accept="image/*" onChange={handleImg} required/>
          <button hidden={hideChangePFP} type="submit">Set Profile Picture</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;