import React from "react";
import ReactDOM from "react-dom/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRightFromBracket,
  faComment,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import App from "./App.jsx";

library.add(faComment, faUser, faRightFromBracket);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
