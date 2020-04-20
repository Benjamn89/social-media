import React, { Component } from "react";
import "./posts-boxes.css";
import { connect } from "react-redux";
import actionTypes from "../../../../REDUCERS/02-HOME-PAGE/00-POSTS-BOX/actionTypes";
// import TmpProfileImg from "../../../../media/profile.png";
import Modal from "./MODAL/modal";

class PostsBoxes extends Component {
  componentDidMount() {
    this.props.loadPosts();
  }

  shouldComponentUpdate(nP, nS) {
    if (nP.postsArray.changePost !== this.props.postsArray.changePost) {
      return true;
    } else {
      return false;
    }
  }

  savePost = (e) => {
    const text = document.querySelectorAll("#standard-basic")[0].value;
    if (text.length > 0) {
      const obj = { ...this.props.profileBoxState };
      const state = this.props.postsArray.posts;
      const now = new Date();
      const time = now.getTime();
      const moveOnProperties = {
        text,
        email: obj.email,
        fullName: obj.fullName,
        url: obj.url,
        likes: 0,
        comments: 0,
        state,
        time,
      };
      // Remove Modal
      document.querySelector(".posts-modal").style.display = "none";
      // Load spinner
      document
        .querySelector(".posts-boxes-wrapper")
        .classList.add("showSpinner");
      this.props.createNewPost(moveOnProperties);
    }
  };

  render() {
    var fetchedPosts = null;
    if (this.props.postsArray.posts.length > 0) {
      fetchedPosts = this.props.postsArray.posts.map((el) => {
        return (
          <div className="post-div" key={el.text}>
            <img src={el.imageUrl} alt="tmppfoimg" />
            <div className="inside-single-div">
              <p className="in-sin-p1">{el.fullName}</p>
              <p className="in-sin-p2">{el.timeNow}</p>
              <p className="in-sin-p3">{el.text}</p>
              <div className="in-sin-div-features">
                <p className="in-feat-p">likes {el.likes}</p>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsBoxes);
