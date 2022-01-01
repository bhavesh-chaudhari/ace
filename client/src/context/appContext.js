import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import {
  SET_LOADING,
  SET_USER,
  LOGIN_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  OPEN_MODAL
} from "./actions";
import reducer from "./reducer";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,
  isLoading: false,
  isModalOpen: false
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  const BASE_URL = "http://localhost:5000/api/v1";

  const setLoading = (value) => {
    dispatch({ type: SET_LOADING, payload: value});
  };

  const openModal = (value)=>{
    dispatch({type: OPEN_MODAL, payload: value})
  }

  const login = async (userInput) => {
    setLoading(true)
    try {
      await axios({
        method: "POST",
        data: userInput,
        url: "http://localhost:5000/api/v1/auth/login",
        withCredentials: true,
      }).then((res) => {
        if (res.status === 200) {
          console.log(res);
          console.log(res.data.loggedInUser);
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: res.data.loggedInUser,
          });
          navigate("/dashboard");
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const signup = async (userInput) => {
    console.log(userInput)
    setLoading(true);
    try {
      await axios({
        method: "POST",
        data: userInput,
        url: "http://localhost:5000/api/v1/auth/signup",
        withCredentials: true,
      }).then((res) => {
        if (res.status === 200) {
          console.log(res);
          console.log(res.data.loggedInUser);
          dispatch({
            type: SIGNUP_USER_SUCCESS,
            payload: res.data.loggedInUser,
          });
          navigate("/dashboard");
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const editUser = async (editValues) => {
    setLoading(true);
    console.log(editValues.id)
    try {
      await axios({
        method: "PATCH",
        data: editValues,
        url: `http://localhost:5000/api/v1/users/${editValues.id}`,
        withCredentials: true,
      }).then((res) => {
        if (res.status === 200) {
          console.log(res);
          dispatch({
            type: EDIT_USER_SUCCESS,
            payload: res.data.user
          });
          openModal(false)
        }
      });
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(async () => {
    setLoading(true)
   try {
      await axios({
        method: "GET",
        withCredentials: true,
        url: `${BASE_URL}/auth/authenticatedUser`,
      }).then((res) => {
        console.log(res);
        const loggedInUser = res.data.loggedInUser;
        dispatch({ type: SET_USER, payload: loggedInUser });
      });
   } catch (error) {
     console.log(error)
     setLoading(false)
   }
  }, []);

  return (
    <AppContext.Provider value={{ ...state, setLoading, login, signup, editUser, openModal }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
