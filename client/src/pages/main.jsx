import { React, useState } from "react";
import Sidebar from "../components/sidebar";
import MessageList from "../components/messageList";
import Profile from "../components/profile";
import Chat from "../components/chat";

function Render({ type, username, chat, handleUpdateChat }) {
  if (type == "home") {
    return (
      <div className="home">
        <MessageList handleUpdateChat={handleUpdateChat} thisUser={username} />
        {chat !== null ? (
          <Chat
            otherUser={chat}
            handleUpdateChat={handleUpdateChat}
            username={username}
          />
        ) : null}
      </div>
    );
  }
  if (type == "profile") {
    return (
      <div>
        <Profile username={username} />
      </div>
    );
  }
}

export default function Main(props) {
  const [chat, setChat] = useState(null);

  function handleUpdateChat(username) {
    setChat(username);
  }

  return (
    <div className="main-wrapper">
      <div>
        <Sidebar
          handleSuccessfulLogout={() => props.handleSuccessfulLogout()}
        />
      </div>
      <Render
        type={props.type}
        username={props.username}
        handleUpdateChat={handleUpdateChat}
        setChat={setChat}
        chat={chat}
      />
      ;
    </div>
  );
}
