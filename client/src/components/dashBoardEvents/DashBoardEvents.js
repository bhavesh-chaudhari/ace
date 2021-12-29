import React, { useState } from "react";
import "./DashBoardEvents.css";
import EventCard from "./eventCard/EventCard";

const DashBoardEvents = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="dashboard-events">
      <div className="heading">
        <h1>Events</h1>
      </div>
      <div className="dashboard-events-content">
        <div className="event-tabs">
          <div
            className={toggleState === 1 ? "tab active" : "tab"}
            onClick={() => toggleTab(1)}
          >
            <h3>ONGOING</h3>
          </div>
          <div
            className={toggleState === 2 ? "tab active" : "tab"}
            onClick={() => toggleTab(2)}
          >
            <h3>UPCOMING</h3>
          </div>
          <div
            className={toggleState === 3 ? "tab active" : "tab"}
            onClick={() => toggleTab(3)}
          >
            <h3>ATTENDED</h3>
          </div>
        </div>
        <div className="event-cards-container">
          <EventCard></EventCard>
          <EventCard></EventCard>
          <EventCard></EventCard>
          <EventCard></EventCard>
        </div>
      </div>
    </div>
  );
};

export default DashBoardEvents;
