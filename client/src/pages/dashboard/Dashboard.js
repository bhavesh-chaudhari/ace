import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/appContext";
import "./Dashboard.css";
import rewardImage from "./assets/reward.png";
import UserEditModal from "../../components/userEditModal/UserEditModal";
import Avatar from "react-avatar";
import DashBoardEvents from "../../components/dashBoardEvents/DashBoardEvents";
import { MoonLoader } from "react-spinners";

const Dashboard = () => {
  const { user, isModalOpen, openModal, isLoading } = useGlobalContext();

  return (
    <>
      {isLoading ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#4e4e4e",
          }}
        >
          <MoonLoader color="orange" size={80}></MoonLoader>
        </div>
      ) : (
        <>
          {" "}
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
      )}
    </>
  );
};

export default Dashboard;
