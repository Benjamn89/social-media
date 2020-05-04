import React from "react";
import "./no-friends-msg.css";
import AddFriend from "../../media/add-friend.png";

const NoFriends = (props) => {
  return (
    <div className="no-friends-div">
      <h1 className="no-friends-h1">
        For been able to watch {props.name}'s profile you must add her/him to
        your friends list.
      </h1>
      <img
        src={AddFriend}
        alt="add-friend-img"
        className="no-friends-img"
        onClick={props.addFriend}
      />
    </div>
  );
};

export default NoFriends;
