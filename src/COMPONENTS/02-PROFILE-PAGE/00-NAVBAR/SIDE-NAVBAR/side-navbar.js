import React from "react";
import "./side-navbar.css";

const SideNav = (props) => {
  return (
    <div className="side-nav-div">
      <div className="side-nav-inside" onClick={props.openSideNav}>
        <div className="side-line-div sld1"></div>
        <div className="side-line-div sld2"></div>
        <div className="side-line-div sld3"></div>
      </div>

      <div className="actual-side-nav-div">
        <span onClick={props.newPost}>New Post</span>
        <span onClick={props.profile}>Profile</span>
        <span onClick={props.logOut}>Log Out</span>
        <span className="asndl" onClick={props.removeAccount}>
          Remove Account
        </span>
      </div>
    </div>
  );
};

export default SideNav;
