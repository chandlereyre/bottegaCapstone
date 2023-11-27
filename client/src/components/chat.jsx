import { React, useEffect, useState, useRef } from "react";
import ChatBox from "./chatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";
import { nanoid } from "nanoid";
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
  const [profilePics, setProfilePics] = useState({});

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
      })
      .then(() => {
        // get profile pictures
        [username].concat(otherUsers).forEach((user) => {
          axios({
            url: "http://localhost:5000/get-profile-pic",
            method: "post",
            data: {
              username: user,
            },
            withCredentials: true,
          }).then((response) => {
            const tempDict = profilePics;
            tempDict[user] = response.data;
            setProfilePics(tempDict);

            mapMessages();
          });
        });
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
    const chatMSG = messageData.map((message, index, array) => {
      // check when to assign a profile pic
      let useProfilePic = false;
      // if (array[index + 1] && array[index + 1].from != message.from) {
      //   useProfilePic = true;
      // } else if (!array[index + 1]) {
      //   useProfilePic = true;
      // }
      // check when to use name in header
      let useHeader = false;
      if (array[index - 1] && array[index - 1].from != message.from) {
        useHeader = true;
        useProfilePic = true;
      } else if (!array[index - 1]) {
        useHeader = true;
        useProfilePic = true;
      }

      // return message div based on sender
      if (message.from == username) {
        return (
          <div key={nanoid()} className="chat-message-wrapper">
            {useHeader ? (
              <div className="message-header" style={{ textAlign: "right" }}>
                {" "}
                {message.from}{" "}
              </div>
            ) : null}
            <div className="chat-flex-blue chat-flex">
              <div className={"blue-message chat-message"}>
                {message.message}
              </div>
              {useProfilePic ? (
                <img
                  className="chat-profile-pic"
                  src={profilePics[message.from]}
                />
              ) : (
                <div className="white-space-no-pfp" />
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div key={nanoid()} className="chat-message-wrapper">
            <div className="chat-top">
              {useHeader ? (
                <div className="message-header" style={{ textAlign: "left" }}>
                  {" "}
                  {message.from}{" "}
                </div>
              ) : null}
            </div>
            <div className="chat-flex-grey chat-flex">
              {useProfilePic ? (
                <img
                  className="chat-profile-pic"
                  src={profilePics[message.from]}
                />
              ) : (
                <div className="white-space-no-pfp" />
              )}
              <div className={" grey-message chat-message"}>
                {message.message}
              </div>
            </div>
          </div>
        );
      }
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
        {otherUsers.length == 1 ? (
          <div className="title">Chat with {otherUsers}</div>
        ) : (
          <div className="group-title">
            Chat with{" "}
            {otherUsers[0] +
              ", " +
              otherUsers[1] +
              ", and " +
              (otherUsers.length - 2) +
              " others."}
          </div>
        )}
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
