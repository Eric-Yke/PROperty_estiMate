import React from "react";
// import "../../App.css";
import "./Footer.css";
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin } from "react-icons/fi";
import { Link, useParams, useLocation } from "react-router-dom"; // 注意这里导入了 useLocation

const Footer = () => {
  const location = useLocation(); // 使用 useLocation 钩子获取当前页面信息
  const { postCode, propertyLocality, houseNumberAndStreet } = useParams();
  let text, currentUrl;

  // 根据当前页面的路径动态设置分享文本和链接
  if (location.pathname.startsWith("/propertyResult")) {
    const address = `${houseNumberAndStreet.replace(
      /-/g,
      " "
    )}, ${propertyLocality}, NSW ${postCode}`;
    text = `Check out the property prediction for ${address}!`;
  } else {
    text = "Check out PRO estiMate!";
  }

  currentUrl = window.location.href;

  // 分享到 Twitter
  const shareToTwitter = () => {
    const imageUrl = `${window.location.origin}/images/logo.png`; // 这里是你的图片 URL

    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterURL, "_blank");
  };

  // 分享到 Facebook
  const shareToFacebook = () => {
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}&quote=${encodeURIComponent(text)}`;
    window.open(facebookURL, "_blank");
  };

  // 分享到 LinkedIn
  const shareToLinkedIn = () => {
    const linkedInURL = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      currentUrl
    )}&title=${encodeURIComponent(text)}&summary=${encodeURIComponent(
      text
    )}&source=${encodeURIComponent("YourAppName")}`;
    window.open(linkedInURL, "_blank");
  };

  // 跳转到 Instagram（Instagram 不支持直接从 web 分享）
  const goToInstagram = () => {
    alert(
      "Instagram does not support direct sharing from the web. Please use the Instagram app for sharing."
    );
  };

  return (
    <div className="footer">
      <div className="footer-section1">
        <Link className="logo" to="/">
          PRO estiMate
        </Link>
        <a href="#">Help</a>
        <a href="#">Connect</a>
        <a href="#">About</a>
        <a href="#">Mobile</a>
        <a href="#">Privacy</a>
      </div>
      <div className="footer-section2">
        <a href="#" onClick={goToInstagram}>
          <FiInstagram className="icon" />
        </a>
        <a href="#" onClick={shareToFacebook}>
          <FiFacebook className="icon" />
        </a>
        <a href="#" onClick={shareToTwitter}>
          <FiTwitter className="icon" />
        </a>
        <a href="#" onClick={shareToLinkedIn}>
          <FiLinkedin className="icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
