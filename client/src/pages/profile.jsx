import React from "react";
import Sidebar from "../components/sidebar";

function Profile() {
  return (
    <div className="main-wrapper">
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className="profile-wrapper">
        <div className="title">Profile</div>
      </div>
    </div>
  );
}

export default Profile;
