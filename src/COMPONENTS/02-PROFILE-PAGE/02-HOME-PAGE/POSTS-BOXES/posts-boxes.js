import React, { Component } from "react";
import "./posts-boxes.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import actionTypes from "../../../../REDUCERS/02-HOME-PAGE/00-POSTS-BOX/actionTypes";
// Import modals
import DeleteModal from "./DELETE-MODAL/delete-modal";
import Modal from "./MODAL/modal";
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
    } else if (nP.commentsState !== this.props.commentsState) {
      this.props.loadPosts();
      return false;
    } else {
      return false;
    }
  }

  savePost = (e) => {
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
      // Remove Modal
      document.querySelector(".posts-modal").style.display = "none";
      // Clean input value
      document.querySelectorAll("#standard-basic")[0].value = "";
      // Load spinner
      document
        .querySelector(".posts-boxes-wrapper")
        .classList.add("showSpinner");
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
    var id = e.target.getAttribute("index");
    this.props.setCommentRef(id);
    document.body.style.overflow = "hidden";
  };

  openDeleteDialog = (e) => {
    //Saving the post index in the global variable
    postIndex = e.target.getAttribute("index");

    document.querySelector(".delete-modal-div").style.display = "flex";
    document.querySelector(".delete-modal-div").focus();
  };

  deletePost = (e) => {
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

  render() {
    var fetchedPosts = null;

    if (this.props.postsArray.posts.length > 0) {
      fetchedPosts = this.props.postsArray.posts.map((el, ind) => {
        // Create variable to show the delete icon
        var deleteIcon;
        // Checking if the user who login like this post or not to change the the like icon
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

        return (
          <div className="post-div" key={ind + 1}>
            {deleteIcon}
            <img className="post-div-img" src={el.imageUrl} alt="tmppfoimg" />
            <div className="inside-single-div">
              <p className="in-sin-p1">{el.fullName}</p>
              <p className="in-sin-p2">{el.displayTime}</p>
              <p className="in-sin-p3">{el.text}</p>
              <div className="in-sin-div-features">
                <div className="wrap-feat-icon-div">
                  <img
                    onClick={this.likeClick}
                    src={checkLikes ? LikeHeart : UnlikeHeart}
                    alt="unlike"
                    index={ind}
                  />
                </div>
                <p className="in-feat-p">likes {el.likes.length}</p>
                <div className="wrap-feat-icon-div wrap-like-spe">
                  <Link onClick={this.clickComment} to="leaveComment">
                    <img
                      className="f-i-d-i2"
                      src={Comments}
                      alt="comments"
                      index={ind}
                    />
                  </Link>
                </div>
                <p className="in-feat-p2">
                  comments <span>{el.comments.length}</span>
                </p>
              </div>
            </div>
          </div>
        );
      });
      fetchedPosts.reverse();
    }

    console.log("PostsBoxes -> REDNER!!!");
    return (
      <div className="posts-boxes-wrapper">
        <DeleteModal delete={this.deletePost} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PostsBoxes);
