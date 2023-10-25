import React from "react";
import profilePic from "../assets/pfp.jpg";

export default function Profile() {
  return (
    <div className="profile-wrapper">
      <div className="inner-profile-wrapper">
        <div className="profile-picture">
          {/* Pass this as a prop later */}
          <img src={profilePic}></img>
        </div>
        <div className="profile-item">
          <p className="title">Name</p>
          <input
            type="text"
            placeholder="Display name"
            className="input"
            name="dispName"
          ></input>
        </div>
        <div className="profile-item">
          <p className="title">Username</p>
          <input
            type="text"
            placeholder="username"
            className="input"
            name="username"
          ></input>
        </div>
        <div className="profile-item" id="profile-bio">
          <p className="title">Bio</p>
          <textarea
            type="text"
            placeholder="Write about yourself!"
            className="input"
            name="bio"
          ></textarea>
        </div>
        <div className="profile-item">
          <button type="submit" className="login-button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
