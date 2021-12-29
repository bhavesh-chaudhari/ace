import React from 'react'
import "./Registration.css"
import SignupTabs from '../../components/signupTabs/SignupTabs'
import { Navigate } from "react-router-dom";
import { useGlobalContext } from '../../context/appContext'

const Registration = () => {

  const {user} = useGlobalContext()

    return (
      <>
        {user ? (
          <Navigate to="/dashboard" />
        ) : (
          <div className="registration-container">
            <div className="registration-content">
              <SignupTabs></SignupTabs>
            </div>
          </div>
        )}
      </>
    );
}

export default Registration
