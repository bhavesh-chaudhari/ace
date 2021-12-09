import React from 'react'
import "./Card.css"
import memeberPic from "../assets/memberImage.png"
import {ReactComponent as InstagramIconSvg} from "../assets/instagramIcon.svg"
import {ReactComponent as EmailIconSvg} from "../assets/emailIcon.svg"
import {ReactComponent as LinkedinIconSvg} from "../assets/linkedinIcon.svg"

const Card = (props) => {

    const {memberImage, memberTitle ,memberName, memeberInstagramLink, memeberEmailLink ,memeberLinkedinLink} = props;

    return (
      <div className="card-container">
        <div className="card-content">
          <div className="member-image">
            <img src={memberImage} alt="member image" />
          </div>
          <div className="member-details">
            <div className="member-title">
              <h2>{memberTitle}</h2>
            </div>
            <div className="member-name">
              <h3>{memberName}</h3>
            </div>
            <div className="member-link-icons">
              <a href="">
                <InstagramIconSvg></InstagramIconSvg>
              </a>
              <a href="">
                <EmailIconSvg></EmailIconSvg>
              </a>
              <a href="">
                <LinkedinIconSvg></LinkedinIconSvg>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Card
