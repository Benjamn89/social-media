import React, { Component } from "react";
import "./header-logo.css";
import Logo from "../../../media/sted.png";

class HeaderLogo extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log("HeaderLogo -> REDNER!!!");
    return (
      <div className="logo-div">
        <img src={Logo} alt="logo" />
        <p className="logo-p">Simple Way To Stay Connected</p>
      </div>
    );
  }
}
export default HeaderLogo;
