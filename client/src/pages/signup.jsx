import { React, Component } from "react";
import { NavLink, Navigate } from "react-router-dom";
import axios from "axios";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: "",
    });
  }

  handleSubmit(navigate) {
    if (this.state.password != this.state.confirmPassword) {
      this.setState({ errorMessage: "Passwords must match" });
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/create-account",
        data: {
          username: this.state.username,
          password: this.state.password,
        },
        withCredentials: true,
      }).then((response) => {
        this.setState({
          redirect: true,
        });
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/login/accountcreated" />;
    }
    return (
      <div className="login-wrapper">
        <div className="login-modal signup-modal">
          <h1>Create account</h1>
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
          ></input>
          <input
            type="password"
            placeholder="confirm password"
            className="input"
            name="confirmPassword"
            onChange={this.handleChange}
            value={this.state.confirmPassword}
          ></input>
          <button
            type="submit"
            className="login-button"
            onClick={this.handleSubmit}
          >
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
        {this.state.errorMessage == "Passwords must match" ? (
          <div className="error-message">
            <p>{this.state.errorMessage}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Signup;
