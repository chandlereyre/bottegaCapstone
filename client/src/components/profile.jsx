import React from "react";
import profilePic from "../assets/pfp.jpg";

export default function Profile() {
  return (
    <div className="profile-wrapper">
      <div className="profile-picture">
        <img src={profilePic}></img>
      </div>
      <div>
        <p className="title">Name</p>
        <input
          type="text"
          placeholder="Display name"
          className="login-input profile-input"
          name="dispName"
        ></input>
      </div>
      <div>
        <p className="title">Username</p>
        <input
          type="text"
          placeholder="username"
          className="login-input profile-input"
          name="username"
        ></input>
      </div>
      <div>
        <p className="title">Bio</p>
        <input
          type="text"
          placeholder="Write about yourself!"
          className="login-input profile-input"
          name="bio"
        ></input>
      </div>
    </div>
  );
}
