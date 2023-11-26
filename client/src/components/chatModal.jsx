import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import axios from "axios";

export default function chatModal({ toggleModal, setModal, modal }) {
  const [recipient, setRecipient] = useState("");
  const [recipientArr, setRecipientArr] = useState([]);

  function handleChange(event) {
    setRecipient(event.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addRecipient();
    }
  };

  function removeRecipient(event) {
    const recipient = event.target.innerHTML;
    const tempArray = recipientArr;
    tempArray.splice(recipient, 1);
    setRecipientArr([...tempArray]);
  }

  function addRecipient() {
    const tempArray = recipientArr;
    tempArray.push(recipient);
    setRecipientArr(tempArray);
    setRecipient("");
  }

  function createChat() {
    axios({
      url: "http://localhost:5000/create-chat",
      method: "post",
      data: {
        recipient: recipient,
      },
      withCredentials: true,
    })
      .then(() => {
        setRecipient("");
        toggleModal(setModal, modal, true);
      })
      .catch((err) => {
        console.log("Error creating chat: ", err);
      });
  }

  return (
    <div>
      <div
        className="chat-modal-wrapper"
        onClick={() => toggleModal(setModal, modal, false)}
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
              onClick={() => toggleModal(setModal, modal, false)}
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
            <a id="add-recipient-button" onClick={addRecipient}>
              <FontAwesomeIcon icon="fa-solid fa-plus" />
            </a>
          </div>
          <div id="recipients-wrapper">
            {recipientArr.map((recipient) => {
              return (
                <div
                  key={recipient}
                  className="recipient"
                  onClick={(event) => {
                    removeRecipient(event);
                  }}
                >
                  {recipient}
                </div>
              );
            })}
          </div>
          <button
            className="login-button"
            id="create-chat-button"
            onClick={createChat}
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
}
