import React, {useEffect} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useGlobalContext } from '../../context/appContext'
import "./Dashboard.css"
import rewardImage from "./assets/reward.png"
import userImage from "./assets/user.png"

const Dashboard = () => {

    const {user} = useGlobalContext()
    console.log(user)

    return (
      <div className="dashboard-container">
        <div className="dashboard-user-details">
          <div className="dashboard-user-profile">
            <div className="profile">
              <div className="profile-image">
                {user?.image ? (
                  <img src={user?.image} alt={`${user?.name}'s image`} />
                ) : (
                  <img src={userImage} alt={`user image`} />
                )}
              </div>
              <div className="profile-details">
                <h2>{user?.name}</h2>
                <h3>{user?.email}</h3>
                <h3>
                  {user?.contactNumber ? (
                    user?.contactNumber
                  ) : (
                    <span>add contact number</span>
                  )}
                </h3>
                <button>Edit Info</button>
              </div>
            </div>
          </div>
          <div className="user-rewards">
            <div className="rewards-content">
              <h1>Your Rewards</h1>
              <div className="reward-images">
                <img src={rewardImage} alt="" />
                <img src={rewardImage} alt="" />
              </div>
              <h2>You have {user?.coins} coins</h2>
            </div>
          </div>
        </div>
        <div className="dashboard-events">
          <h1>Events</h1>
        </div>
      </div>
    );
}

export default Dashboard
