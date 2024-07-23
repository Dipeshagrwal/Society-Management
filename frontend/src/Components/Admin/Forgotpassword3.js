import React, { useState } from 'react';

function Forgotpassword3() {
  const [First, setFirst] = useState('');
  const [Second, setSecond] = useState('');
  const [errorText, setErrorText] = useState('');

  

  const validateForm = (event) => {
    event.preventDefault();
    if (First.length===0 || Second.length === 0) {
      setErrorText('password can not be empty');
      
    } 
    else if (First !== Second) {
      setErrorText('You have entered diffrent passwords');
      
    } 
    else if(First.length<5 || Second.length<5){
      setErrorText('password must contains more then 5 charector');
    }
    
    else 
    {
      setErrorText('');
      alert("matched!!");
    }

  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={validateForm} className='Loginform'><br></br><br></br><br></br>
        <h3>Enter New Password</h3>
        <label htmlFor="username">Enter New password:</label>
        <input
          type="password"
          placeholder="Enter New password here"
          id="First"
          value={First}
          onChange={(e) => setFirst(e.target.value)}
        />
        <label htmlFor="username">Confirm New password:</label>
        <input
          type="password"
          placeholder="Confirm New password here"
          id="Second"
          value={Second}
          onChange={(e) => setSecond(e.target.value)}
        />
        <p id="errorText" style={{ color: 'red' }}>
          {errorText}
        </p>
        <button style={{color:"black"}}>Submit</button><br></br><br></br>
      </form>
    </>
  );
}

export default Forgotpassword3;
