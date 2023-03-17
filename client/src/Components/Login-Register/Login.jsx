import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  function handleLogin () {
    navigate("/home");
  };

  return(
    <form>
      <label for="username">username</label>
      <input type="text" placeholder="username" id="username" name="username" />
      <label for="password">password</label>
      <input type="password" placeholder="password" id="password" name="password" />
      <button onClick={handleLogin} >Log In</button>
    </form>
  );
}

export default Login;