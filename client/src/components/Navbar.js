import React from "react";
import "../Styles/nav.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="container nav-container">
        <div className="logo">
          <Link to="/index">
            <img src="" alt="" className="icon" />
          </Link>
        </div>
        <ul className="menu-items">
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="#">
              Guide
            </Link>
          </li>
          <li>
            <Link className="link" to="/table">
              Tenders
            </Link>
          </li>
          <li>
            <Link className="link" to="/contact">
              Contact us
            </Link>
          </li>
          <li>
            <Link className="link" to="/LoginF">
              Login/Sign up
            </Link>
          </li>
          <li>
            <Link className="link" to="/BidderProfile">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
