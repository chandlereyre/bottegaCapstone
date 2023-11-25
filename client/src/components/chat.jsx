import { React, useEffect, useState, useRef } from "react";
import ChatBox from "./chatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";
import shortid from "shortid";
import axios from "axios";

export default function Chat({
  username,
  otherUser,
  handleUpdateChat,
  updateMessages,
}) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const scrollRef = useRef(null);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    console.log("Chat Effect");

    // get message history
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
      setMessages(tempArray);

      // set messages
      let chatMSG = messages.map((message) => {
        const msgClass =
          message.from == username ? "blue-message" : "grey-message";
        const flexClass =
          message.from == username ? "chat-flex-blue" : "chat-flex-grey";
        return (
          <div className={flexClass + " chat-flex"}>
            <div
              className={msgClass + " chat-message"}
              key={shortid.generate()}
            >
              {message.message}
            </div>
          </div>
        );
      });
      setChatMessages(chatMSG);

      sleep(50).then(() =>
        scrollRef.current.scrollIntoView({ behavior: "smooth" })
      );
    });

    // socketio
    const newSocket = io("http://localhost:5000");

    newSocket.emit("join", {
      user1: username,
      user2: otherUser,
    });

    newSocket.on("chatMessage", (data) => {
      let tempArray = messages;
      tempArray.push(data);
      setMessages(tempArray);

      let chatMSG = messages.map((message) => {
        const msgClass =
          message.from == username ? "blue-message" : "grey-message";
        const flexClass =
          message.from == username ? "chat-flex-blue" : "chat-flex-grey";
        return (
          <div className={flexClass + " chat-flex"}>
            <div
              className={msgClass + " chat-message"}
              key={shortid.generate()}
            >
              {message.message}
            </div>
          </div>
        );
      });

      // update messages
      setChatMessages(chatMSG);
      updateMessages(otherUser, data);
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
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
    };
  }, []);

  function sendMessage(message) {
    socket.emit("chatMessage", {
      message: message,
      user1: username,
      user2: otherUser,
    });
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-top-bar">
        <div className="title">Chat with {otherUser}</div>
        <div className="chat-close" onClick={() => handleUpdateChat(null)}>
          <FontAwesomeIcon icon="fa-solid fa-x" />
        </div>
      </div>
      <div className="chat-messages-wrapper">
        <div>{chatMessages}</div>
        <div ref={scrollRef} id="scroll-div" />
      </div>
      <div className="chatbox-wrapper">
        <ChatBox sendMessage={sendMessage} />
      </div>
    </div>
  );
}
