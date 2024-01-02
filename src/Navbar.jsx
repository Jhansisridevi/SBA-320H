import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/home" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" style={{ textDecoration: "none" }}>
            About
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/news" style={{ textDecoration: "none" }}>
            News
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/search" style={{ textDecoration: "none" }}>
            Search
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
