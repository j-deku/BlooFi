import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option" title="Add Item">
          <img src={assets.add_small} alt="Add item" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option" title="List Item">
          <img src={assets.list_Icon} alt="List Items" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/order" className="sidebar-option" title="Order item">
          <img src={assets.Parcel} alt="Orders" />
          <p>Order Items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
