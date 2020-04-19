import React from "react";
import "./navbar.css";
import NavLogo from "../../../media/sted.png";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  console.log("Navba -> RENDER!!!");

  const openModal = (e) => {
    document.querySelector(".posts-modal").style.display = "flex";
  };
  return (
    <nav>
      <img src={NavLogo} alt="nav-img" />
      <div className="nav-inside-div">
        <p onClick={openModal} className="nav-inside-p nav-p3">
          +
        </p>
        <Link className="nav-inside-p" to="profile">
          <p className="nav-inside-p nav-p1">Profile</p>
        </Link>

        <p className="nav-inside-p nav-p2" onClick={props.signOut}>
          SignOut
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
