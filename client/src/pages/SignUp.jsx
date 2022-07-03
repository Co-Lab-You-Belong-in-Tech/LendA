import React from 'react'
import '../styles/SignUp.css';

function SignUp() {
  return (
    <div className="signUpContainer">
        <div className="signUpBox">
            <h3>Create Account</h3>
            <form className="signUpForm">
                <label for="firstName">First Name</label>
                <input type="text" required></input>
                <label for="lastName">Last Name</label>
                <input type="text" required></input>
                <label for="email">Email address</label>
                <input type="email" required></input>
                <label for="password">Password</label>
                <input type="password" required></input>
                <label for="password">Confirm Password</label>
                <input type="password" required></input>
                <label for="zipCode">Zip Code</label>
                <input type="text" required></input>
                <button type="submit">SIGN UP</button>

            </form>
        </div>

    </div>
  )
}

export default SignUp