import React from "react";
import "./navbar.css";
import NavLogo from "../../../media/sted.png";

const Navbar = (props) => {
  console.log("Navba -> RENDER!!!");
  return (
    <nav>
      <img src={NavLogo} alt="nav-img" />
      <div className="nav-inside-div">
        <p className="nav-inside-p">Profile</p>
        <p className="nav-inside-p nav-p2" onClick={props.signOut}>
          SignOut
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
