import React from "react";
import "./modal-buttons.css";

const ModalButtons = (props) => {
  return (
    <div className="buttons-modal-div">
      <button onClick={props.cancelModal} className="modal-can-btn">
        Cancel
      </button>
      <button onClick={props.establishFetch} className="modal-save-btn">
        {props.ok}
      </button>
    </div>
  );
};

export default ModalButtons;
