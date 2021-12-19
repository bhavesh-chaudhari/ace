import React from 'react'
import "./Registration.css"
import SignupTabs from '../../components/signupTabs/SignupTabs'

const Registration = () => {
    return (
      <div className="registration-container">
        <div className="registration-content">
          <SignupTabs></SignupTabs>
        </div>
      </div>
    );
}

export default Registration
