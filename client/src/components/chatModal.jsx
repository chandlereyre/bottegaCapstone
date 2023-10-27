import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function chatModal({ toggleModal, setModal, modal }) {
  return (
    <div>
      <div
        className="chat-modal-wrapper"
        onClick={() => toggleModal(setModal, modal)}
      >
        <div
          className="chat-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="modal-top-bar">
            <div className="title">New Message</div>
            <FontAwesomeIcon
              icon="fa-solid fa-x"
              className="icon"
              onClick={() => toggleModal(setModal, modal)}
            />
          </div>
          <div className="modal-input">
            <input type="text" className="input" placeholder="Recipient. . ." />
            <button className="login-button">Create Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}
