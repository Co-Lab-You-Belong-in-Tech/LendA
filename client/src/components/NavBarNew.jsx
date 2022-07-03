import React from 'react'
import { useState } from 'react';
import '../styles/NavBarNew.css';
import logoa from '../lenda-logoa.png'; 

function NavBarNew() {
    const [isClicked, setIsClicked] = useState(false);
    const [isDropped, setIsDropped] = useState(false);

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
            <li><button id="account">Account</button></li>
           
        </ul>
  </div>
  </>
  )
}

export default NavBarNew