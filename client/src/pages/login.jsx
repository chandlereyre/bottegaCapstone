import { React, Component } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      message: this.props.message,
    };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleLogIn();
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value.replace(/\s/g, ""),
      errorText: "",
    });
  }

  handleLogIn(event) {
    axios({
      method: "post",
      url: "http://localhost:5000/auth/login",
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data === "session created") {
          this.props.handleSuccessfulLogin(this.state.username);
        } else {
          this.props.handleUnsuccessfulLogin();
          this.setState({ message: response.data });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-modal">
          <h1>Log in</h1>
          <input
            type="text"
            placeholder="username"
            className="input"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          ></input>
          <input
            type="password"
            placeholder="password"
            className="input"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            onKeyDown={this.handleKeyPress}
          ></input>
          <button
            type="submit"
            className="login-button"
            onClick={this.handleLogIn}
          >
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
        {this.state.message == "Account created" ? (
          <div className="success-message">
            <p>{this.state.message}!</p>
          </div>
        ) : null}
        {this.state.message && this.state.message != "Account created" ? (
          <div className="error-message">
            <p>{this.state.message}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Login;
