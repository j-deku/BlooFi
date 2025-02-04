import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { StoreContext } from "../../context/StoreContext";
import {
  FaBell,
  FaBoxOpen,
  FaDoorOpen,
  FaSearch,
} from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from "@mui/icons-material/Person";

const Navbar = ({ setLogin }) => {
  const {
    getTotalCartAmount,
    token,
    user,
    setUser,
    setToken,
    searchTerm,
    setSearchTerm,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setToken("");
    setUser({});
    navigate("/");
  };

  const [menu, setMenu] = useState("Home");
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const sidebarRef = useRef(null);
  const hideSearch = useRef(null);

  const showHamContent = () => {
    setShow(!show);
  };
  const clickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  const clickLink = () => {
    setShow(false);
  };
  const clickOut = (event) => {
    if (hideSearch.current && !hideSearch.current.contains(event.target)) {
      setShowSearch(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", clickOut);
    return () => {
      document.removeEventListener("mousedown", clickOut);
    };
  }, []);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div
      className={`navbar ${isScrolled ? "scroll-active" : "scroll-inactive"}`}
      id="navbar"
    >
      <Link to="/">
        <img src={assets.flower_logo2} className="logo" alt="" style={{marginTop:8}}/>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("Mobile-App")}
          className={menu === "Mobile-App" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("Contact-Us")}
          className={menu === "Contact-Us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <div
          className={`searchDiv ${showSearch ? "show" : "hide"}`}
          ref={hideSearch}
        >
          <FaSearch className="faSearch" />
          <input
            ref={sidebarRef}
            className={`inputSearch ${showSearch ? "show" : "hide"}`}
            type="search"
            list="designs"
            placeholder="Search decor items or designs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <datalist id="designs">
            <option value="flower cup">
              Decorative flower cup for design for creativity and design
              thinking processes. we are here to bring a collaborative features
              to your occasions
            </option>
            <option value="carpet">
              Distinguished Ambiance: Create an upscale atmosphere with our
              premium red carpet.
            </option>
            <option value="Cakes">
              Sweet Masterpiece: Celebrate with our beautifully crafted,
              delicious cakes for all occasions.
            </option>
            <option value="Balloons">
              Playful Touch: Bring whimsy and delight to your events with our
              balloons.
            </option>
            <option value="Chairs">
              Luxurious Detailing: Our decor chairs blend style, comfort and
              exceptional craftsmanship.
            </option>
            <option value="Tables">
              Stylish Surface: Elevate your space with our modern decor tables,
              perfect for entertaining and relaxation.
            </option>
            <option value="Rooms">
              Outdoor: Patio furniture, planters and decor for alfresco living
            </option>
            <option value="Designs">
              Joyful Moments: Create cherished memories with our thoughtfully
              designed toys.
            </option>
            <option value="Flowers">
              Fragrant Delight: Experience the sweetness of our handpicked,
              premium flowers.
            </option>
            <option value="Balloon Mix">
              Balloon Mix with stylish designs
            </option>
            <option value="Flower Cup - Multi-colors">
              Flower Cup - Multi-colors
            </option>
            <option value="Normal Chair">Normal Chair</option>
          </datalist>
        </div>
        <img
          onClick={toggleSearch}
          src={assets.search}
          className="searchImage"
          alt="search"
        />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.icons3_basket} alt="basket icon"/>
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <ToggleTheme className="themeButton" />
        {!token ? (
          <button onClick={() => setLogin(true)}>Sign In</button>
        ) : (
          <>
            <div className="navbar-profile">
              {user && user.avatar ? (
                <img
                  src={user.avatar}
                  alt="User"
                  className="profile-picture"
                />
              ) : (
                <PersonIcon style={{ fontSize: "25px" }} />
              )}
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate("/profile")}>
                  <PersonIcon style={{ color: "black" }} />
                  <p>Profile Details</p>
                </li>
                <hr />
                <li onClick={() => navigate("/newsFeed")}>
                  <FaBell style={{ color: "black" }} />
                  <p>Notifications</p>
                </li>
                <hr />
                <li onClick={() => navigate("/myOrders")}>
                  <FaBoxOpen style={{ color: "black" }} />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <FaDoorOpen style={{ color: "black" }} />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
            <p
            className="welcome"
              style={{
                marginBottom: -10,
                fontFamily: "Poppins, sans-serif",
                position: "absolute",
                top: 80,
                color: "purple",
                right: 50,
                fontWeight: "bold",
                fontSize: 10,
              }}
            >
            {user && user.name? (user.name): "Welcome"}!
            </p>
          </>
        )}
      </div>
      <div className="hamburger">
        <MenuIcon
          onClick={showHamContent}
          className="MenuIcon"
          sx={{ color: "black", fontSize: 35, cursor: "pointer" }}
        />
        <div 
        className={`sidebar-overlay ${show ? "show" : "hide"}`}
        ref={sidebarRef}
        ></div>
        <div
          ref={sidebarRef}
          className={`hamburger-content ${show ? "show" : "hide"}`}
        >
          <CloseIcon
            onClick={clickLink}
            className="closeHamburger"
            sx={{ cursor: "pointer", fontSize: 35 }}
          />

          <div className="searchInput">
            <FaSearch className="faSearch" />
            <input
              type="text"
              list="designs"
              placeholder="Search decor items or design..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <a onClick={clickLink} href="/">
            HOME
          </a>
          <a onClick={clickLink} href="#explore-menu">
            MENU
          </a>
          <a onClick={clickLink} href="#app-download">
            MOBILE APP
          </a>
          <a onClick={clickLink} href="#footer">
            CONTACT US
          </a>
          {!token ? (
            <button
              onClick={() => (setLogin(true) ? clickLink : "")}
              className="signIn"
            >
              Sign In
            </button>
          ) : (
            <div className="navbar-profile">
              <PersonIcon sx={{ fontSize: "50px" }} className="userIcon" />
              <ul className="navbar-profile-dropdown" style={{ left: 10 }}>
                <li onClick={() => navigate("/profile")}>
                  <PersonIcon sx={{ color: "black" }} />
                  <p>Profile Details</p>
                </li>
                <hr />
                <li onClick={() => navigate("/newsFeed")}>
                  <FaBell style={{ color: "black" }} />
                  <p>Notifications</p>
                </li>
                <hr />
                <li onClick={() => navigate("/myOrders")}>
                  <FaBoxOpen style={{ color: "black" }} />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <FaDoorOpen style={{ color: "black" }} />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
          <h1
            style={{
              fontFamily: "Poppins,sans-serif",
              fontWeight: "bold",
            }}
          >
            {user && user.name? (user.name): "Welcome"}!
          </h1>
          <hr />
          <p>Change Theme:</p>
          <ToggleTheme className="themeButton" />
        </div>
      </div>
    </div>
  );
};
Navbar.propTypes = {
  setLogin: PropTypes.func.isRequired,
};

export default Navbar;
