import React, { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const match = useMatch("/reset-password/:id/:token");

  const initialValues = {
      password: "",
      confirmPassword: ""
  }
  const [isValid, setIsValid] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(async () => {
    try {
      await axios({
        method: "POST",
        data: match.params,
        url: "http://localhost:5000/api/v1/auth/checkUser",
        withCredentials: true,
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setIsValid(true);
        }
      });
    } catch (error) {
      console.log(error);
      setIsValid(false);
    }

    if (isValid && isSubmit && formValues.password === formValues.confirmPassword) {
      try {
        await axios({
          method: "PATCH",
          data: {...formValues, id: match.params.id},
          url: `http://localhost:5000/api/v1/auth/resetPassword`,
          withCredentials: true,
        }).then((res) => {
          console.log(res)
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [isSubmit]);

//   console.log(match);

  return (
    <div style={{ marginTop: "4rem" }}>
      <h1>Reset Password lol</h1>
      {isValid ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            placeholder="enter new password"
            name= "password"            
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="confirm password"
            name= "confirmPassword"
          />
          <button type="submit">Reset Password</button>
        </form>
      ) : (
        <h1>Please try again</h1>
      )}
    </div>
  );
};

export default ResetPassword;
