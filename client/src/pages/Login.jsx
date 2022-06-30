import React from 'react'
import { useState } from 'react';
import '../styles/Login.css';

function Login() {

  const eSignUpBox = document.querySelector(".eSignUpBox");

  const eLoginBox = document.querySelector(".eLoginBox");
  // const [active, setActive] = useState(false);

  // const toggleClass = () => {
  //   setActive(true);
  // }

  return (
    <div className="loginContainer">

      <div className="loginBox">
        <div className="lbHeader">
          <div className="tab">
            <a href="" onClick={() => {
              eSignUpBox.classList.add("logMode")
            }}>Login</a>
          </div>
          <div className="tab">
            <a href="" onClick={() => {
              eLoginBox.classList.add("regMode")
            }}>Sign Up</a>
          </div>   
        </div>

        <div className="formFields">
          <div className="eLoginBox">
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

          <div className="eSignUpBox">
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


    </div>
  );
}

export default Login