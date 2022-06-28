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
            <li><a className="navlogo-responsive" href="/">LendA</a></li>
            <li className="menu-items"><a href="/#">Home</a></li>
            <li className="dropdown">
                <a className="drop" href="/#" onClick={toggleDrop}>Dropdown
                <i className="fa fa-angle-double-down"></i>
                <i className="fa fa-angle-double-up"></i>
                </a>
                    <ul className={isDropped ? "drop-content-responsive": "drop-content"}>
                        <li><a href="/#">Drop 1</a></li>
                        <li><a href="/#">Drop 1</a></li>
                        <li><a href="/#">Drop 1</a></li>
                    </ul>
            </li>
            <li><a href="/#">News</a></li>
            <li><a href="/#">Blog</a></li>
            <li><a href="/#">Contact</a></li>
           
        </ul>
  </div>
  </>
  )
}

export default NavBarNew