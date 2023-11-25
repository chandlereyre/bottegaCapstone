import { React, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import MessageList from "../components/messageList";
import Profile from "../components/profile";
import Chat from "../components/chat";

export default function Main(props) {
  const [activeChat, setActiveChat] = useState(null);
  const [msgListChats, setMsgListChats] = useState([]);

  useEffect(() => {
    props.type == "home" ? getChats() : null;
  }, [activeChat, props.type]);

  function handleUpdateChat(username) {
    setActiveChat(username);
  }

  function getChats() {
    console.log("getting messages");
    axios({
      url: "http://localhost:5000/get-chats",
      method: "get",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        setMsgListChats(response.data);
      })
      .catch((error) => {
        console.log("Error getting : ", error);
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

  // displays if chat isn't open
  const message = <div> Hey There </div>;

  return (
    <div className="main-wrapper">
      <div>
        <Sidebar
          handleSuccessfulLogout={() => props.handleSuccessfulLogout()}
        />
      </div>
      {props.type == "home" ? (
        <div className="home">
          <MessageList
            handleUpdateChat={handleUpdateChat}
            thisUser={props.username}
            messageList={msgListChats}
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
