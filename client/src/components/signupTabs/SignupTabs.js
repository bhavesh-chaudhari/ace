import React from 'react'
import { useState } from "react";
import SignUp from './SignUp';
import Login from './Login';

import './SignupTabs.css'

const SignupTabs = () => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div>
            <div className='close-btn'>
                <i className="fas fa-times-circle"></i>
            </div>
            <div className="container">
                <div className="bloc-tabs">
                    <button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs inactive-tabs-login"}
                        onClick={() => toggleTab(1)}
                    >
                        Login
                    </button>
                    <button
                        className={toggleState === 2 ? "tabs active-tabs" : "tabs inactive-tabs-signup"}
                        onClick={() => toggleTab(2)}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="content-tabs">
                    <div
                        className={toggleState === 1 ? "content  active-content" : "content"}
                    >
                        {/* Login Form */}
                        <Login />
                    </div>
                    <div
                        className={toggleState === 2 ? "content  active-content" : "content"}
                    >
                        {/* Signup Form */}
                        <SignUp />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupTabs
