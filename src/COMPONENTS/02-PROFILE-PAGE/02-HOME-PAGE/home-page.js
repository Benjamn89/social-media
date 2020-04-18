import React, { Component } from "react";
import "./home-page.css";
import PostsBoxes from "./POSTS-BOXES/posts-boxes";
import ProfileBox from "./PROFILE-BOX/profile-box";

class Posts extends Component {
  state = {
    selectedFile: null,
    profileImgUrl: null,
  };

  render() {
    console.log("HomePage -> REDNER!!!");

    return (
      <section id="posts">
        <PostsBoxes />
        <ProfileBox />
      </section>
    );
  }
}
export default Posts;
