import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/appContext";
import { PulseLoader } from "react-spinners";
import "./form.css"

const SignUp = () => {
  const initialValues = {
    name: "",
    number: "",
    email: "",
    password: "",
    cnfmpass: "",
  };

  const {signup, googleLogin} = useGlobalContext()

  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
    console.log(formValues)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(validate(formValues));
    setIsSubmit(true);
    console.log(Object.keys(formErrors));
  };

  useEffect(async () => {
    console.log("lol isSubmit signup");
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      signup(formValues);
    }
  }, [isSubmit]);

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      error.name = "*Name is required";
    }
    if (!values.number) {
      error.number = "*Contact number is required";
    } else if (values.number.length !== 10) {
      error.number = "*Please enter a 10 digit mobile number";
    }
    if (!values.email) {
      error.email = "*Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "*This is not a valid email";
    }
    if (!values.password) {
      error.password = "*You must enter a password";
    }
    if (!values.cnfmpass) {
      error.cnfmpass = "*You must confirm your password";
    } else if (String(values.cnfmpass) !== String(values.password)) {
      error.cnfmpass = "*Your password does not match";
    }

    return error;
  };

  return (
    <div className="main-container">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <p className="error">{formErrors.name}</p>
        <br />
        <label htmlFor="number">Contact Number</label>
        <input
          type="number"
          name="number"
          id="number"
          value={formValues.number}
          onChange={handleChange}
        />
        <p className="error">{formErrors.number}</p>
        <br />
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
        <label htmlFor="password">Password</label>
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
        <label htmlFor="cnfmpass">Confirm Password</label>
        <input
          type="password"
          name="cnfmpass"
          id="cnfmpass"
          value={formValues.cnfmpass}
          onChange={handleChange}
        />
        <p className="error">{formErrors.cnfmpass}</p>
        <br />
        <button className="formbutton" type="submit">
          Sign Up
        </button>
        <br />
        <br />
        <button type="button" onClick={googleLogin} className="formbutton">
          <i className="fab fa-google fa-lg"></i>
          <span className="sign">Sign Up using google</span>
        </button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default SignUp;
