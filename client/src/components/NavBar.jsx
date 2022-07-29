import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import '../styles/NavBar.css';
import logoa from '../lenda-logoa.png';

function NavBarNew() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    window.location.reload();
    // navigate("/")
    // history.push('/');
  };

  return (
    <>
      <div className="navbar">
        <div className="navlogo">
          <img src={logoa}></img>
          <a className="navlogo" href="/">
            LendA
          </a>
        </div>
        <ul className="menu" id="nav">
          {currentUser ? (
            <div className="loggedIn">
              <li>
                <Link to="/newpost">
                  <button id="newpost">New Post</button>
                </Link>
              </li>
              <li>
                <Link to="/account">
                  <button id="account">Account</button>
                </Link>
              </li>
              <li>
                <Link to="/" replace>
                  <button id="logout" onClick={onLogout}>
                    Log Out
                  </button>
                </Link>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to="/login">
                  <button id="login">Log In</button>
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}

export default NavBarNew;
