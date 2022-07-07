import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import '../styles/NavBarNew.css';
import logoa from '../lenda-logoa.png'; 

function NavBarNew() {
    const [isClicked, setIsClicked] = useState(false);
    const [isDropped, setIsDropped] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const toggleClass = () => {
        setIsClicked(!isClicked)
    };

    const toggleDrop = () => {
        setIsDropped(!isDropped)
    };

  return ( 
    <>
    <div className='navbar'>
        <div className="navlogo">
            <img src={logoa}></img>
            <a className="navlogo" href="/">LendA</a>
        </div>
        <ul className="menu" id= "nav">
            {user ? (
                <li><button id="logout" onClick={onLogout}>LOG OUT</button></li>
            ): (<>
                <li><button id="login" onClick={() => {navigate('/login')}}>LOG IN</button></li>
            </>)}
            <li className="dropdown">
                <a className="drop" href="/#" onClick={toggleDrop}>Explore
                <i className="fa fa-angle-double-down"></i>
                <i className="fa fa-angle-double-up"></i>
                </a>
                    <ul className={isDropped ? "drop-content-responsive": "drop-content"}>
                        <li><a href="/#">Outdoor</a></li>
                        <li><a href="/#">Tools</a></li>
                        <li><a href="/#">Transportation</a></li>
                    </ul>
            </li>
            <li><a href="/Newpost">New Post</a></li>
            <li className="dropdown">
                <a className="drop" href="/account">Account</a>
                <ul className={isDropped ? "drop-content-responsive": "drop-content"}>
                    <li><a href="/newpost">New Post</a></li>
                    <li><a href="/newpost">Account</a></li>
                    <li><a href="/newpost">Log Out</a></li>
                </ul>
            </li>
            
            
           
        </ul>
  </div>
  </>
  )
}

export default NavBarNew