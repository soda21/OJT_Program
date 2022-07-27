import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">OJTPAGE</span>
        </div>
        <div className="topRight">
          <Link to="/users" className="topbarIconContainer">
            <span>USERLIST</span>
          </Link>
          {/* <Link to="/ABOUT" className="topbarIconContainer">
            <span>LOGOUT</span>
          </Link> */}

          {/* ログインしている時だけ表示 */}
          {currentUser && (
            <div className="topbarIconContainer">
              <span>LOGOUT</span>
            </div>
          )}

          <div className="topbarIconContainer"></div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
