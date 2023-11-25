import defaultProfilePic from "../assets/profilePic.png";
import { useState, useEffect } from "react";

export default function Message({
  userName,
  handleUpdateChat,
  previewMessage,
  profilePic,
}) {
  const [prevMSG, setPrevMSG] = useState(previewMessage);

  useEffect(() => {
    if (previewMessage.length > 20) {
      setPrevMSG(previewMessage.substring(0, 16) + "...");
    } else {
      setPrevMSG(previewMessage);
    }
  }, [previewMessage]);

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
          <img src={"http://localhost:5000/" + profilePic}></img>
        ) : (
          <img src={defaultProfilePic}></img>
        )}
      </div>
      <div className="message-content">
        <div className="person-name">{userName}</div>
        <div className="text">{prevMSG}</div>
      </div>
    </div>
  );
}
