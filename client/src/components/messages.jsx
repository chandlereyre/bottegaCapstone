import React from "react";
import Message from "./message";

export default function () {
  return (
    <div className="messages">
      <div className="title">Messages</div>
      <div className="messagesContent">
        <Message></Message>
      </div>
    </div>
  );
}
