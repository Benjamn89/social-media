import React, { Component } from "react";
import "./log-in.css";
import SmallLogo from "../../../media/small-logo.png";
import { connect } from "react-redux";
import actionTypes from "../../../REDUCERS/00-LOG-PAGE/actionType";

class LogIn extends Component {
  onSub = (e) => {
    // load spinner
    document.querySelector(".log-in-div").classList.add("showSpinner2");
    e.preventDefault();
    var email = e.target.children[1].value.toLowerCase();
    var pass = e.target.children[3].value;
    this.props.logIn(email, pass);
  };

  signUpView = (e) => {
    this.props.changeMode();
  };

  render() {
    console.log("LogIn -> REDNER!!!");
    return (
      <div className="log-in-div">
        <h1 className="log-on-title">Welcome To Sted</h1>
        <p className="log-in-text">Get Started Free</p>
        <hr />
        <form onSubmit={this.onSub} className="log-in-form">
          <label>Email</label>
          <input type="email"></input>
          <label>Password</label>
          <input className="clear-password" type="password" required></input>
          <button className="log-in-button">Sign in</button>
        </form>
        <p className="log-in-text text-for-warning">
          New to Sted? <span onClick={this.signUpView}>Sign up</span>
        </p>
        <img src={SmallLogo} alt="small-logo" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeMode: () => dispatch(actionTypes.changeView("signUp", "registering")),
    logIn: (email, pass) => dispatch(actionTypes.logIn(email, pass)),
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
