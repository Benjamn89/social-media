import React from "react";
import "./friends.css";

const Friends = (props) => {
  var removeFriends;
  if (props.removeFriends) {
    removeFriends = null;
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
        {removeFriends}
      </div>
    </div>
  );
};

export default Friends;
