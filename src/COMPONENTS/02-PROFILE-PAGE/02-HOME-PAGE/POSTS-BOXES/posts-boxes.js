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

  render() {
    var fetchedPosts = null;
    if (this.props.postsArray.length > 0) {
      fetchedPosts = this.props.postsArray.map((el) => {
        return (
          <div className="post-div" key={el.name}>
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
        <Modal />
        {fetchedPosts}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postsArray: state.PostsReducer.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPosts: () => dispatch(actionTypes.loadPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsBoxes);
