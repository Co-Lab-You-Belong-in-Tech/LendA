import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/LoginOld.css';

function LoginOld() {

  const [formState, changeFormState] = useState({
    activeState: {button: "LOGIN", id: 1},
    forms: [{ id: 1, button: "LOGIN" }, { id: 2, button: "SIGN UP"}]
  });
  

  const toggleActive = (index) => {
    changeFormState({...formState, activeState: formState.forms[index] })
  }

  const toggleActiveStyles = (index) => {
    if(formState.forms[index] === formState.activeState) {
      return "tab-active"
    } else {
      return "tab-inactive"
    }
  }

  const toggleLogin = (index) => {
    if(formState.forms[0] === formState.activeState) {
      return "loginForm"
    } else {
      return "loginForm-inactive"
    }
  }

  const toggleSignup = (index) => {
    if(formState.forms[1] === formState.activeState) {
      return "signupForm"
    } else {
      return "signupForm-inactive"
    }
  }

  return (
    <div className="loginContainer">

      <div className="loginBox">
        <div className="lbHeader">
        {formState.forms.map((elements, index) => (
          <div key={index} className={toggleActiveStyles(index)} onClick={() => {toggleActive(index)}}>
            <button>{elements.button}</button>
          </div>
          ))}
        </div>

        <div className={toggleLogin(0)}>
        <form className="emailLogin">
            <div className="formGroup">
              <input type="email" placeholder="Email"></input>
            </div>
            <div className="formGroup">
              <input type="password" placeholder="Password"></input>
            </div>
            <div className="formGroup">
              <button className="loginButton">Log In</button>
            </div>
            <div className="formGroup">
              <a href="/#" className="forgotPW">Forgot Password?</a>
            </div>
          </form>
        </div>

        <div className={toggleSignup(1)}>
        <form className="emailSignUp">
            <div className="formGroup">
              <input type="text" placeholder="First Name"></input>
            </div>
            <div className="formGroup">
              <input type="text" placeholder="Last Name"></input>
            </div>
            <div className="formGroup">
              <input type="email" placeholder="Email"></input>
            </div>
            <div className="formGroup">
              <input type="password" placeholder="Password"></input>
            </div>
            <div className="formGroup">
              <input type="password" placeholder="Confirm Password"></input>
            </div>
            <div className="formGroup">
              <button classsName="signUpButton">Sign Up</button>
            </div>
          </form>
        </div>
       
      </div>

    </div>
  );
}

export default LoginOld