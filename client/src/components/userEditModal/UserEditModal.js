import React, { useState } from "react";
import "./UserEditModal.css";
import Avatar from "react-avatar";
import { useGlobalContext } from "../../context/appContext";
import { AiFillCloseCircle } from "react-icons/ai";

const UserEditModal = ({ setIsOpen }) => {
  const { user, editUser } = useGlobalContext();
  const initialValues = {
    name: user?.name,
    email: user?.email,
    contactNumber: user?.contactNumber,
    image: user?.image,
    id: user?._id
  };
  const [editValues, setEditValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const saveInfo = (e)=>{
    e.preventDefault()
    console.log(editValues)
    editUser(editValues)
  }
  
  return (
    <div className="user-edit-modal-container">
      <form onSubmit={saveInfo} className="user-edit-modal-content">
        <div className="detail-container">
          <div className="image-container">
            {user?.image ? (
              <img src={user?.image} alt="" />
            ) : (
              <Avatar size="120px" name={user?.name}></Avatar>
            )}
            <label htmlFor="files">Choose an Image</label>
            <input style={{display:"none"}} id="files" type="file" ></input>
          </div>
          <div className="detail-fields">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={editValues.name}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                id="email"
                value={editValues.email}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="contactNumber">Contact No.</label>
              <input
                value={editValues.contactNumber}
                name="contactNumber"
                type="text"
                id="contactNumber"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="save-btn">
          <button type="submit" >SAVE</button>
        </div>
        <div onClick={() => setIsOpen(false)} className="close-btn">
          <AiFillCloseCircle color="#F7C08A"></AiFillCloseCircle>
        </div>
      </form>
    </div>
  );
};

export default UserEditModal;
