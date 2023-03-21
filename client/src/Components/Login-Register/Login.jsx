import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  function handleSubmit () {
    navigate("/home");
  };

  function handleClick () {
    navigate("/register");
  };

  return(
    <div className="auth-form-container">
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleSubmit} >
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Username" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" name="password" />
        <button type="submit">Log In</button>
      </form>
      <button className="link-button forgot">Forgot Password</button>
      <button className="link-button" onClick={handleClick} >Don't have an account? Register here</button>
    </div>
  );
}

export default Login;