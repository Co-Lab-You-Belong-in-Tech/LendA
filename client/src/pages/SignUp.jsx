import React from 'react'
import { useState } from 'react';
import '../styles/SignUp.css';

function SignUp() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
    <div className="signUpContainer">
        <div className="signUpBox">
            <h3>Create Account</h3>
            <form className="signUpForm" onSubmit={onSubmit}>
                <label for="name">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    value={name} 
                    required 
                    onChange={onChange}
                    >
                    </input>
                {/* <label for="lastName">Last Name</label>
                <input type="text" required></input> */}
                <label for="email">Email address</label>
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
                <label for="password">Confirm Password</label>
                <input 
                    type="password"
                    className="form-control" 
                    id="password2" 
                    name="password2" 
                    value={password2} 
                    required 
                    onChange={onChange} 
                    >
                    </input>
                <label for="zipCode">Zip Code</label>
                <input type="text"></input>
                <button type="submit">SIGN UP</button>

            </form>
        </div>

    </div>
    </>
  )
}

export default SignUp