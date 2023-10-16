import React from "react";
import Sidebar from "../components/sidebar";
import Messages from "../components/messages";

function Home() {
  return (
    <div className="home">
      <div>
        <Sidebar></Sidebar>
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
