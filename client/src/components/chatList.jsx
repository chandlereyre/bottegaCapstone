import { React, useState } from "react";
import ChatPreview from "./chatPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatModal from "./chatModal";

export default function ChatList({ handleUpdateChat, chatList, getChats }) {
  const [modal, setModal] = useState(false);

  function toggleModal(setModal, modal, newMessage) {
    if (modal) setModal(false);
    if (!modal) setModal(true);
    newMessage ? getChats() : null;
  }

  const chats = Object.keys(chatList).map((chat) => {
    return (
      <ChatPreview
        key={chatList[chat].with}
        previewMessage={chatList[chat].lastMessage}
        users={chatList[chat].with}
        handleUpdateChat={handleUpdateChat}
        profilePic={chatList[chat].profilePic}
        group={chatList[chat].group}
      />
    );
  });

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
