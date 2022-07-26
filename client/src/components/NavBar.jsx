import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    navigate('/');
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
          <li>
            <button
              id="newpost"
              onClick={() => {
                navigate('/newpost');
              }}
            >
              New Post
            </button>
          </li>

          {currentUser ? (
            <div className="loggedIn">
              <li>
                <button
                  id="account"
                  onClick={() => {
                    navigate('/account');
                  }}
                >
                  Account
                </button>
              </li>
              <li>
                <button id="logout" onClick={onLogout}>
                  Log Out
                </button>
              </li>
            </div>
          ) : (
            <>
              <li>
                <button
                  id="login"
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  Log In
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default NavBarNew;
