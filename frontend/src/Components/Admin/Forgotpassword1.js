import React, { useState } from 'react';
function Forgotpassword1() {
  const [Email, setUsername] = useState('');
  const [errorText, setErrorText] = useState('');
  const isValidEmail=(email)=> {
    // Regular expression pattern for basic email validation
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  }

  const validateForm = (event) => {
    event.preventDefault();

    if (Email.length===0) {
      setErrorText('Email can not be empty');
      
    } 
    else if(!isValidEmail(Email))
    {
      setErrorText('Enter valid email');
    }
    else{
      setErrorText('');

      alert("Successfully sent!!");
    }
    
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={validateForm} className='Loginform'><br></br><br></br><br></br>
        <h3>Enter Email</h3>
        <label htmlFor="username">Enter Email here:</label>
        <input
          type="text"
          placeholder="Enter Email here"
          id="Email"
          value={Email}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p id="errorText" style={{ color: 'red' }}>
          {errorText}
        </p>
        <button style={{color:"black"}}>Send OTP</button><br></br><br></br>
      </form>
    </>
  );
}

export default Forgotpassword1;
