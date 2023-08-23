// components/NavBar/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';  // 引入 Link
import './NavBar.css';
import logoImage from '../../../src/images/logowithouttext.PNG';  // 导入 logo 图片
import { AiOutlineUser, AiOutlineStar, AiOutlineBell, AiOutlineSwap } from "react-icons/ai";

const NavBar = () => (
  <nav className="navbar">
    <div className="navbar-section">
      <Link to="/">
        <img src={logoImage} alt="LOGO" className="logo-img" />
      </Link>

      <div className="location" style={{ fontSize: 20 }}>Wollongong</div>
      <AiOutlineSwap className="icon-my" size={22} color={'#f1713a'} />
    </div>

    <div className="navbar-section">
      <Link to="/notification">
        <AiOutlineBell className="icon-my" size={28} />
        <div className="icon-my-text">Notification</div>
      </Link>
      <Link to="/collections">
        <AiOutlineStar className="icon-my" size={28} />
        <div className="icon-my-text">Collections</div>
      </Link>
      <Link to="/login">
        <AiOutlineUser className="icon-my" size={28} />
        <div className="icon-my-text">My Account</div>
      </Link>
    </div>
  </nav>
);

export default NavBar;
