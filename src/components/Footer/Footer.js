import React from 'react';
import './Footer.css';
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section1">
        <span className="logo">PRO estiMate</span>
        <a href="#">Help</a>
        <a href="#">Connect</a>
        <a href="#">About</a>
        <a href="#">Mobile</a>
        <a href="#">Privacy</a>
      </div>
      <div className="footer-section2">
        <a href="#">
          <FiInstagram className="icon" />
        </a>
        <a href="#">
          <FiFacebook className="icon" />
        </a>
        <a href="#">
          <FiTwitter className="icon" />
        </a>
        <a href="#">
          <FiLinkedin className="icon" />
        </a>
      </div>

    </div>
  );
};

export default Footer;
