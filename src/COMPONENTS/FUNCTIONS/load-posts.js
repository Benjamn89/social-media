import React from "react";
import "./arrow-down.css";
import arrowImage from "./../../media/arrow-down.png";

const ArrowDown = (props) => {
  var view = null;
  if (props.secondArr) {
    view = (
      <div className="arrow-down-div" onClick={props.clickLoadPosts}>
        <img src={arrowImage} alt="arrow-down" />
      </div>
    );
  }

  return view;
};

export default ArrowDown;
