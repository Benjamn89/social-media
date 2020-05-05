import React, { Component } from "react";
import "./posts-boxes.css";
// Import React tools
import actionTypes from "../../../../REDUCERS/02-HOME-PAGE/00-POSTS-BOX/actionTypes";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Import Components
import SinglePost from "./single-post";
// Import modals/ functions
import DeleteModal from "./DELETE-MODAL/delete-modal";
import Modal from "./MODAL/modal";
import TimeChecking from "../../../FUNCTIONS/time-checking";
import ShowLikesBox from "../../../FUNCTIONS/showLikes";
import LoadPosts from "../../../FUNCTIONS/load-posts";
// Import Media
import UnlikeHeart from "../../../../media/heart-unlike.png";
import LikeHeart from "../../../../media/heart-like.png";
import Comments from "../../../../media/comments.png";
import Delete from "../../../../media/delete.png";

// Global Variables
var postIndex;

class PostsBoxes extends Component {
  componentDidMount() {
    this.props.loadPosts();
  }

  shouldComponentUpdate(nP, nS) {
    const thisProps = this.props.postsArray;
    console.log("SCP");
    if (
      nP.postsArray.changePost !== thisProps.changePost ||
      nP.postsArray.addLike !== thisProps.addLike
    ) {
      return true;
    } else if (
      nP.commentsState !== this.props.commentsState ||
      nP.profilePageState !== this.props.profilePageState ||
      nP.usersUpdatedLike !== this.props.usersUpdatedLike
    ) {
      this.props.loadPosts();
      return false;
    } else {
      return false;
    }
  }

  savePost = (e) => {
    // Load Spinner
    document
      .querySelector(".posts-modal-inside")
      .classList.add("createPostSpinner");
    var text = document.querySelectorAll("#standard-basic")[0].value;
    if (text.length > 0) {
      const uniqeId = this.props.postsArray.posts.length;
      const obj = { ...this.props.profileBoxState };
      const state = this.props.postsArray.posts;
      const now = new Date();
      const postedTime = now.getTime();
      const moveOnProperties = {
        text,
        email: obj.email,
        fullName: obj.fullName,
        url: obj.url,
        state,
        postedTime,
        uniqeId,
      };

      this.props.createNewPost(moveOnProperties);
    }
  };
  likeClick = (e) => {
    // Create shortcut for the profilebox state
    const profileBoxS = this.props.profileBoxState;

    var id = e.target.getAttribute("index");
    var email = profileBoxS.email;
    var fullName = profileBoxS.fullName;
    var ref = this.props.postsArray.ref;
    var copyPosts = JSON.parse(JSON.stringify(this.props.postsArray));
    var post = copyPosts.posts[id];

    var validateEmail = post.likes.find((el) => {
      return el.email === email;
    });

    if (validateEmail) {
      // Remove the index array with filter function and save it
      var filterArray = copyPosts.posts[id].likes.filter((fl) => {
        return fl.email !== email;
      });
      // Copy the filterd array into the copy post
      copyPosts.posts[id].likes = filterArray;
    } else {
      // Create obj to push on the likes array
      const likesObj = {
        email,
        fullName,
        ref,
      };
      // Push the obj into the copy post like array
      copyPosts.posts[id].likes.push(likesObj);
    }

    var updatedLike = copyPosts.posts[id].likes;
    var properties = {
      email,
      ref: post.ref,
      updatedLike,
      copyPosts: copyPosts.posts,
    };
    this.props.likeOnPost(properties);
  };

  clickComment = (e) => {
    // Save the post index
    var id = e.target.getAttribute("index");
    // Save the ref of the clicked post
    var ref = this.props.postsArray.posts[id].ref;
    // Direct to the comment component
    this.props.history.push(`/comment/${ref}/`);
  };

  openDeleteDialog = (e) => {
    //Saving the post index in the global variable
    postIndex = e.target.getAttribute("index");

    document.querySelector(".delete-modal-div").style.display = "flex";
    document.querySelector(".delete-modal-div").focus();
  };

  deletePost = (e) => {
    // Showing the spinner while fetching
    document
      .querySelector(".delete-modal-inside-div")
      .classList.add("deletePostSpinner");

    // Make a clone copy of the posts array
    const copyPost = JSON.parse(JSON.stringify(this.props.postsArray.posts));
    // Pick the post ref
    const ref = copyPost[postIndex].ref;

    // Remove the post from the copyArray posts
    copyPost.splice(postIndex, 1);
    // Create object to pass it to the actin type
    const objPro = {
      ref,
      copyPost,
    };

    // Sending action to delete the post
    this.props.deletePost(objPro);
  };

