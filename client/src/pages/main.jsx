import React from "react";
import Sidebar from "../components/sidebar";
import Messages from "../components/messages";
import Profile from "../components/profile";

function Render({ type }) {
  if (type == "home") {
    return (
      <div className="home">
        <div>
          <Messages></Messages>
        </div>
        <div>
          <div className="title">Home</div>
        </div>
      </div>
    );
  }
  if (type == "profile") {
    return (
      <div>
        <Profile />
      </div>
    );
  }
}

export default function Main(props) {
  return (
    <div className="main-wrapper">
      <div>
        <Sidebar
          handleSuccessfulLogout={() => props.handleSuccessfulLogout()}
        />
      </div>
      <Render type={props.type} />;
    </div>
  );
}
