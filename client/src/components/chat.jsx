import { React, Component, useEffect, useState } from "react";
import ChatBox from "./chatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";

export default function Chat({ username, otherUser, handleUpdateChat }) {
  let socket;
  useEffect(() => {
    socket = io("http://localhost:5000");

    // join room with other user
    socket.emit("join", {
      user1: username,
      user2: otherUser,
    });

    socket.on("chatMessage", (data) => {
      console.log(data);
    });

    socket.on();
    return () => {
      console.log("UNMOUNTING");
      socket.emit("leave", {
        user1: username,
        user2: otherUser,
      });

      socket.disconnect();
    };
  });

  function sendMessage(message) {
    socket.emit("chatMessage", {
      message: message,
      user1: username,
      user2: otherUser,
    });
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-top-bar">
        <div className="title">Chat with {otherUser}</div>
        <div className="chat-close" onClick={() => handleUpdateChat(null)}>
          <FontAwesomeIcon icon="fa-solid fa-x" />
        </div>
      </div>
      <div className="chat-messages-wrapper"></div>
      <div className="chatbox-wrapper">
        <ChatBox sendMessage={sendMessage} />
      </div>
    </div>
  );
}
