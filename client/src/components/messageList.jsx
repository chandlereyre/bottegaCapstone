import { React, useState, useEffect } from "react";
import axios from "axios";
import Message from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatModal from "./chatModal";

function toggleModal(setModal, modal) {
  if (modal) setModal(false);
  if (!modal) setModal(true);
}

function getMessages(setChats) {
  axios({
    url: "http://localhost:5000/findchats",
    method: "post",
    data: {
      username: "chandlereyre77",
    },
    withCredentials: true,
  })
    .then((response) => {
      setChats(response.data);
    })
    .catch((error) => {
      console.log("Error getting user messages: ", error);
    });
}

export default function MessageList({ handleUpdateChat, setChat }) {
  const [modal, setModal] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getMessages(setChats);
  }, []);

  const messages = chats.map((user) => (
    <Message
      key={user}
      previewMessage="lorem"
      userName={user}
      handleUpdateChat={handleUpdateChat}
      setChat={setChat}
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
