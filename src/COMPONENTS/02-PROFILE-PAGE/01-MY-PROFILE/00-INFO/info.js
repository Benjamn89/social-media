import React, { Component } from "react";
import "./info.css";
// Import redux
import { connect } from "react-redux";
// Import Components
import ProfileBox from "../../../FUNCTIONS/profile-box";
// Import Media
import Location from "../../../../media/location.png";
import Website from "../../../../media/website.png";
import Calender from "../../../../media/calender.png";

class Info extends Component {
  render() {
    // Short cut to the profile box state
    const profileBoxState = this.props.profileBoxState;
    console.log("Info -> REDNER!!!");
    return (
      <div className="info-div">
        <ProfileBox
          profileUrl={profileBoxState.url}
          fullName={profileBoxState.fullName}
          pickImage={null}
          click={null}
          Location={Location}
          locationText={profileBoxState.location}
          Website={Website}
          websiteText={profileBoxState.website}
          Calender={Calender}
          timeStampMonth={profileBoxState.timeStamp.month}
          timeStampYear={profileBoxState.timeStamp.year}
          openModal={null}
          fileInput={this.fileInput}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileBoxState: state.ProfileBoxReducer,
  };
};

export default connect(mapStateToProps, null)(Info);
