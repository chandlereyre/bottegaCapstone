import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
  return (
    <div className="sidebar">
      <div className="icons">
        <div className="icon">
          <FontAwesomeIcon icon="fa-regular fa-comment" className="fa-icon" />
        </div>
        <div className="icon">
          <FontAwesomeIcon icon="fa-regular fa-user" className="fa-icon" />
        </div>
      </div>
    </div>
  );
}
