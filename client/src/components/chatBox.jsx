import { React, useState } from "react";
import axios from "axios";

export default function chatBox({ sendMessage }) {
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit() {
    console.log("message sent");
  }

  return (
    <div className="chatBox">
      <input
        type="text"
        className="input chat-input"
        placeholder="Send message. . ."
        onChange={handleChange}
        value={message}
      ></input>
      <button className="chat-button" onClick={() => sendMessage(message)}>
        Send
      </button>
    </div>
  );
}
