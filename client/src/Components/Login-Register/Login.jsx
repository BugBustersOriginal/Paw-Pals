import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login({handleUserLogin}) {


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
      const guest = await axios.post('/login', inputs);
      //for testing
      console.log(guest.data.reminder);
      if (guest.data.alert == undefined) {
        //render login page
        navigate(guest.data.url);
        if (guest.data.url === '/home') {
         //send userId(which is usename, icon, address into app.jsx when user first login)
         handleUserLogin(guest.data.user);
          //for testing
          console.log('login set userId success', {userId: guest.data.user.username})

        }

      } else {
       setAlerts(() => (
        guest.data.alert
       ))
      }

    } catch (err) {
      console.log(err);
    }

  };

  function handleClick () {
    navigate("/register");
  };

  return(
    <div className="auth-form-container">
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleSubmit} >
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Username" id="username" name="username" onChange={handleInputChange} value={inputs.username|| ''} />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" name="password" onChange={handleInputChange} value={inputs.password|| ''}/>
        <button type="submit">Log In</button>
      </form>
      <button className="google-logo">Continue with Google</button>
      <button className="link-button forgot">Forgot Password</button>
      <button className="link-button" onClick={handleClick} >Don't have an account? Register here</button>
      {/* if username exist, alert user to change a new username */}
      {alerts !== '' ? <button>{alerts}</button>: null}
    </div>
  );
}

export default Login;