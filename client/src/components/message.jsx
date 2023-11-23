import { useEffect, useState } from "react";
import defaultProfilePic from "../assets/profilePic.png";
import axios from "axios";

export default function Message({
  userName,
  handleUpdateChat,
  thisUser,
  previewMessage,
}) {
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    axios({
      url: "http://localhost:5000/get-profile-pic",
      method: "post",
      data: { username: userName },
      withCredentials: true,
    }).then((response) => {
      console.log(userName, response.data);
      response.data != ""
        ? setProfilePic("http://localhost:5000" + response.data)
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
        <div className="text">{previewMessage}</div>
      </div>
    </div>
  );
}
