import { React, useState } from "react";
import Message from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatModal from "./chatModal";

function getMessages() {
  // TODO get messages
}

function createMessage() {
  console.log("Message created");
}

function toggleModal(setModal, modal) {
  if (modal) setModal(false);
  if (!modal) setModal(true);
}
export default function MessageList({ handleUpdateChat, setChat }) {
  const [modal, setModal] = useState(false);

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
