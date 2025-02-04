import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="overlay"></div>
      <div className="header">
        <div className="header-content">
          <h2>Order your favorite Designs</h2>
          <Link to="/newsFeed">
            <button>News Feed</button>
          </Link>
          <p>
            Scroll Through this page to look for your best design choices to use
            for your decoration orders
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
