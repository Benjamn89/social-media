import React from "react";
import "./registered.css";
import Successfuly from "../../../../media/good.png";

const Registered = (props) => {
  console.log("Registered -> REDNER!!!");
  return (
    <div className="registered-box-div">
      <h1 className="registered-box-title">Profile has successfully created</h1>
      <img src={Successfuly} alt="good" />
      <p className="registered-box-text">
        Please <span onClick={props.changeView}>Log In</span>
      </p>
    </div>
  );
};

export default Registered;
