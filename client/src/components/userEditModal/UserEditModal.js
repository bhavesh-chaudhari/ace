import React from "react";
import "./UserEditModal.css";
import Avatar from "react-avatar";
import { useGlobalContext } from "../../context/appContext";
import {AiFillCloseCircle} from "react-icons/ai"

const UserEditModal = ({setIsOpen}) => {

    const {user} = useGlobalContext()

  return (
    <div className="user-edit-modal-container">
      <div className="user-edit-modal-content">
        <div className="detail-container">
          <div className="image-container">
            {
                user?.image ? <img src={user.image} alt="" />  : <Avatar size="120px" name={user.name}></Avatar>
            }
            <button>Change Profile Photo</button>
          </div>
          <div className="detail-fields">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" />
            </div>
            <div className="field">
              <label htmlFor="number">Contact No.</label>
              <input type="text" id="number" />
            </div>
          </div>
        </div>
        <div className="save-btn">
          <button>SAVE</button>
        </div>
        <div onClick={()=>setIsOpen(false)} className="close-btn">
          <AiFillCloseCircle color="#F7C08A"></AiFillCloseCircle>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
