// components/NavBar/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';  // 引入 Link
import './NavBar.css';
import logoImage from '/Users/cei/newFolder/PROperty_estiMate/src/images/logowithouttext.PNG';  // 导入 logo 图片


const NavBar = () => (
  <nav className="navbar">
    <div className="navbar-section">
      {/* <div className="logo">LOGO</div> */}
      <img src={logoImage} alt="LOGO" className="logo-img" />
      <div className="location">Wollongong</div>
    </div>
    <div className="navbar-section">
      <Link to="/search">search</Link>
      <Link to="/news">news</Link>
      <Link to="/community">community</Link>
      <Link to="/setting">setting</Link>
    </div>
    <div className="navbar-section">
      <Link to="/notification">notification</Link>
      <Link to="/collections">collections</Link>
      <Link to="/login">my account</Link>
    </div>
  </nav>
);

export default NavBar;













// import React from 'react';
// import './NavBar.css';

// const NavBar = () => (
//   <nav className="navbar">
//     <div className="navbar-section">
//       <div className="logo">LOGO</div>
//       <div className="location">Wollongong</div>
//     </div>
//     <div className="navbar-section">
//       <a href="#">search</a>
//       <a href="#">news</a>
//       <a href="#">community</a>
//       <a href="#">setting</a>
//     </div>
//     <div className="navbar-section">
//       <a href="#">notification</a>
//       <a href="#">collections</a>
//       <a href="#">my account</a>
//     </div>
//   </nav>
// );

// export default NavBar;
