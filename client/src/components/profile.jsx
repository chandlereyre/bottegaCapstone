import { React, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import defaultProfilePic from "../assets/profilePic.png";

export default function Profile({ username }) {
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProfileInfo();
  }, []);

  function getProfileInfo() {
    axios({
      url: "http://localhost:5000/get-profile-info",
      method: "post",
      data: {
        username: username,
      },
      withCredentials: true,
    }).then((response) => {
      setBio(response.data.bio);
      setFormUsername(response.data.username);
      setProfilePic(response.data.profilePic);
    });
  }

  function handleBioChange(event) {
    setBio(event.target.value);
  }

  function handleUsernameChange(event) {
    setFormUsername(event.target.value);
  }

  function handleSubmit() {
    axios({
      url: "http://localhost:5000/update-profile",
      method: "post",
      data: { bio: bio },
      withCredentials: true,
    }).then((response) => {
      getProfileInfo();
      setMessage("Profile Updated!");
    });
  }

  return (
    <div className="profile-wrapper">
      <div className="inner-profile-wrapper">
        <div className="profile-picture">
          {/* <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone> */}
          {profilePic != "" ? (
            <img src={profilePic}></img>
          ) : (
            <img src={defaultProfilePic}></img>
          )}
        </div>
        <div className="profile-item">
          <p className="title">Username</p>
          <input
            type="text"
            placeholder="username"
            className="input"
            id="profileUsername"
            name="username"
            onChange={handleUsernameChange}
            value={formUsername}
            readOnly
          ></input>
        </div>
        <div className="profile-item" id="profile-bio">
          <p className="title">Bio</p>
          <textarea
            type="text"
            placeholder="Write about yourself!"
            className="input"
            name="bio"
            onChange={handleBioChange}
            value={bio}
          ></textarea>
        </div>
        <div className="profile-item">
          <button type="submit" className="login-button" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
      {message != "" ? (
        <div className="success-message">
          <p>{message}</p>
        </div>
      ) : null}
    </div>
  );
}
