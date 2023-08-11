import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section">
        <span className="logo">PRO estiMate</span>
        <a href="#">Help</a>
        <a href="#">Connect</a>
        <a href="#">About</a>
        <a href="#">Mobile</a>
        <a href="#">Privacy</a>
      </div>
      <div className="footer-section">
        <a href="#">WhatsApp</a>
        <a href="#">Twitter</a>
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
      </div>
    </div>
  );
};

export default Footer;
