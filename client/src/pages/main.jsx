import React from "react";
import Sidebar from "../components/sidebar";
import MessageList from "../components/messageList";
import Profile from "../components/profile";
import Chat from "../components/chat";

function Render({ type }) {
  if (type == "home") {
    return (
      <div className="home">
        <MessageList />
        <Chat otherUser={"Chandler Eyre"} />
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
