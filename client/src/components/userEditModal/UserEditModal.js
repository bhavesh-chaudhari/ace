import React, { useState } from "react";
import "./UserEditModal.css";
import Avatar from "react-avatar";
import { useGlobalContext } from "../../context/appContext";
import { AiFillCloseCircle } from "react-icons/ai";
import {PulseLoader} from "react-spinners"

const UserEditModal = () => {
  const { user, editUser, profileIsUpdating, openModal} = useGlobalContext();
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

  const fileSelectHandler = (e)=>{
    const reader = new FileReader()
    reader.onload = ()=>{
      if(reader.readyState === 2){
        setEditValues({...editValues, image: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

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
              <img src={editValues.image} alt={`${editValues.name}'s image`} />
            ) : (
              <Avatar size="120px" src={editValues.image} name={user?.name}></Avatar>
            )}
            <label htmlFor="files">Choose an Image</label>
            <input style={{display:"none"}} id="files" onChange={fileSelectHandler} type="file" accept="image/*" ></input>
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
                type="number"
                id="contactNumber"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="save-btn">
          <button type="submit" >{
            profileIsUpdating ? <PulseLoader size={5}></PulseLoader> : "SAVE"
          }</button>
        </div>
        <div onClick={() => openModal(false)} className="close-btn">
          <AiFillCloseCircle color="#F7C08A"></AiFillCloseCircle>
        </div>
      </form>
    </div>
  );
};

export default UserEditModal;
