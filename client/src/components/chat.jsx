import { React, Component, useEffect } from "react";
import ChatBox from "./chatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherUser: this.props.otherUser,
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.socket = io("http://localhost:5000");

    // join room with other user
    this.socket.emit("join", {
      user1: this.props.username,
      user2: this.props.otherUser,
    });

    this.socket.on("chatMessage", (data) => {
      console.log(data);
    });

    this.socket.on();
  }

  componentWillUnmount() {
    console.log("UNMOUNTING");
    this.socket.emit("leave", {
      user1: this.props.username,
      user2: this.props.otherUser,
    });

    this.socket.disconnect();
  }

  sendMessage = (message) => {
    this.socket.emit("chatMessage", {
      message: message,
      to: this.state.otherUser,
      from: this.props.username,
    });
  };

  render() {
    return (
      <div className="chat-wrapper">
        <div className="chat-top-bar">
          <div className="title">Chat with {this.props.otherUser}</div>
          <div
            className="chat-close"
            onClick={() => this.props.handleUpdateChat(null)}
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
