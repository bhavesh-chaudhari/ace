import React, { useRef, useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, Link, useMatch } from "react-router-dom";
import { ReactComponent as UserSvg } from "./assets/user.svg";
import { ReactComponent as DownArrowSvg } from "./assets/downArrow.svg";
import OutsideAlerter from "../outsideAlerter/OutsideAlerter";
import { useGlobalContext } from "../../context/appContext";
import Avatar from "react-avatar"
import { ClipLoader } from "react-spinners";

const Navbar = () => {
  const [open, setIsOpen] = useState(false);

  const { user, isLoading } = useGlobalContext();

  const match = useMatch("/dashboard")

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
            {match ? (
              <div className="show-dashboard-navbar">
                <span>Dashboard</span>
              </div>
            ) : (
              <>
                <NavLink to="/">
                  <li>Home</li>
                </NavLink>
                <NavLink to="/esummit">
                  <li>E-Summit</li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
        <OutsideAlerter action={close}>
          <div className="navbar-profile">
            <div onClick={() => setIsOpen(!open)} className="user-profile">
              <div className="user-svg">
                {user ? (
                  <Avatar src={user.image} name={user.name} size="25px" round={true}></Avatar>
                ) : isLoading ? (
                  <ClipLoader size={20} color="#333333"></ClipLoader>
                ) : (
                  <UserSvg></UserSvg>
                )}
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
                    <>
                      {match ? (
                        <Link onClick={() => setIsOpen(!open)} to="/">
                          <li>Home</li>
                        </Link>
                      ) : (
                        <Link onClick={() => setIsOpen(!open)} to="/dashboard">
                          <li>Dashboard</li>
                        </Link>
                      )}
                      <a>
                        <li onClick={logout}>Logout</li>
                      </a>
                    </>
                  ) : (
                    <>
                      <Link onClick={() => setIsOpen(!open)} to="/register">
                        <li>Dashboard</li>
                      </Link>
                      <Link onClick={() => setIsOpen(!open)} to="/register">
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
