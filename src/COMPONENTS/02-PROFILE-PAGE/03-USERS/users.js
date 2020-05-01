import React, { Component } from "react";
import "./users.css";
import { connect } from "react-redux";
import actionTypes from "../../../REDUCERS/04-USERS/actionTypes";
// Import Components/Function/Modals
import UserProfile from "../../FUNCTIONS/userProfile";
import ProfileBox from "../../FUNCTIONS/profile-box";
import SinglePost from "../02-HOME-PAGE/POSTS-BOXES/single-post";
import TimeChecking from "../../FUNCTIONS/time-checking";
import ShowLikesBox from "../../FUNCTIONS/showLikes";
// Import media
import Like from "../../../media/heart-like.png";
import Unlike from "../../../media/heart-unlike.png";
import Delete from "../../../media/delete.png";
import Comment from "../../../media/comments.png";

// Global variables
var index;

class Users extends Component {
  shouldComponentUpdate(nP, nS) {
    if (nP.thisState.allowR !== this.props.thisState.allowR) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    // Load Spinner
    document.querySelector(".my-profile-div").classList.add("showSpinner");
    // Save the user ref for loading data
    const userRef = this.props.match.params.user;
    // Send actionType for fething the data based on the user Ref
    this.props.fetchUserData(userRef);
  }

  history = () => {
    // Reset the state
    this.props.resetStateUsers();
    this.props.history.goBack();
  };

  activeBtn = (e) => {
    // Save title
    const title = e.target.getAttribute("title");
    // Remove the active class from the last btn
    document
      .querySelector(".active-btn-span")
      .classList.remove("active-btn-span");
    // Add the active btn style to the choosen on
    e.target.parentNode.children[1].classList.add("active-btn-span");
    // Check if the user allready fetch the section
    if (
      this.props.thisState[title].length > 0 ||
      this.props.thisState[title].fullName
    ) {
      console.log("Return running");
      return this.props.changeSecWithNoFetch(title);
    }
    // Load Spinner
    document.querySelector(".my-pro-view-div").classList.add("showSpinner");
    // Save user email
    const email = this.props.thisState.Info.email;
    // Create obj for actiontypes
    const objPro = {
      email,
      title,
    };
    // Send action Type
    this.props.fetchPostsFromUsers(objPro);
  };

  likeClick = (e) => {
    // Save the post index
    const index = e.target.getAttribute("index");
    // Make a clone copy of the posts
    var posts = JSON.parse(JSON.stringify(this.props.thisState.Posts));
    // Make shortcut of the user email
    const email = this.props.thisState.email;
    // Checking if the user like is own post and change accordlny
    var checkLike = posts[index].likes.find((el) => {
      return el.email === email;
    });
    // Remove the email from the likes array if checkLike returned true
    if (checkLike) {
      // Remove the email for the likes array
      var filterArray = posts[index].likes.filter((fl) => {
        return fl.email !== email;
      });
      // Save the updated array into the posts array
      posts[index].likes = filterArray;
    } else {
      // Create Obj and push it into the likes array
      var obj = {
        email,
        fullName: this.props.loginFullName,
        ref: this.props.loginRef,
      };
      // Push the email if checkLike returned undefiend
      posts[index].likes.push(obj);
    }

    // Create obj to forward it to the action type
    const objPro = {
      ref: posts[index].ref,
      posts,
      index,
    };
    // Call the actionType
    this.props.updateLikeUsersAction(objPro);
  };

  clickComment = (e) => {
    // Save index of the post
    const index = e.target.getAttribute("index");
    // Save the ref to the post
    const ref = this.props.thisState.Posts[index].ref;
    // Direct to the comment page
    this.props.history.push(`/comment/${ref}`);
    // Reset the state
    this.props.resetStateUsers();
  };

  openDeleteDialog = (e) => {
    // Open the dialog box
    document.querySelectorAll(".delete-modal-div")[1].style.display = "flex";
    // Focus for quick exit
    document.querySelectorAll(".delete-modal-div")[1].focus();
    // Save the post index into the global variable index
    index = e.target.getAttribute("index");
  };

  exitDeleteModal = (e) => {
    if (
      e.key === "Escape" ||
      e.target.innerHTML === "Cancel" ||
      e.target.className === "delete-modal-div"
    ) {
      document.querySelectorAll(".delete-modal-div")[1].style.display = "none";
    }
  };

