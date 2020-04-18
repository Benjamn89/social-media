import React, { Component } from "react";
import "./profile-box.css";
import Pen from "../../../../media/pen.png";
import Location from "../../../../media/location.png";
import Website from "../../../../media/website.png";
import Calender from "../../../../media/calender.png";
import { connect } from "react-redux";
import actionTypes from "../../../../REDUCERS/02-HOME-PAGE/01-PROFILE-BOX/actionTypes";
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
              <p className="location-p">Edit</p>
            </div>
            <div className="row-div-inside">
              <img src={Website} alt="website" />
              <p className="website-p">Edit</p>
            </div>
            <div className="row-div-inside">
              <img src={Calender} alt="calender" />
              joined {this.props.profileBoxState.timeStamp.month}{" "}
              {this.props.profileBoxState.timeStamp.year}
            </div>
            <img className="edit-profile-bio" src={Pen} alt="penImg" />
          </div>
        </div>
      );
    }
    return <div className="posts-sec-wrapper">{profileBox}</div>;
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);
