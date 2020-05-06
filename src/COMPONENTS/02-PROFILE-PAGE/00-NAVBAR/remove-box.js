import React from "react";
import "./remove.css";

const RemoveAccount = (props) => {
  return (
    <div
      className="remove-account-div"
      onKeyDown={props.cancelRemove}
      tabIndex="0"
    >
      <div className="remove-inside-div">
        <div className="remove-wrap-h1-div">
          <h1 className="remove-inside-h1">
            By clicking <span>'Remove'</span> you will delete
          </h1>
          <h1 className="remove-inside-h1">your profile from Sted</h1>
        </div>
        <div className="remove-inside-btn-div">
          <button className="remove-inside-btn1" onClick={props.cancelRemove}>
            Cancel
          </button>
          <button className="remove-inside-btn2" onClick={props.removeProfile}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveAccount;
