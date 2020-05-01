import React, { Component } from "react";
import DeleteModal from "../02-PROFILE-PAGE/02-HOME-PAGE/POSTS-BOXES/DELETE-MODAL/delete-modal";

// Titles array (codeless)
const titles = ["Info", "Posts", "Friends"];

class UserProfile extends Component {
  componentDidMount() {
    // Focus on the root element for quick exit
    document.querySelector(".my-profile-div").focus();
    // Set the activeBtn to the info section
    document.querySelectorAll(".m-p-b-s")[0].classList.add("active-btn-span");
  }

  cancellProfile = (e) => {
    if (e.key && e.target.className === "my-profile-div") {
      if (e.key === "Escape") {
        this.props.history();
      }
    } else {
      if (e.target.className === "my-profile-div") {
        this.props.history();
      }
    }
  };

  render() {
    // Display the titles in the Info section from the intiail var
    var titlesInfo = titles.map((title, ind) => {
      return (
        <div
          onClick={this.props.activeBtn}
          className="my-pro-btn-btn"
          key={ind}
        >
          <p title={title} className="my-pro-p">
            {title}
          </p>
          <span className="m-p-b-s" title={title}></span>
        </div>
      );
    });

    console.log("UserProfile -> RUNNING");
    return (
      <div
        className="my-profile-div"
        onClick={this.cancellProfile}
        onKeyDown={this.cancellProfile}
        tabIndex="0"
      >
        <DeleteModal
          delete={this.props.deletePost}
          cancel={this.props.exitDeleteModal}
        />
        <div className="my-profile-inside">
          <h1 className="my-pro-title">{this.props.fullName}</h1>
          <div className="my-pro-btn-div">{titlesInfo}</div>
          <div className="my-pro-view-div">{this.props.currentSection}</div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
