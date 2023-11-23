import { React, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import MessageList from "../components/messageList";
import Profile from "../components/profile";
import Chat from "../components/chat";

function Render({ type, username, chat, handleUpdateChat, messageList }) {
  if (type == "home") {
    return (
      <div className="home">
        {/* Last messages array: [{username: username, lastMessage: lastmessage}] */}
        <MessageList
          handleUpdateChat={handleUpdateChat}
          thisUser={username}
          messageList={messageList}
        />
        {chat !== null ? (
          <Chat
            otherUser={chat}
            handleUpdateChat={handleUpdateChat}
            username={username}
            updateMessages={updateMessages}
          />
        ) : null}
      </div>
    );
  }
  if (type == "profile") {
    return (
      <div>
        <Profile username={username} />
      </div>
    );
  }
}

function updateMessages(username, message) {}

export default function Main(props) {
  const [activeChat, setActiveChat] = useState(null);
  const [msgListChats, setMsgListChats] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  function handleUpdateChat(username) {
    setActiveChat(username);
  }

  function getMessages() {
    axios({
      url: "http://localhost:5000/get-chats",
      method: "get",
      withCredentials: true,
    })
      .then((response) => {
        setMsgListChats(response.data);
      })
      .catch((error) => {
        console.log("Error getting user messages: ", error);
      });
  }

  return (
    <div className="main-wrapper">
      <div>
        <Sidebar
          handleSuccessfulLogout={() => props.handleSuccessfulLogout()}
        />
      </div>
      <Render
        type={props.type}
        username={props.username}
        handleUpdateChat={handleUpdateChat}
        setChat={setActiveChat}
        chat={activeChat}
        messageList={msgListChats}
      />
      ;
    </div>
  );
}
