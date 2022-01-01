import React, { useState } from "react";
import axios from "axios"

const ForgotPassword = () => {

    const [email, setEmail] = useState("")

    // console.log(email)
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            console.log(email)
             await axios({
               method: "POST",
               data: {email},
               url: "http://localhost:5000/api/v1/auth/forgotPassword",
               withCredentials: true,
             }).then((res) => {
               console.log(res)
             });
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
      <div style={{ marginTop: "4rem" }}>
        <form onSubmit={handleSubmit}>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
          <button type='submit' >Send Link</button>
        </form>
      </div>
    );
}

export default ForgotPassword
