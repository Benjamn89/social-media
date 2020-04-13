import React from "react";
import "./registering.css";

const Registering = (props) => {
  console.log("Registering -> render");
  return (
    <div className="welcome-part2-div">
      <h1 className="part-two-text">Sign Up To Sted</h1>
      <form onSubmit={props.onSub} className="part-two-form">
        <label>Full name</label>
        <input type="text" required></input>
        <label>Email</label>
        <input className="register-email-input" type="email"></input>
        <label>Password</label>
        <input type="password" required></input>
        <button className="form-button">Click To Sign Up</button>
      </form>
      <p className="part-two-p">
        Already have an account? <span onClick={props.changeView}>Log in</span>
      </p>
    </div>
  );
};

export default Registering;
