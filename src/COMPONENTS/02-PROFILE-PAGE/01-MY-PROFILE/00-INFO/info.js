import React, { Component } from "react";
import "./info.css";
class Info extends Component {
  render() {
    console.log("Info -> REDNER!!!");
    return (
      <div className="info-div">
        <div className="info-inside-1">
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <div className="info-inside-2">
          <p className="info-inside2-p-1">Location: Israel Ashdod</p>
          <p className="info-inside2-p-2">Webiste: www.walla.com</p>
          <p className="info-inside2-p-3">Bio: Dont Stop learning</p>
          <p className="info-inside2-p-4">Gender: Male</p>
          <p className="info-inside2-p-5">Thats it</p>
        </div>
      </div>
    );
  }
}
export default Info;
