import React from 'react'
import "./EventCard.css"
import Avatar from 'react-avatar'
import {BsShare} from "react-icons/bs"

const EventCard = () => {
    return (
      <div className="event-card-container">
        <div className="event-card-content">
          <div className="event-card-details">
            <div className="event-image">
              <Avatar
                size="150px"
                name="E"
                color="#C4C4C4"
                round={true}
              ></Avatar>
            </div>
            <div className="event-details">
              <h3>E-Summit marvel quiz</h3>
              <p>
                <i>prize 1000$</i>
              </p>
              <p>Lorem ipsum dolor sit amet.</p>
              <a href="#">About this event</a>
            </div>
          </div>
          <div className="event-booking-btn">
            <button>
              <span>Book Now</span>
              <span>
                <BsShare></BsShare>
              </span>
            </button>
          </div>
        </div>
        <div className="horizontal-line">
          <hr />
        </div>
      </div>
    );
}

export default EventCard
