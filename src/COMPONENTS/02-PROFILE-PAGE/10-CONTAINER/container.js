import React, { Component } from "react";
import "./container.css";
import Navbar from "../00-NAVBAR/navbar";
import Comment from "../02-HOME-PAGE/POSTS-BOXES/COMMENTS/comments";
import { connect } from "react-redux";
import MyProfile from "../01-MY-PROFILE/my-profile";
import HomePage from "../02-HOME-PAGE/home-page";
import { Switch, Route } from "react-router-dom";
import actionTypes from "../../../REDUCERS/01-NAVBAR/actionTypes";

class ContainerProfile extends Component {
  signOut = (e) => {
    this.props.signOut();
  };
  render() {
    console.log("ContainerProfile -> REDNER!!!");

    return (
      <div className="container-profile-div">
        <Navbar signOut={this.signOut} />
        <HomePage />
        <Switch>
          <Route exact path="/profile" component={MyProfile} />
          <Route exact path="/leaveComment" component={Comment} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(actionTypes.signOut()),
  };
};

export default connect(null, mapDispatchToProps)(ContainerProfile);
