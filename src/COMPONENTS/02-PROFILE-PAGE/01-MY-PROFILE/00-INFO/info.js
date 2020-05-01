import React, { Component } from "react";
import "./info.css";
// Import redux
import { connect } from "react-redux";
// Import Components
import ProfileBox from "../../../FUNCTIONS/profile-box";

class Info extends Component {
  render() {
    // Short cut to the profile box state
    const profileBoxState = this.props.profileBoxState;
    // Initial var for display the componenet
    var infoDiv = null;
    // Checking if the profileBoxState exists to render the info
    if (profileBoxState.email) {
      infoDiv = (
        <div className="info-div">
          <ProfileBox
            profileUrl={profileBoxState.url}
            fullName={profileBoxState.fullName}
            pickImage={null}
            click={null}
            locationText={profileBoxState.location}
            websiteText={profileBoxState.website}
            timeStampMonth={profileBoxState.timeStamp.month}
            timeStampYear={profileBoxState.timeStamp.year}
            openModal={null}
          />
        </div>
      );
    }

    console.log("Info -> REDNER!!!");
    return infoDiv;
  }
}

const mapStateToProps = (state) => {
  return {
    profileBoxState: state.ProfileBoxReducer,
  };
};

export default connect(mapStateToProps, null)(Info);
