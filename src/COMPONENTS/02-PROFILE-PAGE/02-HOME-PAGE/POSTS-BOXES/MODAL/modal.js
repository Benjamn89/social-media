import React, { Component } from "react";
import "./modal.css";
import Input from "../../PROFILE-BOX/MODAL/inputs";
import ModalButtons from "../../PROFILE-BOX/MODAL/buttons";

class Modal extends Component {
  shouldComponentUpdate() {
    return false;
  }

  cancelModal = () => {
    document.querySelector(".posts-modal").style.display = "none";
  };
  render() {
    return (
      <div className="posts-modal">
        <div className="posts-modal-inside">
          <h1 className="pos-mod-h1">Publish New Post</h1>
          <Input title="Share Something..." />
          <ModalButtons ok="Share!" cancelModal={this.cancelModal} />
        </div>
      </div>
    );
  }
}

export default Modal;
