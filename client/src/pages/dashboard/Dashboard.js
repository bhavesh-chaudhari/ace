import React from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useGlobalContext } from '../../context/appContext'
import "./Dashboard.css"
import rewardImage from "./assets/reward.png"
import userImage from "./assets/user.png"
import UserEditModal from '../../components/userEditModal/UserEditModal'
import Avatar from "react-avatar"
import DashBoardEvents from '../../components/dashBoardEvents/DashBoardEvents'

const Dashboard = () => {

    const {user, isModalOpen, openModal} = useGlobalContext()

    return (
      <>
        <div className="dashboard-container">
          <div className="dashboard-user-details">
            <div className="dashboard-user-profile">
              <div className="profile">
                <div className="profile-image">
                  {user?.image ? (
                    <img src={user?.image} alt={`${user?.name}'s image`} />
                  ) : (
                    <Avatar size="200px" name={user?.name}></Avatar>
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
                  <button onClick={() => openModal(true)}>Edit Info</button>
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
                <h2>
                  You have <span>{user?.coins}</span> coins
                </h2>
              </div>
            </div>
          </div>
          <DashBoardEvents></DashBoardEvents>
        </div>
        {isModalOpen ? (
          <div className="user-edit-modal">
            <UserEditModal></UserEditModal>
          </div>
        ) : null}
      </>
    );
}

export default Dashboard
