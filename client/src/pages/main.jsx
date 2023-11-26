import { React, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import ChatList from "../components/chatList";
import Profile from "../components/profile";
import Chat from "../components/chat";
import logo from "../assets/chat.png";

export default function Main(props) {
  const [activeChat, setActiveChat] = useState(null);
  const [msgListChats, setMsgListChats] = useState([]);

  useEffect(() => {
    props.type == "home" ? getChats() : null;
  }, [activeChat, props.type]);

  async function handleUpdateChat(username) {
    if (username != activeChat) {
      await setActiveChat(null);
      setActiveChat(username);
    }
  }

  function getChats() {
    axios({
      url: "http://localhost:5000/get-chats",
      method: "get",
      withCredentials: true,
    })
      .then((response) => {
        setMsgListChats(response.data);
      })
      .catch((error) => {
        console.log("Error getting chats: ", error);
      });
  }

  function updateMessages(username, message) {
    let tempArray = msgListChats;
    Object.keys(tempArray).forEach((key) => {
      if (key == username) {
        tempArray[key][0] = message.message;
      }
    });
    setMsgListChats({ ...tempArray });
  }

  // displays if a chat isn't open
  const message = (
    <div className="main-filler">
      <img src={logo}></img>
      <div className="title">Hey there, {props.username}</div>
    </div>
  );

  return (
    <div className="main-wrapper">
      <div>
        <Sidebar
          handleSuccessfulLogout={() => props.handleSuccessfulLogout()}
        />
      </div>
      {props.type == "home" ? (
        <div className="home">
          <ChatList
            handleUpdateChat={handleUpdateChat}
            thisUser={props.username}
            chatList={msgListChats}
          />
          {activeChat !== null ? (
            <Chat
              otherUser={activeChat}
              handleUpdateChat={handleUpdateChat}
              username={props.username}
              updateMessages={updateMessages}
            />
          ) : (
            message
          )}
        </div>
      ) : (
        <div>
          <Profile username={props.username} />
        </div>
      )}
    </div>
  );
}
