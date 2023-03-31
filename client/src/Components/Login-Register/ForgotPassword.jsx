import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {

  const [inputs, setInput] = useState({});
  const [alerts, setAlerts] = useState('');

  const navigate = useNavigate();


  const handleInputChange = (event) => {
    event.persist();
    setInput(inputs => (
      {...inputs, [event.target.name]:event.target.value}
    ))
  };

  const handleSubmit = async() => {
    event.preventDefault();
    try {
      const guest = await axios.post('/forgotpassword', inputs);
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

  function handleLoginClick () {
    navigate("/login");
  };

  function handleClick () {
    navigate("/register");
  };

  return(
    <div className="auth-form-container">
      <h2>Verify it's You</h2>
      <form className="login-form" onSubmit={handleSubmit} >
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Username" id="username" name="username" onChange={handleInputChange} value={inputs.username|| ''} required/>
        <label htmlFor="firstname">First Name</label>
        <input type="text" placeholder="First Name" id="firstname" name="firstname" onChange={handleInputChange} value={inputs.firstname|| ''} required/>
        <label htmlFor="lastname">Last Name</label>
        <input type="text" placeholder="Last Name" id="lastname" name="lastname" onChange={handleInputChange} value={inputs.lastname|| ''} required/>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="New Password" id="newPassword" name="newPassword" onChange={handleInputChange} value={inputs.newPassword|| ''} required/>
        <button type="submit">Create New Password</button>
      </form>
      {/*<button className="google-logo">Continue with Google</button>*/}
      <button className="link-button" onClick={handleLoginClick} >Log in</button>
      <button className="link-button" onClick={handleClick} >Don't have an account? Register here</button>
      {/* if username exist, alert user to change a new username */}
      {alerts !== '' ? <span className="alert">{alerts}</span>: null}
    </div>
  );
}

export default ForgotPassword;