import React from "react";

const profileBox = (props) => {
  console.log("Profile Box Function -> RENDER!!!");
  return (
    <div className="inside-sec-two">
      <img src={props.profileUrl} alt="profileImg" className="profile-img" />
      <p className="profilebox-name-title-p">{props.fullName}</p>
      {props.children}
      <div className="wrap-img-pen">
        {props.Pen ? (
          <img
            src={props.Pen}
            className="profile-box-pen-image"
            alt="penImg"
            onClick={() => props.click()}
          />
        ) : null}
      </div>
      <div className="profile-box-div-info">
        <div className="row-div-inside">
          <img src={props.Location} alt="location" />

          <p className="location-p">{props.locationText}</p>
        </div>
        <div className="row-div-inside">
          <img src={props.Website} alt="website" />
          <p className="website-p"> {props.websiteText} </p>
        </div>
        <div className="row-div-inside">
          <img src={props.Calender} alt="calender" />
          joined {props.timeStampMonth} {props.timeStampYear}
        </div>
        <div className="wrap-img-pen2">
          {props.Pen ? (
            <img
              onClick={props.openModal}
              className="edit-profile-bio"
              src={props.Pen}
              alt="penImg"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default profileBox;

/* <div className="inside-sec-two">
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
</div> */
