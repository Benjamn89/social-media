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
      nP.profilePageState !== this.props.profilePageState
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
    var id = e.target.getAttribute("index");
    var email = this.props.profileBoxState.email;
    var copyPosts = JSON.parse(JSON.stringify(this.props.postsArray));
    var post = copyPosts.posts[id];

    var validateEmail = post.likes.find((el) => {
      return el === email;
    });

    if (validateEmail) {
      var indexOfLike = post.likes.indexOf(email);
      copyPosts.posts[id].likes.splice(indexOfLike, 1);
    } else {
      copyPosts.posts[id].likes.push(email);
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
          return el === this.props.postsArray.email;
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
            <p key={userInd}>
              {userInd + 1}. {user}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostsBoxes));
