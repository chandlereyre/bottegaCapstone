import { React, Component, useEffect } from "react";
import ChatBox from "./chatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.socket = io("http://localhost:5000");

    this.socket.on("chatMessage", (data) => {
      console.log(data);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  sendMessage = () => {
    console.log("message sent");
    this.socket.emit("chatMessage", "message from react");
  };

  render() {
    return (
      <div className="chat-wrapper">
        <div className="chat-top-bar">
          <div className="title">Chat with {this.props.otherUser}</div>
          <div
            className="chat-close"
            onClick={() => handleUpdateChat("", setChat)}
          >
            <FontAwesomeIcon icon="fa-solid fa-x" />
          </div>
        </div>
        <div className="chat-messages-wrapper"></div>
        <div className="chatbox-wrapper">
          <ChatBox sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}
