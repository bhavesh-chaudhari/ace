import React, { useRef, useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as UserSvg } from "./assets/user.svg";
import { ReactComponent as DownArrowSvg } from "./assets/downArrow.svg";
import OutsideAlerter from "../outsideAlerter/OutsideAlerter";
import { useGlobalContext } from "../../context/appContext";

const Navbar = () => {
  const [open, setIsOpen] = useState(false);

  const { user } = useGlobalContext();

  console.log("check");

  const close = () => {
    setIsOpen(false);
  };

  const logout = () => {
    window.open("http://localhost:5000/api/v1/auth/logout", "_self");
  };

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
        <OutsideAlerter action={close}>
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
                  {user ? (
                    <a>
                      <li onClick={logout}>logout</li>
                    </a>
                  ) : (
                    <>
                      <Link to="/register">
                        <li>Dashboard</li>
                      </Link>
                      <Link to="/register">
                        <li>Register</li>
                      </Link>
                    </>
                  )}
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
};

export default Navbar;
