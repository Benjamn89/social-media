import React from "react";
import "./App.css";
import LogOnContainer from "./COMPONENTS/01-LOGIN-PAGE/03-CONTAINER/container";
import ProfilePage from "./COMPONENTS/02-PROFILE-PAGE/10-CONTAINER/container";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const App = (props) => {
  console.log("App render");

  var keyValidity = () => {
    var now = new Date();
    var localS =
      typeof window !== "undefined" && localStorage.getItem("myData");
    if (!localS) {
      return false;
    }
    var parseLocal = JSON.parse(localS);

    if (parseLocal.key === "false" || now.getTime() > parseLocal.time) {
      return false;
    }
    return true;
  };

  return (
    <BrowserRouter>
      <div className="App">
        {keyValidity() === false ? <LogOnContainer /> : <ProfilePage />}
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogIn: state.logOnReducer.logIn,
    signOutMode: state.NavbarReducer.signOut,
  };
};

export default connect(mapStateToProps, null)(App);
