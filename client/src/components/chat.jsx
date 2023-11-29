import { React, useEffect, useState, useRef, useCallback } from "react";
import ChatBox from "./chatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import axios from "axios";
import ChatInfoModal from "./chatInfoModal";

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
  const [modal, setModal] = useState(false);

  const ScrollToBottom = () => {
    const ref = useRef();
    useEffect(() => ref.current.scrollIntoView());
    return <div ref={ref}></div>;
  };

  const TopScroller = () => {
    const topRef = useRef();
    useEffect(() => topRef.current.addEventListener("scroll", handleScroll));
    return <div ref={topRef}></div>;
  };

  function toggleModal() {
    if (modal) setModal(false);
    if (!modal) setModal(true);
  }

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

    newSocket.emit("joinWithUsers", {
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

  const handleScroll = useCallback(() => {
    console.log("Scrolling");
  });

  function mapMessages() {
    const chatMSG = messageData.map((message, index, array) => {
      // check when to assign a profile pic / header
      let useProfilePic = false;
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

  function groupChatName() {
    let chatName = "Chat with ";
    if (otherUsers.length == 2) {
      chatName += otherUsers[0] + " and " + otherUsers[1] + ".";
    } else if (otherUsers.length == 3) {
      chatName +=
        otherUsers[0] + ", " + otherUsers[1] + ", and " + otherUsers[2] + ".";
    } else if (otherUsers.length > 3) {
      chatName +=
        otherUsers[0] +
        ", " +
        otherUsers[1] +
        ", and " +
        (otherUsers.length - 2) +
        " others.";
    }
    return chatName;
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-top-bar">
        <div className="chat-top-bar-space"></div>
        {otherUsers.length == 1 ? (
          <div className="chat-user-info">
            <img
              className="chat-profile-pic chat-top-pic"
              src={profilePics[otherUsers]}
              onClick={() => toggleModal()}
            />
            <div className="chat-header">Chat with {otherUsers}</div>
          </div>
        ) : (
          <div>
            <img
              className="chat-profile-pic chat-top-pic"
              src={"http://localhost:5000/img/defaultGroupPic.png"}
              onClick={() => toggleModal()}
            ></img>
            <div className="chat-header">{groupChatName()}</div>
          </div>
        )}
        <div className="chat-close" onClick={() => handleUpdateChat([])}>
          <FontAwesomeIcon icon="fa-solid fa-x" />
        </div>
      </div>
      <div className="chat-messages-wrapper">
        <TopScroller />
        <div>{chatMessages}</div>
        <ScrollToBottom />
      </div>
      <div className="chatbox-wrapper">
        <ChatBox sendMessage={sendMessage} />
      </div>
      {modal ? (
        <ChatInfoModal
          userList={[username].concat(otherUsers)}
          group={otherUsers.length > 1}
        />
      ) : null}
    </div>
  );
}
