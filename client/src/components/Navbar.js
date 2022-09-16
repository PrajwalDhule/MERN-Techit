import React, { useContext, useState } from "react";
import "../Styles/nav.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../App";
import logo from "../images/logo.svg";
import plus from "../images/plus.svg";
import search from "../images/search.png";
import mrElegant from "../images/mr elegant.jpeg";
import profile from "../images/profile_2.png";
import light from "../images/light.png";
import dark from "../images/dark.jpeg";
import logout from "../images/logout.png";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { userState, dispatch } = useContext(UserContext);
  const [showClass, setShowClass] = useState("dont-show");
  return (
    <nav>
      <div className="container nav-container">
        {/* <div className="logo">
          <Link to={props.link}>
            <img src="" alt="" className="icon" />
          </Link>
        </div> */}

        <ul className="menu-items">
          <li>
            <Link className="link logo" to={props.link}>
              <div>
                <img src={logo} />
              </div>
            </Link>
          </li>

          <li>
            <Link className="link icons" to="/createpost">
              <div>
                <img src={plus} />
              </div>
            </Link>
          </li>

          <li>
            <Link className="link icons" to="/signup">
              <div>
                <img src={search} />
              </div>
            </Link>
          </li>
          <li>
            <div
              className="link icons profile-icon"
              onClick={() => {
                showClass == "dont-show"
                  ? setShowClass("show")
                  : setShowClass("dont-show");
              }}
            >
              <div>
                <img src={props.image} />
              </div>
            </div>
          </li>
          <li className="profile-item">
            <div className={`profile-options ${showClass}`}>
              <ul className="flex-center">
                <li>
                  <Link className="flex-left" to="/profile">
                    <img src={profile} />
                    <p>Profile</p>
                  </Link>
                </li>
                <li>
                  <div className="flex-left">
                    <img src={light} />
                    <p>Theme</p>
                  </div>
                </li>
                {/* <li>
                  <Link to="/signup">
                    <p>Signup</p>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <p>Login</p>
                  </Link>
                </li> */}
                <li>
                  <a
                    className="flex-left"
                    onClick={() => {
                      localStorage.clear();
                      dispatch({ type: "CLEAR" });
                      navigate("/login");
                    }}
                  >
                    <img src={logout} />
                    <p>Logout</p>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  link: "/",
};

export default Navbar;
