import React, { useContext } from "react";
import "../Styles/nav.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  return (
    <nav>
      <div className="container nav-container">
        <div className="logo">
          <Link to={state ? "/" : "login"}>
            <img src="" alt="" className="icon" />
          </Link>
        </div>
        <ul className="menu-items">
          <li>
            <Link className="link" to={state ? "/" : "login"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="#">
              Guide
            </Link>
          </li>
          <li>
            <Link to="/createpost">Create Post</Link>
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