  exitDeleteModal = (e) => {
    if (
      e.key === "Escape" ||
      e.target.innerHTML === "Cancel" ||
      e.target.className === "delete-modal-div"
    ) {
      document.querySelector(".delete-modal-div").style.display = "none";
    }
  };

  moveToUser = (e) => {
    // Initial ref
    var ref;
    // Save the like index
    const index = e.target.getAttribute("index");
    // Check from where the click sent to pick the user profile correctly
    if (e.target.className === "in-sin-p1-span") {
      // Save user ref
      ref = this.props.postsArray.posts[index].userRef;
    } else {
      var postIndex = e.target.parentNode.parentNode.children[0].getAttribute(
        "index"
      );
      ref = this.props.postsArray.posts[postIndex].likes[index].ref;
    }

    // Direct to the proile page if the user login in click on his name
    if (ref === this.props.postsArray.ref) {
      return this.props.history.push("/profile");
    }
    // Direct to the user profile
    this.props.history.push(`users/${ref}`);
  };

  loadSecondArr = () => {
    // Load spinner
    document.querySelector(".arrow-down-div").classList.add("loadPostsSpinner");

    setTimeout(() => {
      document
        .querySelector(".arrow-down-div")
        .classList.remove("loadPostsSpinner");
      setTimeout(() => {
        document
          .querySelector(".arrow-down-div")
          .classList.add("move-arrow-down");
        setTimeout(() => {
          var copyPosts = JSON.parse(
            JSON.stringify(this.props.postsArray.posts)
          );
          var copySecond = JSON.parse(
            JSON.stringify(this.props.postsArray.secondArr)
          );
          copySecond.reverse();
          copySecond.map((el) => {
            return copyPosts.unshift(el);
          });
          this.props.loadSecondArr(copyPosts);
        }, 500);
      }, 200);
    }, 1000);
  };

  render() {
    console.log("PostsBoxes -> REDNER!!!");
    // Initial variables
    var fetchedPosts = null;

    if (this.props.postsArray.posts.length > 0) {
      fetchedPosts = this.props.postsArray.posts.map((el, ind) => {
        // Create variable to show the delete icon
        var deleteIcon;
        // Checking if the user who login like the post
        var checkLikes = el.likes.find((el) => {
          return el.email === this.props.postsArray.email;
        });

        // Checking if the logged user is the post creator for showing the delete btn
        if (this.props.postsArray.email === el.email) {
          deleteIcon = (
            <div
              className="post-delete-div"
              onClick={this.openDeleteDialog}
              index={ind}
            >
              <img className="post-delete-btn" src={Delete} alt="deletebtn" />
            </div>
          );
        }

        // Running checking time function
        var time = TimeChecking(el.postedTime, "Right Now...");

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
            key={ind + 1}
            imageUrl={el.imageUrl}
            fullName={el.fullName}
            displayTime={time}
            text={el.text}
            likeClick={this.likeClick}
            likeIcon={checkLikes ? LikeHeart : UnlikeHeart}
            index={ind}
            likesLength={el.likes.length}
            clickComment={this.clickComment}
            commentsImage={Comments}
            commentsLength={el.comments.length}
            showLikes={ShowLikesBox}
            whoLikes={whoLikes}
            moveToUser={this.moveToUser}
          >
            {deleteIcon}
          </SinglePost>
        );
      });
      fetchedPosts.reverse();
    }
    return (
      <div className="posts-boxes-wrapper">
        <DeleteModal cancel={this.exitDeleteModal} delete={this.deletePost} />
        <Modal establishFetch={this.savePost} />
        {fetchedPosts}
        <LoadPosts
          secondArr={this.props.postsArray.secondArr.length > 0}
          clickLoadPosts={this.loadSecondArr}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postsArray: state.PostsReducer,
    profileBoxState: state.ProfileBoxReducer,
    commentsState: state.CommentsReducer.updatedPost,
    profilePageState: state.ProfilePageReducer.updatedLikes,
    usersUpdatedLike: state.UsersReducer.updatedLike,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPosts: () => dispatch(actionTypes.loadPosts()),
    createNewPost: (postProperties) =>
      dispatch(actionTypes.createNewPost(postProperties)),
    likeOnPost: (properties) => dispatch(actionTypes.likeOnPost(properties)),
    setCommentRef: (ref) => dispatch(actionTypes.setCommentRef(ref)),
    addComment: () => dispatch(actionTypes.addComment()),
    deletePost: (properties) => dispatch(actionTypes.deletePost(properties)),
    loadSecondArr: (posts) => dispatch(actionTypes.loadSecondArr(posts)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostsBoxes));
