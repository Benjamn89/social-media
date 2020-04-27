import React from "react";

const SinglePost = (props) => {
  console.log("SinglePost -> RENDER!!!");
  return (
    <div className="post-div">
      {props.children}
      <img className="post-div-img" src={props.imageUrl} alt="tmppfoimg" />
      <div className="inside-single-div">
        <p className="in-sin-p1">{props.fullName}</p>
        <p className="in-sin-p2">{props.displayTime}</p>
        <p className="in-sin-p3">{props.text}</p>
        <div className="in-sin-div-features">
          <div className="wrap-feat-icon-div">
            <img
              onClick={props.likeClick}
              src={props.likeIcon}
              alt="unlike"
              index={props.index}
            />
          </div>
          <p className="in-feat-p">{props.likesLength} likes</p>
          <div className="wrap-feat-icon-div wrap-like-spe">
            <img
              onClick={props.clickComment}
              className="f-i-d-i2"
              src={props.commentsImage}
              alt="comments"
              index={props.index}
            />
          </div>
          <p
            className="in-feat-p2"
            onClick={props.clickComment}
            index={props.index}
          >
            <span>{props.commentsLength}</span> comments
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
