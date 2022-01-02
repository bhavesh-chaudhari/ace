import React, {useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/appContext";

const PrivateRoute = ({ children }) => {
  const { user} = useGlobalContext();

  return user ? (
    children
  ) : (
    <><Navigate to="/register"></Navigate></>
  );
};

export default PrivateRoute;
