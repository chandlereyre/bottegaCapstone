import { React, Component, useEffect, useState } from "react";
import ChatBox from "./chatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";

export default function Chat({ username, otherUser, handleUpdateChat }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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

    // TODO get past messages over http
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
      // socket.emit("leave", {
      //   user1: username,
      //   user2: otherUser,
      // });

      // socket.disconnect();
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
    return <div key={message.message}>{message.message}</div>;
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
