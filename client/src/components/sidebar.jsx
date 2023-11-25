import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/chat.png";

export default function (handleSuccessfulLogout) {
  return (
    <div className="sidebar">
      <div id="sidebar-logo">
        <img src={logo}></img>
      </div>
      <div className="icons">
        <NavLink to="/home" className="icon">
          <FontAwesomeIcon icon="fa-solid fa-comment" className="fa-icon" />
        </NavLink>
        <NavLink to="/profile" className="icon">
          <FontAwesomeIcon icon="fa-solid fa-user" className="fa-icon" />
        </NavLink>
      </div>
      <div id="sidebar-logout" className="icon">
        <FontAwesomeIcon
          icon="fa-solid fa-right-from-bracket"
          onClick={() => handleSuccessfulLogout()}
        />
      </div>
    </div>
  );
}
