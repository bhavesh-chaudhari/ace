import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/appContext";
import {Link} from "react-router-dom"

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const {login, isLoading} = useGlobalContext()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("handle submit func")
    e.preventDefault();
    setformErrors(validate(formValues));
    setIsSubmit(true);
    console.log(isSubmit)
    console.log(Object.keys(formErrors).length);
  };

  const googleLogin = () => {
    window.open("http://localhost:5000/api/v1/auth/google", "_self");
  };

  useEffect( async ()=>{
    console.log("lol isSubmit")
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      login(formValues)
    }
  }, [isSubmit])

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "*Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "*This is not a valid email";
    }
    if (!values.password) {
      error.password = "*You must enter a password";
    }
    return error;
  };

  return (
    <div className="main-container">
      <div className="head-form">Login at Ace</div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <p className="error">{formErrors.email}</p>
        <br />
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <p className="error">{formErrors.password}</p>
        <br />
        <button className="formbutton" type="submit">
          Login
        </button>
        <br />
        <div className="forgot-pass">
          <Link to="/forgot-password" >Forget Password?</Link>
        </div>
        <br />
        <br />
        <br />
        <button onClick={googleLogin} type="button" className="formbutton">
          <i className="fab fa-google fa-lg"></i>
          <span className="sign">Login using google</span>
        </button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default Login;
