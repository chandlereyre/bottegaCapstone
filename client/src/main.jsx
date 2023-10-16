import React from "react";
import ReactDOM from "react-dom/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faComment, faUser } from "@fortawesome/free-regular-svg-icons";
import App from "./App.jsx";

library.add(faComment, faUser);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
