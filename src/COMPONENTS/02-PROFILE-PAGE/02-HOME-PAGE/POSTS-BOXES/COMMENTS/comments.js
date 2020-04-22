import React, { Component } from "react";
import "./comments.css";
import testImage from "../../../../../media/binyamin.png";
import Input from "./inputStyle";
// import media
import CommentIcon from "../../../../../media/comments.png";
import LikeIcon from "../../../../../media/heart-like.png";
import UnlikeIcno from "../../../../../media/heart-unlike.png";
// Import reducers
import { connect } from "react-redux";
import actionTypes from "../../../../../REDUCERS/02-HOME-PAGE/02-COMMENTS/actionTypes";

class Comments extends Component {
  componentDidMount() {
    document.querySelector(".comments-div").focus();

    if (this.props.postRef) {
      const postIndex = this.props.postRef;
      const proObj = {
        postIndex: this.props.postRef,
        commentsArray: JSON.parse(
          JSON.stringify(this.props.postArray[postIndex].comments)
        ),
      };

      this.props.getPost(proObj);
    }
  }

  goBack = (e) => {
    if (e.key === "Escape" || e.target.innerHTML === "+") {
      window.history.back();
    }
  };

  createComment = () => {
    const inputValue = document.querySelector("#outlined-basic").value;

    if (inputValue.length > 1) {
      const postIndex = this.props.postRef;
      const copyComments = JSON.parse(
        JSON.stringify(this.props.commentsReducer.commentsArray)
      );
      const postRef = this.props.postArray[postIndex].ref;

      copyComments.push(inputValue);

      const proObj = {
        inputValue,
        postRef,
        copyComments,
      };
      this.props.postComment(proObj);
    }
  };

  render() {
    var renderPost;
    var commentsArray = this.props.commentsReducer.commentsArray;
    var renderComments;

    if (this.props.commentsReducer.postIndex) {
      var postRef = this.props.postArray[this.props.commentsReducer.postIndex];

      if (commentsArray.length > 0) {
        renderComments = commentsArray.map((el, ind) => {
          return (
            <div className="comments-inside4-div" key={ind}>
              <img src={postRef.imageUrl} alt="testImg" />
              <div className="com-ins4-inside">
                <h1 className="ins2-inside-h1 ins4-h1">{postRef.fullName}</h1>
                <p className="ins2-inside-time">Time was posted</p>
                <p className="ins2-inside-body ins4-body">{el}</p>
              </div>
            </div>
          );
        });
      }

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
                <div className="com-wrap-icon">
                  <img src={UnlikeIcno} alt="com-unlike" />
                </div>
                <p className="com-ins2-icon-p">Likes {postRef.likes.length}</p>
                <div className="com-wrap-icon">
                  <img src={CommentIcon} alt="com-com" />
                </div>
                <p className="com-ins2-icon-p">
                  Comments {commentsArray.length}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (properties) => dispatch(actionTypes.getPost(properties)),
    postComment: (properties) => dispatch(actionTypes.postComment(properties)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
