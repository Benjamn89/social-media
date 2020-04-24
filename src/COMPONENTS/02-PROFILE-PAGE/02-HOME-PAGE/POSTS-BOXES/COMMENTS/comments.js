import React, { Component } from "react";
import "./comments.css";
import Input from "./inputStyle";
// import media
import CommentIcon from "../../../../../media/comments.png";
import LikeIcon from "../../../../../media/heart-like.png";
import UnlikeIcno from "../../../../../media/heart-unlike.png";
// Import reducers
import { connect } from "react-redux";
import actionTypes from "../../../../../REDUCERS/02-HOME-PAGE/02-COMMENTS/actionTypes";

class Comments extends Component {
  shouldComponentUpdate(nP, nS) {
    console.log("SCP -> Comments");
    var thisProps = this.props.commentsReducer;
    if (
      nP.commentsReducer.getPost !== thisProps.getPost ||
      nP.commentsReducer.updatedPost !== thisProps.updatedPost
    ) {
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
    document.querySelector(".comments-div").focus();

    if (this.props.postRef) {
      const postIndex = this.props.postRef;
      const copyPost = JSON.parse(
        JSON.stringify(this.props.postArray[postIndex])
      );

      const proObj = {
        postIndex: this.props.postRef,
        copyPost,
      };

      this.props.getPost(proObj);
    } else {
      //Temporaray solution
      window.history.back();
    }
  }

  goBack = (e) => {
    if (e.key === "Escape" || e.target.innerHTML === "+") {
      document.body.style.overflow = "";
      window.history.back();
    }
  };

  createComment = () => {
    const inputValue = document.querySelector("#outlined-basic").value;

    if (inputValue.length > 1) {
      // Show spinner
      document.querySelector(".com-ins3-btn").classList.add("showSpinner");
      // Short cut for the profileBox reducer
      var profileBox = this.props.profileBox;

      // Create time stamp
      const now = new Date();
      const postedTime = now.getTime();

      const postIndex = this.props.postRef;
      const copyPost = JSON.parse(
        JSON.stringify(this.props.commentsReducer.copyPost)
      );
      const theComment = {
        body: inputValue,
        profileImg: profileBox.url,
        email: profileBox.email,
        fullName: profileBox.fullName,
        postedTime,
        displayTime: "Right now...",
      };
      const postRef = this.props.postArray[postIndex].ref;

      copyPost.comments.push(theComment);

      const proObj = {
        inputValue,
        postRef,
        copyPost,
      };
      this.props.postComment(proObj);
    }
  };

  likeClick = () => {
    // Short cut for the commentsReducer
    var commentsReducer = this.props.commentsReducer;
    // Shorcut logging email
    const email = this.props.profileBox.email;
    // Copy the likes array
    const copyLikesPost = JSON.parse(
      JSON.stringify(commentsReducer.copyPost.likes)
    );
    // Copy the post ref
    const ref = commentsReducer.copyPost.ref;
    // Check if email exists
    var validateEmail = copyLikesPost.find((el) => {
      return el === email;
    });

    // Run commands based on if the email exists or not
    if (validateEmail) {
      // Picking the index of the email inside the array
      var indexOfLike = copyLikesPost.indexOf(email);
      // Remove it from the array
      copyLikesPost.splice(indexOfLike, 1);
    } else {
      // Add the email to the likes arrag
      copyLikesPost.push(email);
    }
    // Creating the object property to be forwarded
    const objPro = {
      likesArray: copyLikesPost,
      ref,
    };

    // Sending the action
    this.props.likeClick(objPro);
  };

  render() {
    if (this.props.commentsReducer.postIndex) {
      // Initial Variables
      var renderPost, commentsArray, renderComments, checkLikes;
      var postRef = this.props.commentsReducer.copyPost;
      // ShortCut to the comments array
      commentsArray = this.props.commentsReducer.copyPost.comments;
      //Render the comments with map
      if (commentsArray.length > 0) {
        renderComments = commentsArray.map((el, ind) => {
          // Running time ckecing to be displayed
          const now = new Date();
          const time = now.getTime();
          var newTime = time - el.postedTime;

          if (newTime < 5000) {
            newTime = "Right now...";
          }
          if (newTime < 59000) {
            newTime = `Few sec ago`;
          }
          if (newTime > 59000 && newTime < 3540000) {
            newTime = `Few min ago`;
          }
          if (newTime > 3540000 && newTime < 86400000) {
            newTime = `Few hours ago`;
          }
          if (newTime > 86400000) {
            let timePast = Math.floor(newTime / 86400000);
            newTime = `${timePast} days ago`;
          }

          return (
            <div className="comments-inside4-div" key={ind}>
              <img src={el.profileImg} alt="testImg" />
              <div className="com-ins4-inside">
                <h1 className="ins2-inside-h1 ins4-h1">{el.fullName}</h1>
                <p className="ins2-inside-time">{newTime}</p>
                <p className="ins2-inside-body ins4-body">{el.body}</p>
              </div>
            </div>
          );
        });
        // Reading the array from the latest by revese the array
        renderComments.reverse();
      }
      // Check the likes array
      checkLikes = postRef.likes.find((el) => {
        return el === this.props.profileBox.email;
      });

      // Render the single post
      renderPost = (
        <div className="comments-inside-div">
          <div className="comments-inside2-div">
            <img
              className="com-ins2-img"
              src={postRef.imageUrl}
              alt="testImg"
            />
            <div className="com-ins2-inside">
              <div className="wrap-x-button">
                <span onClick={this.goBack} className="x-button">
                  +
                </span>
              </div>
              <h1 className="ins2-inside-h1">{postRef.fullName}</h1>
              <p className="ins2-inside-time">{postRef.displayTime}</p>
              <p className="ins2-inside-body">{postRef.text}</p>
              <div>
                <div className="com-wrap-icon c-w-i-div">
                  <img
                    onClick={this.likeClick}
                    className="com-wrap-icon-img c-w-i-i"
                    src={checkLikes ? LikeIcon : UnlikeIcno}
                    alt="com-unlike"
                  />
                </div>
                <p className="com-ins2-icon-p">Likes {postRef.likes.length}</p>
                <div className="com-wrap-icon">
                  <img
                    className="com-wrap-icon-img"
                    src={CommentIcon}
                    alt="com-com"
                  />
                </div>
                <p className="com-ins2-icon-p">
                  Comments {postRef.comments.length}
                </p>
              </div>
            </div>
          </div>
          <div className="comments-inside3-div">
            <Input />
            <button onClick={this.createComment} className="com-ins3-btn">
              SUBMIT
            </button>
          </div>
          {renderComments}
        </div>
      );
    }

    console.log("Comments -> REDNER!!!");
    return (
      <div className="comments-div" tabIndex="0" onKeyDown={this.goBack}>
        {renderPost}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    commentsReducer: state.CommentsReducer,
    postRef: state.PostsReducer.commentsRef,
    postArray: state.PostsReducer.posts,
    profileBox: state.ProfileBoxReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (properties) => dispatch(actionTypes.getPost(properties)),
    postComment: (properties) => dispatch(actionTypes.postComment(properties)),
    likeClick: (properties) => dispatch(actionTypes.likeClick(properties)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
