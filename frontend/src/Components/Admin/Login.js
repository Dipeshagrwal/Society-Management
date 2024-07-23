import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const validateForm = (event) => {
    let isValid = true;
    if (username.length==0 || password.length == 0) {
      setErrorText('Email or password can not be empty');
      isValid = false;
    } 
    else if(password.length<5){
      setErrorText('password must contains more then 5 cherector');
      isValid = false;
    }
    else{
      return isValid;
    }
    
  };
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const isValid = validateForm();
    
    try {
      if (!isValid) {
        // Display an error message or take appropriate action
        return;
      }
      const response = await axios.post('/login', {
        email: username,
        password: password,
      });
      Swal.fire({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
        allowOutsideClick: false, // Prevent closing on outside click
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to the home page after clicking "OK"
          window.location.href = '/Flat'; // Replace '/' with the actual home page route
        }
      });
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorText('Invalid email or password');
      } else {
        setErrorText('An error occurred while logging in');
      }
    }

  
  }
  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit} className='Loginform'>
        <h3>Login Here</h3>
        <label htmlFor="username">Email</label>
        <input
          type="email"
          placeholder="Enter Email here"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p id="errorText" style={{ color: 'red' }}>
          {errorText}
        </p>
        <button style={{color:"black"}} type="submit">Log In</button><br></br><br></br>
        <a href='/Forgotpassword1/'>Forgot password?</a>
      </form>
    </>
  );
}

export default Login;
