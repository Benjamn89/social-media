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
import Friends from "../../FUNCTIONS/friends";
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
    if (this.props.match.params.user !== nP.match.params.user) {
      // Remove the active class from the last btn
      document
        .querySelector(".active-btn-span")
        .classList.remove("active-btn-span");

      document.querySelector(".m-p-b-s").classList.add("active-btn-span");

      this.props.fetchUserData(nP.match.params.user);
    }
    return false;
  }

  componentDidMount() {
    if (this.props.history.action === "PUSH") {
      this.props.fetchUserData(this.props.match.params.user);
    } else {
      this.props.fetchUserDirect(this.props.match.params.user);
    }
  }

  history = () => {
    // Reset the state
    this.props.resetStateUsers();
    this.props.history.push("/");
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
    if (this.props.thisState.watched) {
      console.log("Return running");
      return this.props.changeSecWithNoFetch(title);
    }
    // Load Spinner
    document.querySelector(".my-pro-view-div").classList.add("showSpinner");
    // Save user email
    const email = this.props.thisState.profileUser.email;
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
    const email = this.props.thisState.loginUser.email;
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
        fullName: this.props.thisState.loginUser.fullName,
        ref: this.props.profileBox.refToProDoc,
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

  moveToUser = (e) => {
    if (e.target.className === "friends-btn friends-btn-hover") {
      const ref = this.props.thisState.profileUser.friends[
        e.target.getAttribute("index")
      ].ref;
      if (ref === this.props.loginRef) {
        return this.props.history.push("/profile");
      }
      this.props.history.push(`/users/${ref}`);
      return null;
    }

    // Save the like index
    const likeIndex = e.target.getAttribute("index");
    // Save the post index
    const postIndex = e.target.parentNode.parentNode.children[0].getAttribute(
      "index"
    );
    // Save the user ref
    const ref = this.props.thisState.Posts[postIndex].likes[likeIndex].ref;

    // Direct to profile if the user click on his name
    if (ref === this.props.loginRef) {
      return this.props.history.push("/profile");
    }

    // Direct to the user oage
    this.props.history.push(`/users/${ref}`);
  };

  addFriend = () => {
    // Add Spinner
    document.querySelector(".no-friends-div").classList.add("showSpinner2");
    const profileBox = JSON.parse(
      JSON.stringify(this.props.thisState.profileUser)
    );
    // Make copy of the friends array
    var friendsArr = JSON.parse(
      JSON.stringify(this.props.thisState.loginUser.friends)
    );
    const objToPush = {
      email: profileBox.email,
      fullName: profileBox.fullName,
      ref: profileBox.ref,
      image: profileBox.profileImg,
    };
    friendsArr.push(objToPush);
    const obj = {
      friendsArr,
      ref: this.props.thisState.loginUser.ref,
    };

    this.props.updateFriendsUserAction(obj);
  };

  render() {
    console.log("Users -> REDNER!!!");
    // thisState shortCut
    const thisState = this.props.thisState;
    // Save the user full name
    try {
      var fullName = this.props.thisState.profileUser.fullName;
    } catch {}
    // Create the currentView var
    var currentView;

    if (this.props.thisState.loginUser) {
      // Checking relation
      var checkFriends = this.props.thisState.loginUser.friends.find((el) => {
        return el.email === this.props.thisState.profileUser.email;
      });
    }

    // Create the profileBox
    if (thisState.currentView === "Info") {
      if (checkFriends) {
        // Set the titles var to be displyed
        const titlesToDisplay = {
          location: thisState.profileUser.location,
          website: thisState.profileUser.website,
          image: thisState.profileUser.profileImg,
        };
        // Time Stamp
        var splitTime = thisState.profileUser.time.split(" ");
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
    }

    if (thisState.currentView === "Posts") {
      if (thisState.Posts.length > 0) {
        currentView = thisState.Posts.map((el, ind) => {
          // Running time checking
          var time = TimeChecking(el.postedTime, "Right Now...");

          // Check if user like his own post
          var checkLikes = el.likes.find((el) => {
            return el.email === this.props.thisState.loginUser.email;
          });

          // Display the users who like the post
          var whoLikes = el.likes.map((user, userInd) => {
            return (
              <p key={userInd} onClick={this.moveToUser} index={userInd}>
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
            <h1>There are no posts to show</h1>
          </div>
        );
      }
    }
    if (thisState.currentView === "Friends") {
      if (thisState.profileUser.friends.length < 1) {
        currentView = <h1 className="no-friends-to-show">No Friends</h1>;
      } else {
        currentView = thisState.profileUser.friends.map((el, ind) => {
          return (
            <Friends
              imgUrl={el.image}
              fullName={el.fullName}
              index={ind}
              key={ind}
              moveToUser={this.moveToUser}
            />
          );
        });
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
        friends={checkFriends}
        addFriend={this.addFriend}
        name={fullName}
        userExists={thisState.profileUser}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    thisState: state.UsersReducer,
    profileBox: state.ProfileBoxReducer,
    loginRef: state.PostsReducer.ref,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetStateUsers: () => dispatch(actionTypes.resetStateUsers()),
    fetchUserData: (profileRef) =>
      dispatch(actionTypes.fetchUserData(profileRef)),
    fetchPostsFromUsers: (pro) =>
      dispatch(actionTypes.fetchPostsFromUsers(pro)),
    changeSecWithNoFetch: (title) =>
      dispatch(actionTypes.changeSecWithNoFetch(title)),
    updateLikeUsersAction: (pro) =>
      dispatch(actionTypes.updateLikeUsersAction(pro)),
    deletePostUsersAction: (pro) =>
      dispatch(actionTypes.deletePostUsersAction(pro)),
    updateFriendsUserAction: (obj) =>
      dispatch(actionTypes.updateFriendsUserAction(obj)),
    fetchUserDirect: (profileRef) =>
      dispatch(actionTypes.fetchUserDirect(profileRef)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
