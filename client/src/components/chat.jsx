import { React, useEffect, useState } from "react";
import ChatBox from "./chatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";
import shortid from "shortid";
import axios from "axios";

export default function Chat({ username, otherUser, handleUpdateChat }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // get chats
    axios({
      url: "http://localhost:5000/get-messages",
      method: "post",
      data: {
        user1: username,
        user2: otherUser,
      },
      withCredentials: true,
    }).then((data) => {
      let tempArray = messages;
      data.data.forEach((message) => {
        tempArray.push(message);
      });
      setMessages([...tempArray]);
      console.log(messages);
    });

    // socketio
    const newSocket = io("http://localhost:5000");

    // join room with other user
    newSocket.emit("join", {
      user1: username,
      user2: otherUser,
    });

    newSocket.on("chatMessage", (data) => {
      let tempArray = messages;
      tempArray.push(data);
      setMessages([...tempArray]);
      console.log(data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit("leave", {
        user1: username,
        user2: otherUser,
      });

      if (newSocket) {
        newSocket.disconnect();
      }
      setMessages([]);
      console.log("Dismount");
    };
  }, []);

  function sendMessage(message) {
    socket.emit("chatMessage", {
      message: message,
      user1: username,
      user2: otherUser,
    });
  }

  const chatMSG = messages.map((message) => {
    const msgClass = message.from == username ? "blue-message" : "grey-message";
    const flexClass =
      message.from == username ? "chat-flex-blue" : "chat-flex-grey";
    return (
      <div className={flexClass + " chat-flex"}>
        <div className={msgClass + " chat-message"} key={shortid.generate()}>
          {message.message}
        </div>
      </div>
    );
  });

  return (
    <div className="chat-wrapper">
      <div className="chat-top-bar">
        <div className="title">Chat with {otherUser}</div>
        <div className="chat-close" onClick={() => handleUpdateChat(null)}>
          <FontAwesomeIcon icon="fa-solid fa-x" />
        </div>
      </div>
      <div className="chat-messages-wrapper">
        <div>{chatMSG}</div>
      </div>
      <div className="chatbox-wrapper">
        <ChatBox sendMessage={sendMessage} />
      </div>
    </div>
  );
}
