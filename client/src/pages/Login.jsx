import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }));
  }

  const onSubmit = (e) => {
      e.preventDefault()
  }

  const navigate = useNavigate();

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h3>Log In</h3>
        <form className="loginForm">
          <label for="email">Email Address</label>
          <input 
            type="email"
            className="form-control" 
            id="email" 
            name="email" 
            value={email} 
            required 
            onChange={onChange} 
            >
              </input>
          <label for="password">Password</label>
          <input 
            type="password"
            className="form-control" 
            id="password" 
            name="password" 
            value={password} 
            required 
            onChange={onChange} 
            >
            </input>
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