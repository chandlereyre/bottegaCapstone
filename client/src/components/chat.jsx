import { React, useEffect, useState, useRef } from "react";
import ChatBox from "./chatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";
import shortid from "shortid";
import axios from "axios";

export default function Chat({
  username,
  otherUsers,
  handleUpdateChat,
  updateMessages,
}) {
  const [socket, setSocket] = useState(null);
  const [messageData, setMessageData] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  const ScrollToBottom = () => {
    const ref = useRef();
    useEffect(() => ref.current.scrollIntoView());
    return <div ref={ref}></div>;
  };

  useEffect(() => {
    // get message history
    axios({
      url: "http://localhost:5000/get-messages",
      method: "post",
      data: {
        users: [username].concat(otherUsers),
      },
      withCredentials: true,
    })
      .then((data) => {
        let tempArray = messageData;
        data.data.forEach((message) => {
          tempArray.push(message);
        });
        setMessageData(tempArray);

        mapMessages();
      })
      .catch((err) => {
        console.log("Error getting messages for this chat: ", err);
      });

    // socketio
    const newSocket = io("http://localhost:5000");

    newSocket.emit("join", {
      users: [username].concat(otherUsers),
    });

    newSocket.on("chatMessage", (data) => {
      let tempArray = messageData;
      tempArray.push(data);
      setMessageData(tempArray);

      mapMessages();

      updateMessages(otherUsers, data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit("leave", {
        users: [username].concat(otherUsers),
      });

      if (newSocket) {
        newSocket.disconnect();
      }

      setMessageData([]);
    };
  }, []);

  function mapMessages() {
    const chatMSG = messageData.map((message) => {
      const msgClass =
        message.from == username ? "blue-message" : "grey-message";
      const flexClass =
        message.from == username ? "chat-flex-blue" : "chat-flex-grey";
      return (
        <div key={shortid.generate()} className={flexClass + " chat-flex"}>
          <div className={msgClass + " chat-message"}>{message.message}</div>
        </div>
      );
    });

    setChatMessages(chatMSG);
  }

  function sendMessage(message) {
    socket.emit("chatMessage", {
      message: message,
      sender: username,
      recipients: otherUsers,
    });
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-top-bar">
        <div className="title">Chat with {otherUsers}</div>
        <div className="chat-close" onClick={() => handleUpdateChat([])}>
          <FontAwesomeIcon icon="fa-solid fa-x" />
        </div>
      </div>
      <div className="chat-messages-wrapper">
        <div>{chatMessages}</div>
        <ScrollToBottom />
      </div>
      <div className="chatbox-wrapper">
        <ChatBox sendMessage={sendMessage} />
      </div>
    </div>
  );
}
