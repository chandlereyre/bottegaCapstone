import { React, useEffect } from "react";
import ChatBox from "./chatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";

export default function Chat({ otherUser, handleUpdateChat, setChat }) {
  useEffect(() => {
    this.socket = io("http://localhost:5000"); //TODO figure out URL

    this.socket.on("chatMessage", (data) => {
      console.log(data);
    });
    return () => {
      this.socket.disconnect();
    };
  });

  // TODO close connection on unmount
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
