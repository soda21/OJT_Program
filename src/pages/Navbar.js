
import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
 
  return (
    <div className="navbar">
      <Link to="/">  GotoTOP </Link>


      <div className="navbar__login">
      <Link to="/">  Logout </Link>      
      </div>
      {/* <div className="navbar__login">
      <Link to="/">  LogIn </Link>      
      </div> */}
    </div>
  );
};

export default Navbar;
