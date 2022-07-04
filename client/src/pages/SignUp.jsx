import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import authService from '../features/auth/authService';
import BarLoader from 'react-spinners/ClipLoader';
import '../styles/SignUp.css';

function SignUp() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/UserDash')
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

        if(password !== password2) {
            toast.error("Passwords do not match")
        } else {
            const userData = {
                name, email, password,
            }

            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <BarLoader />
    }

    // const response = await toast.promise(
    //     post("/register"),
    //     {
    //         pending: 'Creating account',
    //         success: 'Account created! 👍',
    //         error: 'Problem creating account'
    //     } 
    // );
    // console.log(response)

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