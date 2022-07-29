import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import BarLoader from 'react-spinners/ClipLoader';
import '../styles/SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    first: '',
    last: '',
    password: '',
    password2: '',
    zip: '',
  });

  const { first, last, email, password, password2, zip } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || currentUser) {
      navigate('/');
    }

    dispatch(reset);
  }, [currentUser, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        first,
        last,
        email,
        password,
        zip,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <BarLoader />;
  }

  return (
    <>
      <div className="signUpContainer">
        <div className="signUpBox">
          <h3>Create Account</h3>
          <form className="signUpForm" onSubmit={onSubmit}>
            <label for="first">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first"
              name="first"
              value={first}
              required
              onChange={onChange}
            ></input>
            <label for="last">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last"
              name="last"
              value={last}
              required
              onChange={onChange}
            ></input>
            <label for="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              required
              onChange={onChange}
            ></input>
            <label for="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              required
              onChange={onChange}
            ></input>
            <label for="password">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              required
              onChange={onChange}
            ></input>
            <label for="zipCode">Zip Code</label>
            <input
              type="text"
              className="form-control"
              id="zip"
              name="zip"
              value={zip}
              required
              onChange={onChange}
            ></input>
            <button type="submit">SIGN UP</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
