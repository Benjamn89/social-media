import React, { Component } from "react";
import "./container.css";
import HeaderLogo from "../00-HEADER-LOGO/header-logo";
import RegisterBox from "../01-REGISTER-BOX/register-box";
import LogIn from "../02-LOG-IN/log-in";
import { connect } from "react-redux";

class LogOnContainer extends Component {
  render() {
    var currentMode = () => {
      if (this.props.logBox === "signIn") {
        return <LogIn />;
      } else {
        return <RegisterBox />;
      }
    };

    console.log("LogIn/Regis box is -> REDNER!!!");
    return (
      <div className="log-on-container">
        <HeaderLogo />
        {currentMode()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logBox: state.logOnReducer.currentMode,
  };
};

export default connect(mapStateToProps, null)(LogOnContainer);
