import React, { Component } from "react";
import { connect } from "react-redux";
import actionTypes from "../../../REDUCERS/01-NAVBAR/actionTypes";
import "./navbar.css";
// Import Components
import RemoveBox from "./remove-box";
import SideBar from "./SIDE-NAVBAR/side-navbar";

import NavLogo from "../../../media/sted.png";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  shouldComponentUpdate() {
    return false;
  }

  openModal = (e) => {
    this.openSideNav();
    var el = document.querySelector(".posts-modal");
    el.style.display = "flex";
    el.focus();
  };

  moveSettings = () => {
    document.querySelector(".set-first-span").classList.toggle("s-f-s-c");
    document.querySelector(".set-second-span").classList.toggle("s-s-p-c");
  };

  removeAccount = () => {
    this.openSideNav();
    const el = document.querySelector(".remove-account-div");
    el.classList.add("r-a-d-c");
    el.focus();
  };

  cancelRemove = (e) => {
    if (e.key === "Escape" || e.type === "click") {
      document.querySelector(".remove-account-div").classList.remove("r-a-d-c");
      document.querySelector(".set-first-span").classList.toggle("s-f-s-c");
      document.querySelector(".set-second-span").classList.toggle("s-s-p-c");
    }
  };

  removeProfile = () => {
    // Load Spinner
    document
      .querySelector(".remove-inside-div")
      .classList.add("createPostSpinner");
    this.props.removeProfileStedAction();
  };

  openSideNav = () => {
    // Turn around the arrow
    document.querySelector(".side-nav-inside").classList.toggle("sni-click");
    // Open the sid nav bar
    document.querySelector(".actual-side-nav-div").classList.toggle("asnd");
  };

  moveToProfile = () => {
    this.openSideNav();
    this.props.history.push("/profile");
  };

  render() {
    console.log("Navbar render");
    return (
      <nav>
        <img src={NavLogo} alt="nav-img" />
        <div className="nav-inside-div">
          <p onClick={this.openModal} className="nav-inside-p nav-p3">
            New Post
          </p>

          <p className="nav-inside-p nav-p1" onClick={this.moveToProfile}>
            Profile
          </p>

          <p className="nav-inside-p nav-p2" onClick={this.props.signOut}>
            LogOut
          </p>
        </div>
        <div className="nav-settings-div">
          <span className="set-first-span" onClick={this.moveSettings}>
            Settings
          </span>
          <span className="set-second-span" onClick={this.removeAccount}>
            Remove Account
          </span>
        </div>
        <RemoveBox
          cancelRemove={this.cancelRemove}
          removeProfile={this.removeProfile}
        />
        <SideBar
          openSideNav={this.openSideNav}
          newPost={this.openModal}
          profile={this.moveToProfile}
          logOut={this.props.signOut}
          removeAccount={this.removeAccount}
        />
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeProfileStedAction: () =>
      dispatch(actionTypes.removeProfileStedAction()),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Navbar));
