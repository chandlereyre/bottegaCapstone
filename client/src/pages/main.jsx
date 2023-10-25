import { React, useState } from "react";
import Sidebar from "../components/sidebar";
import MessageList from "../components/messageList";
import Profile from "../components/profile";
import Chat from "../components/chat";

function handleUpdateChat(username, setChat) {
  setChat(username);
}

function Render({ type }) {
  const [chat, setChat] = useState("");
  if (type == "home") {
    return (
      <div className="home">
        <MessageList handleUpdateChat={handleUpdateChat} setChat={setChat} />
        {chat != "" ? (
          <Chat
            otherUser={chat}
            handleUpdateChat={handleUpdateChat}
            setChat={setChat}
          />
        ) : null}
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
