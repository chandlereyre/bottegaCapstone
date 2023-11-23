import { React, useState, useEffect } from "react";
import axios from "axios";
import Message from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatModal from "./chatModal";

export default function MessageList({
  handleUpdateChat,
  thisUser,
  messageList,
}) {
  const [modal, setModal] = useState(false);

  function toggleModal(setModal, modal, newMessage) {
    if (modal) setModal(false);
    if (!modal) setModal(true);
    newMessage ? getMessages(setChats) : null;
  }

  const messages = messageList.map((user) => (
    <Message
      key={user}
      previewMessage="lorem"
      userName={user}
      handleUpdateChat={handleUpdateChat}
      thisUser={thisUser}
    />
  ));

  return (
    <div className="messagelist-wrapper">
      <div className="top-bar">
        <p className="title">Messages</p>
        <a className="icon">
          <FontAwesomeIcon
            icon="fa-solid fa-pen-to-square"
            onClick={() => toggleModal(setModal, modal)}
          />
        </a>
      </div>
      <div className="message-divider"></div>
      <div className="messagelist-content-wrapper">{messages}</div>

      {modal ? (
        <ChatModal
          toggleModal={toggleModal}
          setModal={setModal}
          modal={modal}
        />
      ) : null}
    </div>
  );
}
