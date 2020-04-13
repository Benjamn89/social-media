import React, { Component } from "react";
import "./register-box.css";
import Registering from "./00-REGISTERING/registering";
import Registered from "./01-REGISTERED/registered";

import { connect } from "react-redux";
import actionTypes from "../../../REDUCERS/LOG-PAGE/actionType";

class RegisterBox extends Component {
  changeView = (e) => {
    this.props.changeMode();
  };

  onSub = (e) => {
    e.preventDefault();
    document.querySelector(".welcome-part2-div").classList.add("showSpinner");
    var fullName = e.target.children[1].value;
    var email = e.target.children[3].value;
    var password = e.target.children[5].value;

    this.props.createUser(fullName, email, password);
  };

  render() {
    console.log("RegisterBox -> REDNER!!!");

    var regMode = () => {
      if (this.props.regMode === "registering") {
        return <Registering onSub={this.onSub} changeView={this.changeView} />;
      } else {
        return <Registered changeView={this.changeView} />;
      }
    };

    return (
      <div className="register-box-div">
        <div className="welcome-part-div">
          <h1 className="part-one-text">Welcome To Sted</h1>
          <p className="part-one-small-text">
            A Social Network Who Keep You Sharp And Connected.
          </p>
          <p className="welcome-part-ul-title">You will find here</p>
          <ul>
            <li>Digital Lectures</li>
            <li>Home Works</li>
            <li>Friends</li>
            <li>Photos</li>
            <li>And More...</li>
          </ul>
        </div>
        {regMode()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    regMode: state.logOnReducer.regMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeMode: () => dispatch(actionTypes.changeView("signIn")),
    createUser: (fullName, email, password) =>
      dispatch(actionTypes.sendCreateRequest(fullName, email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBox);
