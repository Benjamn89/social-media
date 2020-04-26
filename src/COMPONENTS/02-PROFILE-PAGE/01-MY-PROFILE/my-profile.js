import React, { Component } from "react";
import "./my-profile.css";
import { Link } from "react-router-dom";
import $ from "jquery";

// Titles array (codeless)
const titles = ["Info", "Posts", "Friends"];

class MyProfile extends Component {
  componentDidMount() {
    // Set the first title to the active button
    document.querySelector(".m-p-b-s").classList.add("active-btn-span");
  }

  activeBtn = (e) => {
    if (e.target.className === "my-pro-p") {
      $(".active-btn-span").removeClass("active-btn-span");
      e.target.parentNode.children[1].classList.add("active-btn-span");
    }
  };

  render() {
    console.log("MyProfile -> REDNER!!!");
    // Display the titles from the array
    var titlesDiv = titles.map((el, ind) => {
      return (
        <div onClick={this.activeBtn} className="my-pro-btn-btn" key={ind}>
          <p className="my-pro-p">{el}</p>
          <span className="m-p-b-s"></span>
        </div>
      );
    });

    return (
      <div className="my-profile-div">
        <div className="my-profile-inside">
          <h1 className="my-pro-title">User Name</h1>
          <div className="my-pro-btn-div">{titlesDiv}</div>
          <div className="my-pro-view-div"></div>
        </div>
      </div>
    );
  }
}
export default MyProfile;
