import defaultProfilePic from "../assets/profilePic.png";
import { useState, useEffect } from "react";

export default function chatPreview({
  users,
  handleUpdateChat,
  previewMessage,
  profilePic,
  group,
}) {
  const [prevMSG, setPrevMSG] = useState(previewMessage);

  useEffect(() => {
    if (previewMessage.length > 20) {
      setPrevMSG(previewMessage.substring(0, 16) + "...");
    } else {
      setPrevMSG(previewMessage);
    }
  }, [previewMessage]);

  function updateChat() {
    handleUpdateChat(users);
  }

  return (
    <div
      className="message"
      onClick={() => {
        updateChat();
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
        {group ? (
          <div className="person-name">{users.map((user) => user + ", ")}</div>
        ) : (
          <div className="person-name">{users}</div>
        )}
        <div className="text">{prevMSG}</div>
      </div>
    </div>
  );
}
