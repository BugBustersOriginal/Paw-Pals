import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
  //remember all filled information in register
  const [inputs, setInput] = useState({});
  const [alerts, setAlerts] = useState('');

  const navigate = useNavigate();


  //everytime user want to fill in the form, it will put it into input object
  const handleInputChange = (event) => {
    event.persist();
    setInput(inputs => (
      {...inputs, [event.target.name]:event.target.value}
    ))
  }

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      const guest = await axios.post('http://127.0.0.1:8080/signup', inputs,
      { headers: {
        "Access-Control-Allow-Origin": true
      }});
      console.log(guest.data.reminder);
      if (guest.data.alert == undefined) {
        //render login page
        navigate(guest.data.url);

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
    navigate("/login");
  };

  return(
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit} >
        <input type="text" placeholder="First Name" id="firstName" name="firstname" onChange={handleInputChange} value={inputs.firstname|| ''} required/>
        <input type="text" placeholder="Last Name" id="lastName" name="lastname" onChange={handleInputChange} value={inputs.lastname|| ''} required/>
        <input type="text" placeholder="Username" id="username" name="username" onChange={handleInputChange} value={inputs.username|| ''} required/>
        <input type="text" placeholder="Address 1" id="address1" name="address1" onChange={handleInputChange} value={inputs.address1|| ''}/>
        <input type="text" placeholder="Address 2" id="address2" name="address2"onChange={handleInputChange} value={inputs.address2|| ''}/>
        <input type="text" placeholder="City" id="city" name="city" onChange={handleInputChange} value={inputs.city|| ''}/>
        <input type="text" placeholder="State" id="state" name="state" onChange={handleInputChange} value={inputs.state|| ''}/>
        <input type="text" placeholder="Zip Code" id="zipCode" name="zipcode" onChange={handleInputChange} value={inputs.zipcode|| ''} required/>
        <input type="text" placeholder="Country" id="country" name="country" onChange={handleInputChange} value={inputs.country|| ''} required/>
        <input type="password" placeholder="Password" id="password" name="password" onChange={handleInputChange} value={inputs.password|| ''} required/>
        {/* not deal with this verify password */}
        <input type="password" placeholder="Verify Password" id="Vpassword" name="Vpassword" required/>
        <button type="submit">Create Account</button>
      </form>
      <button className="link-button" onClick={handleClick} >Already have an account? Log in here</button>
      {/* if username exist, alert user to change a new username */}
      {alerts !== '' ? <button>{alerts}</button>: null}
    </div>
  );
}

export default Register;