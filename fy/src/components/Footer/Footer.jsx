import react from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img onClick={() => navigate("/")} src={assets.flower_logo2} alt="" />
          <p>
            Brightening your celebrations with stunning balloon and floral
            designs. Explore our creations and make every moment special.
          </p>
          <div className="footer-social-icons">
            <Link to="https://facebook.com" target="_blank">
              <img src={assets.facebook2} alt="" />
            </Link>
            <Link to="https://facebook.com" target="_blank">
              <img src={assets.messenger} alt="" />
            </Link>
            <Link to="https://wa.me/+233544684595/" target="_blank">
              <img src={assets.whatsapp} alt="" />
            </Link>
            <Link to="https://linkedin/jdeku-jdek" target="_blank">
              <img src={assets.linkedin} alt="" />
            </Link>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/deliveryInfo">Delivery</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy</Link>
            </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>
              <a href="tel:+233-246-062-758">🔗 +233-246-062-758</a>
            </li>
            <li>
              <a href="mailto:jdeku573@gmail.com">🔗 jdeku573@gmail.com</a>
            </li>
            <li>
              <a href="sms:+233246062758">🔗Chat via SMS</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        &copy; Inc. {new Date().getFullYear()} BlooFI. All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
