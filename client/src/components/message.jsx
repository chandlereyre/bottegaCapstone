import { useEffect, useState } from "react";
import axios from "axios";

export default function Message({
  profilePic,
  userName,
  handleUpdateChat,
  thisUser,
}) {
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    axios({
      url: "http://localhost:5000/get-last-message",
      method: "post",
      data: { user1: thisUser, user2: userName },
      withCredentials: true,
    }).then((response) => {
      setLastMessage(response.data);
    });
  }, []);
  async function firstFunction() {
    handleUpdateChat(null);
  }

  async function secondFunction() {
    await firstFunction();
    handleUpdateChat(userName);
  }
  return (
    <div
      className="message"
      onClick={() => {
        secondFunction();
      }}
    >
      <div className="message-profile-pic">
        <img src={profilePic} alt=""></img>
      </div>
      <div className="message-content">
        <div className="person-name">{userName}</div>
        <div className="text">{lastMessage}</div>
      </div>
    </div>
  );
}
