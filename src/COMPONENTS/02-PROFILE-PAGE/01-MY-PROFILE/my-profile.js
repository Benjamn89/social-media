import React, { Component } from "react";
import "./my-profile.css";
import { Link } from "react-router-dom";

class MyProfile extends Component {
  render() {
    console.log("MyProfile -> REDNER!!!");
    return (
      <div className="my-profile-div">
        Welcome to My Profile
        <Link to="/">
          <button className="back-to-home">Home Page</button>
        </Link>
      </div>
    );
  }
}
export default MyProfile;
