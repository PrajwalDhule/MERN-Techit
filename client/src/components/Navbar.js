import React, { useContext } from "react";
import "../Styles/nav.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../App";
import logo from "../images/logo.svg";
import plus from "../images/plus.svg";
import search from "../images/search.png";
import mrElegant from "../images/mr elegant.jpeg";

const Navbar = (props) => {
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
            <Link className="link logo" to="/">
              <img src={logo} />
            </Link>
          </li>

          <li>
            <Link className="link icons" to="/createpost">
              <img src={plus} />
            </Link>
          </li>

          <li>
            <Link className="link icons" to="/signup">
              <img src={search} />
            </Link>
          </li>
          <li>
            <Link className="link icons profile-icon" to="/profile">
              {/* <img src={mrElegant} /> */}
              <img src={props.image} />
            </Link>
          </li>

          <li>
            <a
              className="link icons"
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
