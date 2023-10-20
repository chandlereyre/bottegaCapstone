import React from "react";
import Sidebar from "../components/sidebar";
import Messages from "../components/messages";

function Home(props) {
  return (
    <div className="main-wrapper">
      <div>
        <Sidebar
          handleSuccessfulLogout={() => props.handleSuccessfulLogout()}
        />
      </div>
      <div>
        <Messages></Messages>
      </div>
      <div>
        <div className="title">Home</div>
      </div>
    </div>
  );
}

export default Home;
