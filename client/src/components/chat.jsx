import React from "react";
import ChatBox from "./chatBox";

export default function Chat({ otherUser }) {
  return (
    <div className="chat-wrapper">
      <div className="chat-top-bar">
        <div className="title">Chat with {otherUser}</div>
      </div>
      <div className="chat-messages-wrapper"></div>
      <div className="chatbox-wrapper">
        <ChatBox />
      </div>
    </div>
  );
}
