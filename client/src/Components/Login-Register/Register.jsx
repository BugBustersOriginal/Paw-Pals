import React from 'react';

function Register() {
  return(
    <form>
      <label for="username">username</label>
      <input type="text" placeholder="username" id="username" name="username" />
      <label for="password">password</label>
      <input type="password" placeholder="password" id="password" name="password" />
      <button>Create Account</button>
    </form>
  );
}

export default Register;