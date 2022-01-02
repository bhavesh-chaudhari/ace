import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Registration from "./pages/registration/Registration";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import NotFound from "./pages/notFound/NotFound";
import Footer from "./components/footer/Footer";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  let match = useMatch("/register");

  // console.log(match)

  return (
    <>
      {!match && <Navbar></Navbar>}
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/reset-password/:id/:token"
          element={<ResetPassword />}
        ></Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
      {/* <Footer></Footer> */}
    </>
  );
};

export default App;
