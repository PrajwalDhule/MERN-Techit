import React, { useContext } from "react";
import "../Styles/nav.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  return (
    // to={state ? "/" : "/login"}
    <nav>
      <div className="container nav-container">
        <div className="logo">
          <Link to="/">
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
            <Link className="link" to="/createpost">
              Create Post
            </Link>
          </li>

          <li>
            <Link className="link" to="/login">
              Login/Sign up
            </Link>
          </li>
          <li>
            <Link className="link" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <a
              className="link"
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                navigate("/login");
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
