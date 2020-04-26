import React, { Component } from "react";
import { connect } from "react-redux";
import "./my-profile.css";
// import { Link } from "react-router-dom";
import $ from "jquery";

// Import Components
import Info from "./00-INFO/info";
import Posts from "./02-POSTS/posts";

// Titles array (codeless)
const titles = ["Info", "Posts", "Friends"];

class MyProfile extends Component {
  state = {
    currentSection: "Info",
  };

  componentDidMount() {
    // Set the first title to the active button
    document.querySelector(".m-p-b-s").classList.add("active-btn-span");
  }

  cancellProfile = (e) => {
    if (e.target.className === "my-profile-div") {
      this.props.history.push("/");
    }
  };

  activeBtn = (e) => {
    if (e.target.className === "my-pro-p") {
      // Remove the active class from the last btn
      $(".active-btn-span").removeClass("active-btn-span");
      // Add the active btn style to the choosen on
      e.target.parentNode.children[1].classList.add("active-btn-span");
      // Change the local state based on the user click
      this.setState({
        currentSection: e.target.innerHTML,
      });
    }
  };

  render() {
    console.log("ProfilePage -> REDNER!!!");
    // Initial global variable
    var currentSection;
    //Create shortcut for the currentSection state
    var currentSectionState = this.state.currentSection;

    // Display the titles from the array
    var titlesDiv = titles.map((el, ind) => {
      return (
        <div onClick={this.activeBtn} className="my-pro-btn-btn" key={ind}>
          <p className="my-pro-p">{el}</p>
          <span className="m-p-b-s"></span>
        </div>
      );
    });

    // Display the section that the user click on
    if (currentSectionState === "Info") {
      currentSection = <Info />;
    }
    if (currentSectionState === "Posts") {
      currentSection = <Posts />;
    }
    if (currentSectionState === "Friends") {
      currentSection = null;
    }

    return (
      <div className="my-profile-div" onClick={this.cancellProfile}>
        <div className="my-profile-inside">
          <h1 className="my-pro-title">
            {this.props.profileBoxState.fullName}
          </h1>
          <div className="my-pro-btn-div">{titlesDiv}</div>
          <div className="my-pro-view-div">{currentSection}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileBoxState: state.ProfileBoxReducer,
  };
};

export default connect(mapStateToProps, null)(MyProfile);
