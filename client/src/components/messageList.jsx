import React from "react";
import Message from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
  return (
    <div className="messagelist-wrapper">
      <div className="top-bar">
        <p className="title">Messages</p>
        <a className="icon">
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
        </a>
      </div>
      <div className="messagesContent">
        <Message></Message>
      </div>
    </div>
  );
}
