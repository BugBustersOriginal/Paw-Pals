import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  function handleSubmit () {
    navigate("/home");
  };

  function handleClick () {
    navigate("/login");
  };

  return(
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit} >
        <input type="text" placeholder="First Name" id="firstName" name="firstName" required/>
        <input type="text" placeholder="Last Name" id="lastName" name="lastName" required/>
        <input type="text" placeholder="Username" id="username" name="username" required/>
        <input type="text" placeholder="Address 1" id="address1" name="address1"/>
        <input type="text" placeholder="Address 2" id="address2" name="address2"/>
        <input type="text" placeholder="City" id="city" name="city"/>
        <input type="text" placeholder="State" id="state" name="state"/>
        <input type="text" placeholder="Zip Code" id="zipCode" name="zipCode" required/>
        <input type="text" placeholder="Country" id="country" name="country" required/>
        <input type="password" placeholder="Password" id="password" name="password" required/>
        <input type="password" placeholder="Verify Password" id="Vpassword" name="Vpassword" required/>
        <button type="submit">Create Account</button>
      </form>
      <button className="link-button" onClick={handleClick} >Already have an account? Log in here</button>
    </div>
  );
}

export default Register;