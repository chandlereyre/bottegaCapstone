import React from "react";
import Sidebar from "../components/sidebar";

function Profile(props) {
  return (
    <div className="main-wrapper">
      <div>
        <Sidebar
          handleSuccessfulLogout={() => props.handleSuccessfulLogout()}
        />
      </div>
      <div className="profile-wrapper">
        <div className="title">Profile</div>
      </div>
    </div>
  );
}

export default Profile;
