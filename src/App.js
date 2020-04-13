import React from "react";
import "./App.css";
import LogOnContainer from "./COMPONENTS/01-LOGIN-PAGE/03-CONTAINER/container";
import ProfilePage from "./COMPONENTS/02-PROFILE-PAGE/test";
import { connect } from "react-redux";

const App = (props) => {
  console.log("App -> RENDER!!!");
  var showLogOrProfile = () => {
    if (props.isLogIn === false) {
      return <LogOnContainer />;
    } else {
      return <ProfilePage />;
    }
  };
  return <div className="App">{showLogOrProfile()}</div>;
};

const mapStateToProps = (state) => {
  return {
    isLogIn: state.logOnReducer.logIn,
  };
};

export default connect(mapStateToProps, null)(App);
