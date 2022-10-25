import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FiLogOut } from "react-icons/fi";
import YellowBell from "../img/YellowBell.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">
        Text-Ting{" "}
        <img
          src={YellowBell}
          alt=""
          style={{ height: "30px", width: "30px", paddingLeft: "3px" }}
        />
      </span>
      <div className="user">
        <FiLogOut
          className="logout-icon"
          onClick={() => signOut(auth)}></FiLogOut>
      </div>
    </div>
  );
};

export default Navbar;
