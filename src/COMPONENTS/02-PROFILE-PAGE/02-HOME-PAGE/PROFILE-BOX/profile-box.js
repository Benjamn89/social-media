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

  pickImage = (e) => {
    storeInputPick = e.target.files[0];
    if (storeInputPick) {
      this.props.renderProfileImage(
        storeInputPick,
        this.props.profileBoxState.refToProDoc
      );
    }
  };

  uploadBtn = () => {
    if (storeInputPick) {
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

    document.querySelectorAll(
      "#standard-basic"
    )[1].value = this.props.profileBoxState.location;
    document.querySelectorAll(
      "#standard-basic"
    )[2].value = this.props.profileBoxState.website;
  };
  // Save profile info when click on save
  saveProInfo = () => {
    var location = document.querySelectorAll("#standard-basic")[1].value;
    var web = document.querySelectorAll("#standard-basic")[2].value;
    if (
      location !== this.props.profileBoxState.location ||
      web !== this.props.profileBoxState.website
    ) {
      this.props.saveProInfo(
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
            {this.props.profileBoxState.privateName}
          </p>
          <input
            ref={(fileInput) => (this.fileInput = fileInput)}
            type="file"
            onChange={this.pickImage}
            style={{ display: "none" }}
          />
          <img
            src={Pen}
            className="profile-box-pen-image"
            alt="penImg"
            onClick={() => this.fileInput.click()}
          />
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
            <img
              onClick={this.openModal}
              className="edit-profile-bio"
              src={Pen}
              alt="penImg"
            />
          </div>
        </div>
      );
    }
    return (
      <div className="posts-sec-wrapper">
        <Modal saveProInfo={this.saveProInfo} cancelModal={this.cancelModal} />
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
    saveProInfo: (ref, location, web) =>
      dispatch(actionTypes.saveProInfo(ref, location, web)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);
