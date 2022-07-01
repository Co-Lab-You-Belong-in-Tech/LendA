import React from 'react'
import { useState } from 'react';
import '../styles/NavBarNew.css';

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
        <a className="navlogo" href="/">LendA</a>
        <ul className="menu" id= "nav">
            
            <li className="dropdown">
                <a className="drop" href="/#" onClick={toggleDrop}>Browse Categories
                <i className="fa fa-angle-double-down"></i>
                <i className="fa fa-angle-double-up"></i>
                </a>
                    <ul className={isDropped ? "drop-content-responsive": "drop-content"}>
                        <li><a href="/#">Outdoor</a></li>
                        <li><a href="/#">Tools</a></li>
                        <li><a href="/#">Transportation</a></li>
                    </ul>
            </li>
            <li><a href="/#">New Post</a></li>
            <li><a href="/#">My Account</a></li>
            <li><a href="/#">Log Out</a></li>
           
        </ul>
  </div>
  </>
  )
}

export default NavBarNew