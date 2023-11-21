import React from "react";
import ReactDOM from "react-dom/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRightFromBracket,
  faComment,
  faUser,
  faPaperPlane,
  faPenToSquare,
  faX,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import App from "./App.jsx";

library.add(
  faComment,
  faUser,
  faRightFromBracket,
  faPaperPlane,
  faPenToSquare,
  faX,
  faCamera
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
