import React from "react";
import Message from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function getMessages() {
  // TODO get messages
}

export default function MessageList({ handleUpdateChat, setChat }) {
  return (
    <div className="messagelist-wrapper">
      <div className="top-bar">
        <p className="title">Messages</p>
        <a className="icon">
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
        </a>
      </div>
      <span className="divider"></span>
      <div className="messagelist-content-wrapper">
        <Message
          previewMessage="Hey man, what's up?"
          userName="ChandlerEyre77"
          handleUpdateChat={handleUpdateChat}
          setChat={setChat}
        ></Message>
        <Message
          previewMessage="Get bread at the supermarket"
          userName="NotChandlerEyre"
          handleUpdateChat={handleUpdateChat}
          setChat={setChat}
        ></Message>
      </div>
    </div>
  );
}
