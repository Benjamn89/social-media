import React from "react";
import "./App.css";
import LogOnContainer from "./COMPONENTS/01-LOGIN-PAGE/03-CONTAINER/container";
import ProfilePage from "./COMPONENTS/02-PROFILE-PAGE/10-CONTAINER/container";
import { connect } from "react-redux";

const App = (props) => {
  console.log("App -> RENDER!!!");

  var keyValidity = () => {
    var now = new Date();
    var localS = localStorage.getItem("myData");
    var parseLocal = JSON.parse(localS);
    if (parseLocal.key === "false" || now.getTime() > parseLocal.time) {
      return false;
    }
    return true;
  };

  return (
    <div className="App">
      {keyValidity() === false ? <LogOnContainer /> : <ProfilePage />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogIn: state.logOnReducer.logIn,
    signOutMode: state.NavbarReducer.signOut,
  };
};

export default connect(mapStateToProps, null)(App);
