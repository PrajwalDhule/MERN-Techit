import React, { useContext, useState, useEffect } from "react";
import "../Styles/nav.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../App";
import logo from "../images/logo.svg";
import plus from "../images/plus.svg";
import search from "../images/search2.png";
import mrElegant from "../images/mr elegant.jpeg";
import profile from "../images/profile_2.png";
import light from "../images/light.png";
import dark from "../images/dark.jpeg";
import logout from "../images/logout.png";
import home from "../images/home.png";
import bell from "../images/bell.png";
import bars from "../images/more.png";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { userState, dispatch } = useContext(UserContext);
  const [showClass, setShowClass] = useState("dont-show");
  let nav = document.getElementById("left-bar");
  let hideNavText = () => {
    let navTexts = document.querySelectorAll(".menu-items li p");
    if (navTexts[0].style.opacity == "0") {
      for (let i = 0; i < navTexts.length; i++) {
        navTexts[i].style.opacity = "1";
      }
    } else {
      for (let i = 0; i < navTexts.length; i++) {
        navTexts[i].style.opacity = "0";
      }
    }
    if (nav) {
      nav.style.width == "6vw"
        ? (nav.style.width = "16vw")
        : (nav.style.width = "6vw");
    }
  };

  return (
    <nav
      className="bg-white fixed z-3 w-[16vw] h-[90vh] left-[1vw] top-[5vh]"
      id="left-bar"
    >
      <div className="container nav-container flex relative justify-left pt-[3vh] pl-[1vw]">
        {/* <div className="logo">
          <Link to={props.link}>
            <img src="" alt="" className="icon" />
          </Link>
        </div> */}

        <ul className="menu-items">
          <li className="mt-[.5rem] mb-[.5rem]">
            <Link className="link logo" to={props.link}>
              <div>
                <img src={logo} />
              </div>
            </Link>
          </li>

          <li>
            <Link className="link icons" to="/">
              <div>
                <img src={home} />
              </div>
              <p className="w-0">Feed</p>
            </Link>
          </li>
          <li>
            {/* <Link className="link icons" to="/"> */}
            <a className="link icons" onClick={hideNavText}>
              <div>
                <img src={search} />
              </div>
              <p>Search</p>
            </a>
            {/* </Link> */}
          </li>
          <li>
            <Link className="link icons" to="/notifications">
              <div>
                <img src={bell} />
              </div>
              <p>Activities</p>
            </Link>
          </li>
          <li>
            <Link className="link icons" to="/notifications">
              <div>
                <img src={bell} />
              </div>
              <p>Notifications</p>
            </Link>
          </li>
          <li>
            <Link className="link icons" to="/createpost">
              <div>
                <img src={plus} />
              </div>
              <p>Create</p>
            </Link>
          </li>

          <li>
            <Link className="link icons" to="/profile">
              <div className="profile-icon">
                <img src={props.image} />
              </div>
              <p>Profile</p>
            </Link>
          </li>
          <li>
            <div
              className="link icons more-option"
              onClick={() => {
                showClass == "dont-show"
                  ? setShowClass("show")
                  : setShowClass("dont-show");
              }}
            >
              <div>
                <img src={bars} />
              </div>
              <p>More</p>
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
