import React, { useState } from 'react';

function Forgotpassword1() {
  const [OTP, setUsername] = useState('');
  const [errorText, setErrorText] = useState('');
  const isNumeric=(input)=>{
    return /^[0-9]+$/.test(input);
  }

  const validateForm = (event) => {
    event.preventDefault();

    if (OTP === '123456') {
      setErrorText('');
      alert('otp successfully submitted');
    } 
    else if(OTP.length===0){
      setErrorText('OTP can not be empty');
    }
    else if(OTP.length!==6){
      setErrorText('OTP must contain 6 digit');
    }
    else if(!isNumeric(OTP)){
      setErrorText('OTP must contains only numeric value');
    } 
    else 
    {
      setErrorText('Invalid OTP');
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
        <label htmlFor="username">Enter OTP here:</label>
        <input
          type="text"
          placeholder="Enter OTP here"
          id="OTP"
          value={OTP}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p id="errorText" style={{ color: 'red' }}>
          {errorText}
        </p>
        <button style={{color:"black"}}>Submit</button><br></br><br></br>
      </form>
    </>
  );
}

export default Forgotpassword1;
