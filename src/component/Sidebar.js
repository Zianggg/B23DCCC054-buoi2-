import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Quản lý hàng hóa
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
