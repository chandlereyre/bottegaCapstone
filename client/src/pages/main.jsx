import { React, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import ChatList from "../components/chatList";
import Profile from "../components/profile";
import Chat from "../components/chat";
import logo from "../assets/chat.png";

export default function Main(props) {
  const [activeChat, setActiveChat] = useState([]);
  const [msgListChats, setMsgListChats] = useState([]);

  useEffect(() => {
    props.type == "home" ? getChats() : null;
  }, [activeChat, props.type]);

  async function handleUpdateChat(users) {
    // for 2 people
    if (users.length == 1) {
      if (users.toString() !== activeChat.toString()) {
        await setActiveChat([]);
        setActiveChat(users);
      }
    }

    // for groups
    if (users.toString() !== activeChat.toString()) {
      await setActiveChat([]);
      setActiveChat(users);
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

  function updateMessages(users, data) {
    let tempArray = msgListChats;
    Object.keys(tempArray).forEach((key) => {
      if (key == data.room) {
        tempArray[key].lastMessage = data.message;
      }
    });
    setMsgListChats({ ...tempArray });
  }

  function handleLogout() {
    props.handleSuccessfulLogout();
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
        <Sidebar handleSuccessfulLogout={() => handleLogout()} />
      </div>
      {props.type == "home" ? (
        <div className="home">
          <ChatList
            handleUpdateChat={handleUpdateChat}
            thisUser={props.username}
            chatList={msgListChats}
            getChats={getChats}
          />
          {activeChat.length > 0 ? (
            <Chat
              otherUsers={activeChat}
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
