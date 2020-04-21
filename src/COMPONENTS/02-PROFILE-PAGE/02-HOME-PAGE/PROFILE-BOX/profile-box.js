import React, { Component } from "react";
import "./profile-box.css";
// Import Images
import Pen from "../../../../media/pen.png";
import Location from "../../../../media/location.png";
import Website from "../../../../media/website.png";
import Calender from "../../../../media/calender.png";
// Import redux
import { connect } from "react-redux";
import actionTypes from "../../../../REDUCERS/02-HOME-PAGE/01-PROFILE-BOX/actionTypes";
// Import modal for changing profile details
import Modal from "./MODAL/modal";

// Store the uploaded image name
let storeInputPick;

class ProfileBox extends Component {
  componentDidMount() {
    this.props.retriveLoginData();
  }

  shouldComponentUpdate(nP, nS) {
    var tProps = this.props.profileBoxState;
    if (
      tProps.email !== nP.profileBoxState.email ||
      tProps.url !== nP.profileBoxState.url ||
      tProps.location !== nP.profileBoxState.location
    ) {
      return true;
    } else {
      return false;
    }
  }

  pickImage = (e) => {
    storeInputPick = e.target.files[0];
    if (storeInputPick) {
      document.querySelector(".posts-sec-wrapper").classList.add("showSpinner");
      this.props.renderProfileImage(
        storeInputPick,
        this.props.profileBoxState.refToProDoc
      );
    }
  };

  // Open modal for update location/website
  openModal = (e) => {
    var el = document.querySelector(".modal");
    el.style.display = "flex";
    el.focus();

    var locationValue = this.props.profileBoxState.location;
    var webValue = this.props.profileBoxState.website;

    if (locationValue === "EDIT") {
      locationValue = "";
    }
    if (webValue === "EDIT") {
      webValue = "";
    }

    document.querySelectorAll("#standard-basic")[1].value = locationValue;
    document.querySelectorAll("#standard-basic")[2].value = webValue;
  };
  // Save profile info when click on save
  establishFetch = () => {
    var location = document.querySelectorAll("#standard-basic")[1].value;
    var web = document.querySelectorAll("#standard-basic")[2].value;
    if (
      location !== this.props.profileBoxState.location ||
      web !== this.props.profileBoxState.website
    ) {
      // Remove Modal
      document.querySelector(".modal").style.display = "none";
      // Add Spinner
      document.querySelector(".posts-sec-wrapper").classList.add("showSpinner");
      // Start Fething
      this.props.establishFetch(
        this.props.profileBoxState.refToProDoc,
        location,
        web
      );
    } else {
      document.querySelector(".modal").style.display = "none";
    }
  };

  // Cancel Model On click
  cancelModal = (e) => {
    if (e.key === "Escape" || e.target.innerHTML === "Cancel") {
      document.querySelector(".modal").style.display = "none";
    }
  };

  render() {
    console.log("ProfileBox -> REDNER!!!");
    var profileBox = null;
    if (this.props.profileBoxState.url) {
      profileBox = (
        <div className="inside-sec-two">
          <img
            src={this.props.profileBoxState.url}
            alt="profileImg"
            className="profile-img"
          />
          <p className="profilebox-name-title-p">
            {this.props.profileBoxState.fullName}
          </p>
          <input
            ref={(fileInput) => (this.fileInput = fileInput)}
            type="file"
            onChange={this.pickImage}
            style={{ display: "none" }}
          />
          <div className="wrap-img-pen">
            <img
              src={Pen}
              className="profile-box-pen-image"
              alt="penImg"
              onClick={() => this.fileInput.click()}
            />
          </div>
          <div className="profile-box-div-info">
            <div className="row-div-inside">
              <img src={Location} alt="location" />

              <p className="location-p">
                {this.props.profileBoxState.location}
              </p>
            </div>
            <div className="row-div-inside">
              <img src={Website} alt="website" />
              <p className="website-p">
                {" "}
                {this.props.profileBoxState.website}{" "}
              </p>
            </div>
            <div className="row-div-inside">
              <img src={Calender} alt="calender" />
              joined {this.props.profileBoxState.timeStamp.month}{" "}
              {this.props.profileBoxState.timeStamp.year}
            </div>
            <div className="wrap-img-pen2">
              <img
                onClick={this.openModal}
                className="edit-profile-bio"
                src={Pen}
                alt="penImg"
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="posts-sec-wrapper">
        <Modal
          establishFetch={this.establishFetch}
          cancelModal={this.cancelModal}
        />
        {profileBox}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedEmail: state.logOnReducer.loggedEmail,
    profileBoxState: state.ProfileBoxReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    renderProfileImage: (storeInputPick, refDoc) =>
      dispatch(actionTypes.renderProfileImage(storeInputPick, refDoc)),
    retriveLoginData: () => dispatch(actionTypes.retriveLoginData()),
    establishFetch: (ref, location, web) =>
      dispatch(actionTypes.establishFetch(ref, location, web)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);
