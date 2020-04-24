import React from "react";
import "./delete-modal.css";

const cancel = (e) => {
  if (e.key === "Escape" || e.target.innerHTML === "Cancel") {
    document.querySelector(".delete-modal-div").style.display = "none";
  }
};

const DeleteModal = (props) => {
  console.log("DeleteModal -> RENDER");
  return (
    <div className="delete-modal-div" tabIndex="0" onKeyDown={cancel}>
      <div className="delete-modal-inside-div">
        <p className="delete-modal-p">
          Are you sure you want to delete this post ?
        </p>
        <div className="delete-btn-div">
          <button className="delete-btn1" onClick={cancel}>
            Cancel
          </button>
          <button className="delete-btn2" onClick={props.delete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
