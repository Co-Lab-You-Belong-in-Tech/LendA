import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

function Login() {

  const navigate = useNavigate();

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h3>Log In</h3>
        <form className="loginForm">
          <label for="email">Email Address</label>
          <input type="email" required></input>
          <label for="password">Password</label>
          <input type="password" required></input>
          <button type="submit">LOG IN</button>
        </form>
        <div className="forgotpw">
          <a href="/#">Forgot password?</a>
        </div>

        <div className="orSection">
          {/* <div className="lines"></div> */}
          <p className="orLines">OR</p>
          {/* <div className="lines"></div> */}
        </div>

        <div className="createAcct">
          <button className="createAcctBtn" onClick={() => {navigate('/signup')}}>CREATE ACCOUNT</button>
        </div>

      </div>
    
    
    
    </div>
  )
}

export default Login