import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  console.log(currentUser);
  const logout = (e) => {
    e.preventDefault();
    // AuthReducerへ
    dispatch({ type: "LOGOUT" });
    
    navigate("/login");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" className="linkname">
            <span className="logo">OJT_PAGE</span>
          </Link>
        </div>
        <div className="topRight">
          {currentUser && (
            <Link to="/chart" className="topbarIconContainer">
              <span>KPI_MONITORING</span>
            </Link>
          )}
        

          {/* ログインしている時だけ表示 */}
          {currentUser && (
            <div className="topbarIconContainer">
              <Link to="/login" onClick={logout} className="linkname">
                <span>LOGOUT</span>
              </Link>
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
