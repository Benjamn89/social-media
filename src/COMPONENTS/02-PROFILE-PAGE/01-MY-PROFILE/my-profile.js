// Import React tools
import React, { Component } from "react";
import { connect } from "react-redux";
import actionTypes from "../../../REDUCERS/03-PROFILE-PGAE/actionTypes";
import "./my-profile.css";
import $ from "jquery";
// Import Functions
import TimeChecking from "../../FUNCTIONS/time-checking";
// Import Components
import Info from "./00-INFO/info";
// import Posts from "./02-POSTS/posts";
import SinglePost from "../02-HOME-PAGE/POSTS-BOXES/single-post";
//Import Media
import Unlike from "../../../media/heart-unlike.png";
import Comment from "../../../media/comments.png";

// Titles array (codeless)
const titles = ["Info", "Posts", "Friends"];

class MyProfile extends Component {
  componentDidMount() {
    // Create short cut for the titles elements
    var title = $(".m-p-b-s");
    // Create short cut for the currentMode state
    var currentMode = this.props.profilePageState.currentSection;
    // Set the active buttons base on the currentMode state
    if (currentMode === "Info") {
      $(title[0]).addClass("active-btn-span");
    }
    if (currentMode === "Posts") {
      $(title[1]).addClass("active-btn-span");
    }
    if (currentMode === "Friends") {
      $(title[2]).addClass("active-btn-span");
    }
  }

  cancellProfile = (e) => {
    if (e.target.className === "my-profile-div") {
      this.props.history.push("/");
    }
  };

  activeBtn = (e) => {
    if (e.target.className === "my-pro-p") {
      // Load Spinner
      document.querySelector(".my-pro-view-div").classList.add("showSpinner");
      // Initial variables
      var visitPost = false;
      // Shortcut to this state
      const thisState = this.props.profilePageState;
      // Remove the active class from the last btn
      $(".active-btn-span").removeClass("active-btn-span");
      // Add the active btn style to the choosen on
      e.target.parentNode.children[1].classList.add("active-btn-span");
      // Create variable to check if the client allready click on the posts view section
      if (thisState.userPosts.length > 1) {
        visitPost = true;
      }
      // Create obj to pass to the actionTypes
      const objPro = {
        sectionName: e.target.innerHTML,
        email: this.props.profileBoxState.email,
        visitPost,
      };
      this.props.actionChangeMode(objPro);
    }
  };

  likeClick = () => {
    console.log("like click");
  };

  clickComment = () => {
    console.log("comment click");
    this.props.history.push("/leaveComment");
  };

  render() {
    console.log("ProfilePage -> REDNER!!!");
    // Initial global variable
    var currentSection;
    // Short cut to the profilePage state
    var thisState = this.props.profilePageState;

    // Display the 3 titles from the initial array outside the class
    var titlesDiv = titles.map((el, ind) => {
      return (
        <div onClick={this.activeBtn} className="my-pro-btn-btn" key={ind}>
          <p className="my-pro-p">{el}</p>
          <span className="m-p-b-s"></span>
        </div>
      );
    });

    // Display the section that the user click on
    if (thisState.currentSection === "Info") {
      currentSection = <Info />;
    }
    if (thisState.currentSection === "Posts") {
      currentSection = thisState.userPosts.map((el, ind) => {
        // Running time checking
        var time = TimeChecking(el.postedTime, "value");

        return (
          <SinglePost
            key={ind}
            imageUrl={el.imageUrl}
            fullName={el.fullName}
            displayTime={time}
            text={el.text}
            likeClick={this.likeClick}
            likeIcon={Unlike}
            index={ind}
            likesLength={el.likes.length}
            clickComment={this.clickComment}
            commentsImage={Comment}
            commentsLength={el.comments.length}
          ></SinglePost>
        );
      });
      // Reverse the array to display from top to bottom
      currentSection.reverse();
    }
    if (thisState.currentSection === "Friends") {
      currentSection = null;
    }

    return (
      <div className="my-profile-div" onClick={this.cancellProfile}>
        <div className="my-profile-inside">
          <h1 className="my-pro-title">
            {this.props.profileBoxState.fullName}
          </h1>
          <div className="my-pro-btn-div">{titlesDiv}</div>
          <div className="my-pro-view-div">{currentSection}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileBoxState: state.ProfileBoxReducer,
    profilePageState: state.ProfilePageReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionChangeMode: (pro) => dispatch(actionTypes.actionChangeMode(pro)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
