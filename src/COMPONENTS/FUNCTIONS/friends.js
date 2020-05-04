import React from "react";
import "./friends.css";

const Friends = (props) => {
  var removeFriends;
  if (props.removeFriends) {
    removeFriends = (
      <div
        onClick={props.removeFriendBtn}
        className="friends-x-btn-div"
        index={props.index}
      >
        <div className="friends-i-1"></div>
        <div className="friends-i-2"></div>
      </div>
    );
  }
  return (
    <div className="friends-div">
      <div className="friends-inside-d">
        <img src={props.imgUrl} alt="friendsImg" className="friends-image" />
        <p className="friends-p">{props.fullName}</p>
        <button
          className="friends-btn friends-btn-hover"
          onClick={props.moveToUser}
          index={props.index}
        >
          View Profile
        </button>
      </div>
      {removeFriends}
    </div>
  );
};

export default Friends;
