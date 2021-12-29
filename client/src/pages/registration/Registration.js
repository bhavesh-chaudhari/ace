import React from "react";
import "./Registration.css";
import SignupTabs from "../../components/signupTabs/SignupTabs";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/appContext";
import { MoonLoader } from "react-spinners";

const Registration = () => {
  const { user, isLoading } = useGlobalContext();

  return (
    <>
      {user ? (
        <>
          <Navigate to="/dashboard" />
        </>
      ) : isLoading ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MoonLoader color="orange" size={80}></MoonLoader>
        </div>
      ) : (
        <div className="registration-container">
          <div className="registration-content">
            <SignupTabs></SignupTabs>
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;
