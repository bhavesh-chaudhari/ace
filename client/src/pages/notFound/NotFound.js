import React from 'react'
import "./NotFound.css"
import { Link, useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate()
    
    return (
      <div className="not-found-page">
        <h1>404</h1>
        <h2>OOPS ! Page Not Found !</h2>
        <h3>
          It looks like that you've reached a URL that doesn't exist &#128533;
        </h3>
        <a onClick={() => navigate(-1)}>Let's Go Back</a>
      </div>
    );
}

export default NotFound
