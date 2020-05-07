// Import React tools
import React, { Component } from "react";
import { connect } from "react-redux";
import actionTypes from "../../../REDUCERS/03-PROFILE-PGAE/actionTypes";
import "./my-profile.css";
// Import Functions
import TimeChecking from "../../FUNCTIONS/time-checking";
import ShowLikesBox from "../../FUNCTIONS/showLikes";
// Import Components
import Info from "./00-INFO/info";
import SinglePost from "../02-HOME-PAGE/POSTS-BOXES/single-post";
import UserProfile from "../../FUNCTIONS/userProfile";
import Friends from "../../FUNCTIONS/friends";
//Import Media
import Unlike from "../../../media/heart-unlike.png";
import Like from "../../../media/heart-like.png";
import Comment from "../../../media/comments.png";
import Delete from "../../../media/delete.png";

// Global variables
var index;

class MyProfile extends Component {
  componentDidMount() {
    console.log("ComponentDidMount");
  }

  activeBtn = (e) => {
    if (e.target.className === "my-pro-p") {
      // Load Spinner
      document.querySelector(".my-pro-view-div").classList.add("showSpinner");
      // Initial variables
      var visitPost = false;
      // Shortcut to this state
      const thisState = this.props.profilePageState;
      // Remove the active class from the last btn
      document
        .querySelector(".active-btn-span")
        .classList.remove("active-btn-span");
      // Add the active btn style to the choosen on
      e.target.parentNode.children[1].classList.add("active-btn-span");
      // Create variable to check if the client allready click on the posts view section
      if (thisState.wasFetched) {
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

  likeClick = (e) => {
    // Save the post index
    const index = e.target.getAttribute("index");
    // Make a clone copy of the posts
    var posts = JSON.parse(
      JSON.stringify(this.props.profilePageState.userPosts)
    );
    // Make shortcut of the user email
    const email = this.props.profileBoxState.email;
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
        fullName: this.props.profileBoxState.fullName,
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
    this.props.updateLikeAction(objPro);
  };

  clickComment = (e) => {
    // Save index of the post
    const index = e.target.getAttribute("index");
    // Save the ref to the post
    const ref = this.props.profilePageState.userPosts[index].ref;
    // Direct to the comment page
    this.props.history.push(`/comment/${ref}`);
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
    var ref = this.props.profilePageState.userPosts[index].ref;
    // Make a clone copy of the posts
    var posts = JSON.parse(
      JSON.stringify(this.props.profilePageState.userPosts)
    );
    // Remove the posts from the copy posts Array (with the help of the global var index)
    posts.splice(index, 1);
    // Create obj to pass it to the action
    const opjPro = {
      ref,
      posts,
    };
    // Send actionType for deleting the post
    this.props.deletePostAction(opjPro);
  };

  history = () => {
    this.props.resetState();
    this.props.history.goBack();
  };

  moveToUser = (e) => {
    if (e.target.className === "friends-btn friends-btn-hover") {
      const ref = this.props.profileBoxState.friends[
        e.target.getAttribute("index")
      ].ref;

      this.props.resetState();
      this.props.history.push(`users/${ref}`);
      return null;
    }
    // Save the like index
    const likeIndex = e.target.getAttribute("index");
    // S the post index
    const postIndex = e.target.parentNode.parentNode.children[0].getAttribute(
      "index"
    );
    // S the user ref
    const ref = this.props.profilePageState.userPosts[postIndex].likes[
      likeIndex
    ].ref;

    // Direct to the proile page if the user login in click on his name
    if (ref === this.props.loginRef) {
      return null;
    }

    // Direct to the user page
    this.props.resetState();
    this.props.history.push(`users/${ref}`);
  };

  removeFriendBtn = (e) => {
    e.target.classList.add("friendsSpinner");
    const index = e.target.getAttribute("index");
    const profileBoxShort = this.props.profileBoxState;
    const loginRef = profileBoxShort.refToProDoc;
    var copyFriendsArr = JSON.parse(JSON.stringify(profileBoxShort.friends));
    copyFriendsArr.splice(index, 1);
    const obj = {
      loginRef,
      copyFriendsArr,
      index,
    };
    this.props.removeFriendsFromProfile(obj);
  };

  render() {
    console.log("ProfilePage -> REDNER!!!");
    // Initial global variable
    var currentSection;
    // Short cut to the profilePage state
    var thisState = this.props.profilePageState;

    // Display the section that the user click on
    if (thisState.currentSection === "Info") {
      currentSection = <Info />;
    }
    if (thisState.currentSection === "Posts") {
      if (thisState.userPosts.length > 0) {
        currentSection = thisState.userPosts.map((el, ind) => {
          // Running time checking
          var time = TimeChecking(el.postedTime, "Right Now...");

          // Check if user like his own post
          var checkLikes = el.likes.find((el) => {
            return el.email === this.props.profileBoxState.email;
          });

          // Display the users who like the post
          var whoLikes = el.likes.map((user, userInd) => {
            return (
              <p key={userInd} onClick={this.moveToUser} index={userInd}>
                {userInd + 1}. {user.fullName}
              </p>
            );
          });

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
              <div
                className="post-delete-div"
                onClick={this.openDeleteDialog}
                index={ind}
              >
                <img className="post-delete-btn" src={Delete} alt="deletebtn" />
              </div>
            </SinglePost>
          );
        });
        // Reverse the array to display from top to bottom
        currentSection.reverse();
      } else {
        currentSection = (
          <div className="no-post-profile-div">
            <h1>There are no posts to show</h1>
          </div>
        );
      }
    }
    if (thisState.currentSection === "Friends") {
      if (this.props.profileBoxState.friends.length < 1) {
        currentSection = <h1 className="no-friends-to-show">No Friends</h1>;
      } else {
        currentSection = this.props.profileBoxState.friends.map((el, ind) => {
          return (
            <Friends
              imgUrl={el.image}
              fullName={el.fullName}
              key={ind}
              moveToUser={this.moveToUser}
              index={ind}
              removeFriends={true}
              removeFriendBtn={this.removeFriendBtn}
            />
          );
        });
      }
    }

    return (
      <UserProfile
        fullName={this.props.profileBoxState.fullName}
        history={this.history}
        currentSection={currentSection}
        activeBtn={this.activeBtn}
        deletePost={this.deletePost}
        exitDeleteModal={this.exitDeleteModal}
        friends={true}
        userExists={true}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileBoxState: state.ProfileBoxReducer,
    profilePageState: state.ProfilePageReducer,
    loginRef: state.PostsReducer.ref,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionChangeMode: (pro) => dispatch(actionTypes.actionChangeMode(pro)),
    resetState: () => dispatch(actionTypes.resetState()),
    updateLikeAction: (pro) => dispatch(actionTypes.updateLikeAction(pro)),
    deletePostAction: (pro) => dispatch(actionTypes.deletePostAction(pro)),
    removeFriendsFromProfile: (pro) =>
      dispatch(actionTypes.removeFriendsFromProfile(pro)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
