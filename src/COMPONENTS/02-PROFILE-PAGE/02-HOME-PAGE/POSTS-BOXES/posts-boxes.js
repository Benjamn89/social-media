import React, { Component } from "react";
import "./posts-boxes.css";
import { connect } from "react-redux";
import actionTypes from "../../../../REDUCERS/02-HOME-PAGE/00-POSTS-BOX/actionTypes";
import TmpProfileImg from "../../../../media/profile.png";
import Modal from "./MODAL/modal";

class PostsBoxes extends Component {
  componentDidMount() {
    this.props.loadPosts();
  }

  shouldComponentUpdate(nP, nS) {
    console.log(nP.postsArray);
    console.log(this.props.postsArray);
    if (nP.postsArray !== this.props.postsArray) {
      return true;
    } else {
      return false;
    }
  }

  savePost = (e) => {
    const text = document.querySelectorAll("#standard-basic")[0].value;
    const obj = this.props.profileBoxState;
    const state = this.props.postsArray;
    const moveOnProperties = {
      text,
      email: obj.email,
      name: obj.privateName,
      url: obj.url,
      likes: 0,
      comments: 0,
      state,
    };
    this.props.createNewPost(moveOnProperties);
  };

  render() {
    var fetchedPosts = null;
    if (this.props.postsArray.length > 0) {
      fetchedPosts = this.props.postsArray.map((el) => {
        return (
          <div className="post-div" key={el.text}>
            <img src={TmpProfileImg} alt="tmppfoimg" />
            <div className="inside-single-div">
              <p className="in-sin-p1">{el.name}</p>
              <p className="in-sin-p2">{el.time}</p>
              <p className="in-sin-p3">{el.text}</p>
              <div className="in-sin-div-features">
                <p className="in-feat-p">likes {el.likes}</p>
                <p className="in-feat-p2">comments {el.comments}</p>
              </div>
            </div>
          </div>
        );
      });
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
    postsArray: state.PostsReducer.posts,
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
