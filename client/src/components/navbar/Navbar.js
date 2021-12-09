import React, { useRef, useState, useEffect } from 'react'
import "./Navbar.css"
import { NavLink } from "react-router-dom"
import { ReactComponent as UserSvg } from "./assets/user.svg";
import { ReactComponent as DownArrowSvg } from "./assets/downArrow.svg";
import OutsideAlerter from '../outsideAlerter/OutsideAlerter';

const Navbar = () => {

  const [open, setIsOpen] = useState(false)

  console.log("check")

  const close = ()=>{
    setIsOpen(false)
  }

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-links">
          <ul>
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/esummit">
              <li>E-Summit</li>
            </NavLink>
          </ul>
        </div>
        <OutsideAlerter action={close} >
          <div className="navbar-profile">
            <div onClick={() => setIsOpen(!open)} className="user-profile">
              <div className="user-svg">
                <UserSvg></UserSvg>
              </div>
              <div className={open ? "arrow-svg open" : "arrow-svg"}>
                <DownArrowSvg></DownArrowSvg>
              </div>
            </div>
            <div
              className={open ? "login-signup-menu" : "login-signup-menu hide"}
            >
              <div className="main-menu">
                <ul>
                  <a href="">
                    <li>Login</li>
                  </a>
                  <a href="">
                    <li>Sign-up</li>
                  </a>
                </ul>
              </div>
              <div className="menu-arrow">
                <DownArrowSvg></DownArrowSvg>
              </div>
            </div>
          </div>
        </OutsideAlerter>
      </nav>
    </div>
  );
}

export default Navbar
