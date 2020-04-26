import React, { Component } from "react";
import "./modal.css";
import Inputs from "./inputs";
import ModalButtons from "./buttons";

class Modal extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div
        onKeyDown={this.props.cancelModal}
        className="modal"
        tabIndex="0"
        onClick={this.props.cancelModal}
      >
        <div className="inside-modal">
          <h1 className="inside-modal-h1">Update Your Details</h1>
          <Inputs title="Your Location" />
          <Inputs title="Website" />
          <ModalButtons
            ok="Save!"
            cancelModal={this.props.cancelModal}
            establishFetch={this.props.establishFetch}
          />
        </div>
      </div>
    );
  }
}

export default Modal;
