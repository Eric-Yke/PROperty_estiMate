import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // 引入 Link
import "./NavBar.css";
import logoImage from "../../../src/images/logowithouttext.PNG"; // 导入 logo 图片
import {
  AiOutlineUser,
  AiOutlineStar,
  AiOutlineBell,
  // AiOutlineSwap,
} from "react-icons/ai";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const storedUserName = localStorage.getItem("user_name");

    if (userId) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  const handleLogoutClick = (event) => {
    event.preventDefault();
    const confirmation = window.confirm("Are you sure you want to log out?");

    if (confirmation) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      window.location.href = "/";
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-section">
        <Link to="/">
          <img src={logoImage} alt="LOGO" className="logo-img" />
        </Link>

        <div className="location" style={{ fontSize: 20 }}>
          PRO estiMate
        </div>
      </div>

      <div className="navbar-section">
        <Link to="/notification">
          <AiOutlineBell className="icon-my" size={28} />
          <div className="icon-my-text">Notification</div>
        </Link>

        {isLoggedIn && (
          <Link to="/collections">
            <AiOutlineStar className="icon-my" size={28} />
            <div className="icon-my-text">Collections</div>
          </Link>
        )}

        {isLoggedIn ? (
          <Link>
            <div className="icon-my" onClick={handleLogoutClick}>
              <AiOutlineUser className="icon-my" size={28} />
              <div className="icon-my-text">{userName}</div>
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <AiOutlineUser className="icon-my" size={28} />
            <div className="icon-my-text">My Account</div>
          </Link>
        )}
      </div>
    </nav>
  );
}
