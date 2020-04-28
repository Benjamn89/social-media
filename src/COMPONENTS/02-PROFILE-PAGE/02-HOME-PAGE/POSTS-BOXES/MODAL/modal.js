import React, { Component } from "react";
import "./modal.css";
import Input from "../../PROFILE-BOX/MODAL/inputs";
import ModalButtons from "../../PROFILE-BOX/MODAL/buttons";

class Modal extends Component {
  shouldComponentUpdate() {
    return false;
  }

  cancelModal = (e) => {
    if (e.type === "keydown" && e.key === "Escape") {
      document.querySelector(".posts-modal").style.display = "none";
    }
    if (
      e.target.innerHTML === "Cancel" ||
      (e.target.className === "posts-modal" && e.type === "click")
    ) {
      document.querySelector(".posts-modal").style.display = "none";
    }
  };
  render() {
    return (
      <div
        className="posts-modal"
        tabIndex="0"
        onKeyDown={this.cancelModal}
        onClick={this.cancelModal}
      >
        <div className="posts-modal-inside">
          <h1 className="pos-mod-h1">Publish New Post</h1>
          <Input title="Share Something..." />
          <ModalButtons
            ok="Share!"
            cancelModal={this.cancelModal}
            establishFetch={this.props.establishFetch}
          />
        </div>
      </div>
    );
  }
}

export default Modal;
