import React, { Component } from "react";
import "./container.css";
import Navbar from "../00-NAVBAR/navbar";
import { connect } from "react-redux";
import actionTypes from "../../../REDUCERS/NAVBAR/actionTypes";

class ContainerProfile extends Component {
  signOut = (e) => {
    this.props.signOut();
  };
  render() {
    console.log("ContainerProfile -> REDNER!!!");
    return (
      <div className="container-profile-div">
        <Navbar signOut={this.signOut} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(actionTypes.signOut()),
  };
};

// const mapStateToProps = (state) => {
//   return {
//     userSignMode: state.NavbarReducer.signOut,
//   };
// };

export default connect(null, mapDispatchToProps)(ContainerProfile);
