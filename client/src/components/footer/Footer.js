import React from "react";
import logo from "./assets/logo.png"

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-location">
            <div className="footer-logo-image">
                <img src={logo} alt="ace-logo" />
            </div>
            <div className="footer-location">
                <div className="location-icon">

                </div>
                <div className="location-text">
                    
                </div>
            </div>
            <div className="footer-brands">

            </div>
        </div>
        <div className="footer-quick-links"></div>
        <div className="footer-query"></div>
      </div>
    </div>
  );
};

export default Footer;
