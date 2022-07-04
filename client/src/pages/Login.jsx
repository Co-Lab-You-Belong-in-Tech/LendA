import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import authService from '../features/auth/authService';
import BarLoader from 'react-spinners/ClipLoader';
import '../styles/Login.css'

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
        toast.error(message)
    }

    if(isSuccess || user) {
        navigate('/account')
    }

    dispatch(reset)

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }));
  }

  const onSubmit = (e) => {
      e.preventDefault()

      const userData = {
        email,
        password
      }

      dispatch(login(userData))
  }

  if(isLoading) {
    return <BarLoader />
}

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h3>Log In</h3>
        <form className="loginForm" onSubmit={onSubmit}>
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