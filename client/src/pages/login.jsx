import React from "react";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-modal">
        <h1>Log in</h1>
        <input
          type="text"
          placeholder="username"
          className="login-input"
        ></input>
        <input
          type="password"
          placeholder="password"
          className="login-input"
        ></input>
        <button type="submit" className="login-button">
          Log in
        </button>
        <div className="divider">
          <span className="line"></span>
          <p>OR</p>
          <span className="line"></span>
        </div>
        <NavLink to="/signup" className="link">
          Don't have an account?
        </NavLink>
      </div>
      <div className="modal-bg login-bg"></div>
    </div>
  );
}

export default Login;
