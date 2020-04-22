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
    var postIndex = this.props.postRef;
    this.props.getPost(postIndex);
  }

  goBack = (e) => {
    if (e.key === "Escape" || e.target.innerHTML === "+") {
      window.history.back();
    }
  };

  render() {
    var renderPost;
    console.log(this.props.commentsReducer.getPost);
    if (this.props.commentsReducer.getPost) {
      var postRef = this.props.postArray[this.props.commentsReducer.postIndex];

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
                  Comments {postRef.comments.length}
                </p>
              </div>
            </div>
          </div>
          <div className="comments-inside3-div">
            <Input />
            <button className="com-ins3-btn">SUBMIT</button>
          </div>
          <div className="comments-inside2-div com-ins4-div">
            <img src={testImage} alt="testImg" />
            <div className="com-ins2-inside">
              <h1 className="ins2-inside-h1 ins4-h1">Binyamin Tal</h1>
              <p className="ins2-inside-time">Time was posted</p>
              <p className="ins2-inside-body ins4-body">
                The actual msg can be long very long, very very long The actual
                msg can be long very long, very very long msg can be long very
              </p>
            </div>
          </div>
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
    getPost: (id) => dispatch(actionTypes.getPost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
