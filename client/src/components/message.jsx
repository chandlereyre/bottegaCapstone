import { useEffect, useState } from "react";
import defaultProfilePic from "../assets/profilePic.png";
import axios from "axios";

export default function Message({ userName, handleUpdateChat, thisUser }) {
  const [lastMessage, setLastMessage] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    axios({
      url: "http://localhost:5000/get-message-info",
      method: "post",
      data: { user1: thisUser, user2: userName },
      withCredentials: true,
    }).then((response) => {
      console.log(userName, response.data.profilePic);
      setLastMessage(response.data.message);
      response.data.profilePic != ""
        ? setProfilePic("http://localhost:5000" + response.data.profilePic)
        : setProfilePic("");
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
        {profilePic != "" ? (
          <img src={profilePic}></img>
        ) : (
          <img src={defaultProfilePic}></img>
        )}
      </div>
      <div className="message-content">
        <div className="person-name">{userName}</div>
        <div className="text">{lastMessage}</div>
      </div>
    </div>
  );
}