  deletePost = (e) => {
    // Load Spinner
    document
      .querySelectorAll(".delete-modal-inside-div")[1]
      .classList.add("deleteCommentSpinner");
    // Save the post ref by the help of the index global variable we saved in the open dialog
    var ref = this.props.thisState.Posts[index].ref;
    // Make a clone copy of the posts
    var posts = JSON.parse(JSON.stringify(this.props.thisState.Posts));
    // Remove the posts from the copy posts Array (with the help of the global var index)
    posts.splice(index, 1);
    // Create obj to pass it to the action
    const opjPro = {
      ref,
      posts,
    };
    // Send actionType for deleting the post
    this.props.deletePostUsersAction(opjPro);
  };

  render() {
    console.log("Users -> REDNER!!!");
    // thisState shortCut
    const thisState = this.props.thisState;
    // Save the user full name
    const fullName = thisState.Info.fullName;
    // Create the currentView var
    var currentView;

    // Create the profileBox
    if (thisState.currentView === "Info") {
      // Set the titles var to be displyed
      const titlesToDisplay = {
        location: thisState.Info.location,
        website: thisState.Info.website,
        image: thisState.Info.profileImg,
      };
      // Time Stamp
      var splitTime = thisState.Info.time.split(" ");
      var timeStamp = {
        year: splitTime[3],
        month: splitTime[1],
        day: splitTime[2],
      };
      currentView = (
        <ProfileBox
          locationText={titlesToDisplay.location}
          websiteText={titlesToDisplay.website}
          timeStampMonth={timeStamp.month}
          timeStampYear={timeStamp.year}
          profileUrl={titlesToDisplay.image}
        />
      );
    }

    if (thisState.currentView === "Posts") {
      if (thisState.Posts.length > 0) {
        currentView = thisState.Posts.map((el, ind) => {
          // Running time checking
          var time = TimeChecking(el.postedTime, "Right Now...");

          // Check if user like his own post
          var checkLikes = el.likes.find((el) => {
            return el.email === this.props.thisState.email;
          });

          // Display the users who like the post
          var whoLikes = el.likes.map((user, userInd) => {
            return (
              <p key={userInd}>
                {userInd + 1}. {user.fullName}
              </p>
            );
          });

          // Checking if to display the delete button
          var deleteBtn;
          if (thisState.email === el.email) {
            deleteBtn = (
              <div
                className="post-delete-div"
                onClick={this.openDeleteDialog}
                index={ind}
              >
                <img className="post-delete-btn" src={Delete} alt="deletebtn" />
              </div>
            );
          }

          return (
            <SinglePost
              key={ind}
              imageUrl={el.imageUrl}
              fullName={el.fullName}
              displayTime={time}
              text={el.text}
              likeClick={this.likeClick}
              likeIcon={checkLikes ? Like : Unlike}
              index={ind}
              likesLength={el.likes.length}
              clickComment={this.clickComment}
              commentsImage={Comment}
              commentsLength={el.comments.length}
              whoLikes={whoLikes}
              showLikes={ShowLikesBox}
            >
              {/* // Display the delete icon on each post */}
              {deleteBtn}
            </SinglePost>
          );
        });
        // Reverse the array to display from top to bottom
        currentView.reverse();
      } else {
        currentView = (
          <div className="no-post-profile-div">
            <h1>There are no posts to show.</h1>
          </div>
        );
      }
    }
    return (
      <UserProfile
        fullName={fullName}
        history={this.history}
        currentSection={currentView}
        activeBtn={this.activeBtn}
        exitDeleteModal={this.exitDeleteModal}
        deletePost={this.deletePost}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    thisState: state.UsersReducer,
    loginFullName: state.ProfileBoxReducer.fullName,
    loginRef: state.PostsReducer.ref,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetStateUsers: () => dispatch(actionTypes.resetStateUsers()),
    fetchUserData: (userRef) => dispatch(actionTypes.fetchUserData(userRef)),
    fetchPostsFromUsers: (pro) =>
      dispatch(actionTypes.fetchPostsFromUsers(pro)),
    changeSecWithNoFetch: (title) =>
      dispatch(actionTypes.changeSecWithNoFetch(title)),
    updateLikeUsersAction: (pro) =>
      dispatch(actionTypes.updateLikeUsersAction(pro)),
    deletePostUsersAction: (pro) =>
      dispatch(actionTypes.deletePostUsersAction(pro)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
