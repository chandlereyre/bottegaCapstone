import React from "react";
import ChatBox from "./chatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Chat({ otherUser, handleUpdateChat, setChat }) {
  return (
    <div className="chat-wrapper">
      <div className="chat-top-bar">
        <div className="title">Chat with {otherUser}</div>
        <div
          className="chat-close"
          onClick={() => handleUpdateChat("", setChat)}
        >
          <FontAwesomeIcon icon="fa-solid fa-x" />
        </div>
      </div>
      <div className="chat-messages-wrapper"></div>
      <div className="chatbox-wrapper">
        <ChatBox />
      </div>
    </div>
  );
}
