import "./styles/main.scss";
import { React, Component } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      loggedInStatus: null,
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: true,
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: false,
    });
  }

  handleSuccessfulLogout() {
    axios({
      url: "http://localhost:5000/auth/logout",
      method: "delete",
      withCredentials: true,
    }).then((response) => {
      this.setState({
        loggedInStatus: false,
      });
    });
  }

  checkLoginStatus() {
    axios({
      url: "http://localhost:5000/auth/login",
      method: "get",
      withCredentials: "true",
    }).then((response) => {
      console.log(response.data);
      const loggedIn = response.data;

      this.setState({
        loggedInStatus: loggedIn,
        isLoading: false,
      });
    });
  }

  UNSAFE_componentWillMount() {
    this.setState({ isloading: true });
    this.checkLoginStatus();
  }

  render() {
    if (this.state.isLoading) {
      return "LOADING";
    }

    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                this.state.loggedInStatus ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/home"
              element={
                this.state.loggedInStatus ? (
                  <Home handleSuccessfulLogout={this.handleSuccessfulLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/profile"
              element={
                this.state.loggedInStatus ? (
                  <Profile
                    handleSuccessfulLogout={this.handleSuccessfulLogout}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                this.state.loggedInStatus ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Login
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )
              }
            />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
