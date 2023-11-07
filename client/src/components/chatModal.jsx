import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import axios from "axios";

export default function chatModal({ toggleModal, setModal, modal }) {
  const [recipient, setRecipient] = useState("");

  function handleChange(event) {
    setRecipient(event.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      createChat();
    }
  };

  function createChat() {
    axios({
      method: "post",
      url: "http://localhost:3000/create-chat",
      data: {
        recipient: recipient,
      },
      withCredentials: true,
    }).then((response) => {
      setRecipient("");
    });
  }

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
            <input
              type="text"
              className="input"
              placeholder="Recipient. . ."
              onKeyDown={(event) => handleKeyPress(event)}
              onChange={handleChange}
              value={recipient}
            />
            <button className="login-button" onClick={createChat}>
              Create Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
