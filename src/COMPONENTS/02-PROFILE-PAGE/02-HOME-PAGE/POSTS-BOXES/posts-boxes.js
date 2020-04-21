import React, { Component } from "react";
import "./posts-boxes.css";
import { connect } from "react-redux";
import actionTypes from "../../../../REDUCERS/02-HOME-PAGE/00-POSTS-BOX/actionTypes";
// import TmpProfileImg from "../../../../media/profile.png";
import Modal from "./MODAL/modal";
// Import Media
import UnlikeHeart from "../../../../media/heart-unlike.png";
import LikeHeart from "../../../../media/heart-like.png";
import Comments from "../../../../media/comments.png";

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
    var indexOfLike = post.likes.indexOf(email);

    var validateEmail = post.likes.find((el) => {
      return el === email;
    });

    if (validateEmail) {
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

  render() {
    var fetchedPosts = null;
    // var likeIcon;
    if (this.props.postsArray.posts.length > 0) {
      fetchedPosts = this.props.postsArray.posts.map((el, ind) => {
        // Checking if the user who login like this post or not to change the the like icon
        var checkLikes = el.likes.find((el) => {
          return el === this.props.postsArray.email;
        });

        return (
          <div className="post-div" key={ind + 1}>
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
                <div className="wrap-feat-icon-div">
                  <img src={Comments} alt="comments" />
                </div>
                <p className="in-feat-p2">comments {el.comments}</p>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPosts: () => dispatch(actionTypes.loadPosts()),
    createNewPost: (postProperties) =>
      dispatch(actionTypes.createNewPost(postProperties)),
    likeOnPost: (properties) => dispatch(actionTypes.likeOnPost(properties)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsBoxes);
