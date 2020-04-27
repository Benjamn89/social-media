import React, { Component } from "react";
import "./comments.css";
// Import Modal(Styles)
import Input from "./inputStyle";
// Import Functions
import TimeChecking from "../../../../FUNCTIONS/time-checking";
// import media
import CommentIcon from "../../../../../media/comments.png";
import LikeIcon from "../../../../../media/heart-like.png";
import UnlikeIcno from "../../../../../media/heart-unlike.png";
import Delete from "../../../../../media/delete.png";
// Import reducers
import { connect } from "react-redux";
import actionTypes from "../../../../../REDUCERS/02-HOME-PAGE/02-COMMENTS/actionTypes";

class Comments extends Component {
  state = {
    render: false,
  };

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
      this.setState({
        render: !this.state.render,
      });
    }
  }

  goBack = (e) => {
    if (
      e.key === "Escape" ||
      e.target.innerHTML === "+" ||
      e.target.className === "comments-div"
    ) {
      document.body.style.overflow = "";
      this.props.history.push("/");
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
      // Add the email to the likes array
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

  openDeleteDialog = (e) => {
    if (e.target.className === "post-delete-div") {
      e.target.children[1].classList.toggle("test-delete");
    } else {
      // Show spinner
      document
        .querySelector(".comments-inside4-div")
        .classList.add("deleteCommentSpinner");
      // Save the comment index
      var commentIndex = e.target.getAttribute("index");
      // Make a copy of the comments array
      var commentsArray = JSON.parse(
        JSON.stringify(this.props.commentsReducer.copyPost.comments)
      );
      // Remove the index array from the copy of the comments aray
      commentsArray.splice(commentIndex, 1);

      //Make an object to forward to actionTypes
      var objPro = {
        commentsArray,
        ref: this.props.commentsReducer.copyPost.ref,
      };
      // Send the action type
      this.props.deleteCommentRequest(objPro);
    }
  };

  render() {
    if (this.props.commentsReducer.postIndex) {
      // Initial Variables
      var renderPost, commentsArray, renderComments, checkLikes, deleteIcon;
      var postRef = this.props.commentsReducer.copyPost;
      // ShortCut to the comments array
      commentsArray = this.props.commentsReducer.copyPost.comments;
      //Render the comments with map
      if (commentsArray.length > 0) {
        renderComments = commentsArray.map((el, ind) => {
          // Running checking time to be displayed
          var time = TimeChecking(el.postedTime, "Right Now...");

          // Ckecing if the login user in each comment and display the delete icon addrdnly
          if (el.email === this.props.profileBox.email) {
            deleteIcon = (
              <div
                className="post-delete-div"
                onClick={this.openDeleteDialog}
                index={ind}
              >
                <img className="post-delete-btn" src={Delete} alt="deletebtn" />
                <div index={ind} className="popup-delete">
                  You Sure?
                </div>
              </div>
            );
          } else {
            deleteIcon = null;
          }

          return (
            <div className="comments-inside4-div" key={ind}>
              {deleteIcon}
              <img src={el.profileImg} alt="testImg" />
              <div className="com-ins4-inside">
                <h1 className="ins2-inside-h1 ins4-h1">{el.fullName}</h1>
                <p className="ins2-inside-time">{time}</p>
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

      // Check the displayed time on the titled post
      var postTime = TimeChecking(postRef.postedTime, "value");

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
                <span className="x-button">+</span>
              </div>
              <h1 className="ins2-inside-h1">{postRef.fullName}</h1>
              <p className="ins2-inside-time">{postTime}</p>
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
                <p className="com-ins2-icon-p">{postRef.likes.length} Likes</p>
                <div className="com-wrap-icon">
                  <img
                    className="com-wrap-icon-img"
                    src={CommentIcon}
                    alt="com-com"
                  />
                </div>
                <p className="com-ins2-icon-p">
                  {postRef.comments.length} Comments
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
      <div
        className="comments-div"
        tabIndex="0"
        onKeyDown={this.goBack}
        onClick={this.goBack}
      >
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
    deleteCommentRequest: (properties) =>
      dispatch(actionTypes.deleteCommentRequest(properties)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
