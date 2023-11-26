import { React, useState, useEffect } from "react";
import ChatPreview from "./chatPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatModal from "./chatModal";

export default function MessageList({ handleUpdateChat, chatList }) {
  const [modal, setModal] = useState(false);

  function toggleModal(setModal, modal, newMessage) {
    if (modal) setModal(false);
    if (!modal) setModal(true);
    newMessage ? getMessages(setChats) : null;
  }

  const chats = Object.keys(chatList).map((user) => (
    <ChatPreview
      key={user}
      previewMessage={chatList[user][0]}
      userName={user}
      handleUpdateChat={handleUpdateChat}
      profilePic={chatList[user][1]}
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
      <div className="messagelist-content-wrapper">{chats}</div>

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
