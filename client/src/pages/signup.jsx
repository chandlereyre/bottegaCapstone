import React from "react";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-modal signup-modal">
        <h1>Sign up</h1>
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
        <input
          type="password"
          placeholder="confirm password"
          className="login-input"
        ></input>
        <button type="submit" className="login-button">
          Create account
        </button>
        <div className="divider">
          <span className="line"></span>
          <p>OR</p>
          <span className="line"></span>
        </div>
        <NavLink to="/login" className="link">
          Already have an account?
        </NavLink>
      </div>
      <div className="modal-bg signup-bg"></div>
    </div>
  );
}

export default Login;
