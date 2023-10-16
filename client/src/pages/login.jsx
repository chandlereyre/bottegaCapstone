import React from "react";

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
        <a className="link" href="#">
          Sign up
        </a>
      </div>
    </div>
  );
}

export default Login;
