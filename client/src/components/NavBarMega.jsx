import React from 'react'
import { useState } from 'react';
import '../styles/NavBarMega.css';


function NavBarNew() {
    const [isActive, setActive] = useState(false);


    const toggleClass = () => {
        setActive(!isActive);
    };

  return (
    <div>
        <header className="header">
            <a href="/#" className="header-logo">LOGO</a>
            <div className={isActive ? 'menu-btn-open': 'menu-btn'}>
                <button className="button" onClick={toggleClass}>
                   
                    <i className={isActive ? "fa-solid fa-xmark fa-xl": "fa-solid fa-bars fa-xl"}></i>
                </button>
            </div>
            <ul className={isActive ? 'menu-items-open': 'menu-items'}>
                <li><a href="/#" className="menu-item">Home</a></li>
                <li className="dropdown">
                    <a href="/#" className={"menu-item"}>Dropdown Menu</a>
                    <ul className="dropdown-menu">
                        <li><a href="/#" className="menu-item">Item 1</a></li>
                        <li><a href="/#" className="menu-item">Item 2</a></li>
                        <li className="dropdown dropdown-right"><a href="/#" className="menu-item">
                            Item 3
                            <i className="fas fa-angle-right"></i>
                        </a>
                        <ul className="menu-right">
                            <li><a href="/#" className="menu-itm">Item 3.1</a></li>
                            <li><a href="/#" className="menu-itm">Item 3.2</a></li>
                            <li><a href="/#" className="menu-itm">Item 3.3</a></li>
                        </ul>
                        </li>
                        <li><a href="/#" className="menu-item">Item 4</a></li>
                    </ul>
                    </li>
                    <li><a href="/#" className="menu-item">Mega Menu</a>
                        <div className="mega-menu">
                            <div className="content">
                                <div className="col">
                                    <section>
                                        <h2>Feature 1</h2>
                                        <a href="/#" className="img-wrapper"><span className="img"><img src="http://picsum.photos/400?random=1" alt="random placeholder"></img></span></a>
                                        <p>Lorem ipsum dolor sit amet.</p>
                                    </section>
                                </div>
                                <div className="col">
                                    <section>
                                        <h2>Featured 2</h2>
                                        <ul className="mega-links">
                                            <li><a href="/#">Item 1</a></li>
                                            <li><a href="/#">Item 2</a></li>
                                            <li><a href="/#">Item 3</a></li>
                                            <li><a href="/#">Item 4</a></li>
                                            <li><a href="/#">Item 5</a></li>
                                        </ul>
                                    </section>
                                </div>
                                <div className="col">
                                    <section>
                                        <h2>Featured 3</h2>
                                        <ul className="mega-links">
                                            <li><a href="/#">Item 1</a></li>
                                            <li><a href="/#">Item 2</a></li>
                                            <li><a href="/#">Item 3</a></li>
                                            <li><a href="/#">Item 4</a></li>
                                            <li><a href="/#">Item 5</a></li>
                                        </ul>
                                    </section>
                                </div>
                                <div className="col">
                                    <section>
                                        <h2>Featured 4</h2>
                                        <ul className="mega-links">
                                            <li><a href="/#">Item 1</a></li>
                                            <li><a href="/#">Item 2</a></li>
                                            <li><a href="/#">Item 3</a></li>
                                            <li><a href="/#">Item 4</a></li>
                                            <li><a href="/#">Item 5</a></li>
                                        </ul>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li><a href="/#" className="menu-item">New Item</a></li>
                    <li><a href="/#" className="menu-item">My Account</a></li>
                </ul>
        </header>
        <section className="section">
            <h1>Mega Menu and Multi-Level Dropdown Menu</h1>
        </section>
    </div>
  )
}

export default NavBarNew