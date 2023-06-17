import React, { useContext, useState, useEffect } from "react";
import "../Styles/nav.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../App";
import logo from "../images/logo.svg";
import create from "../images/create.svg";
import search from "../images/search.svg";
import mrElegant from "../images/mr elegant.jpeg";
import profile from "../images/profile_2.png";
import light from "../images/light.png";
import dark from "../images/dark.jpeg";
import logout from "../images/logout.png";
import home from "../images/home.svg";
import bell from "../images/bell.png";
import bars from "../images/more.svg";
import notice from "../images/notice.svg";

const Navbar = (props) => {
  const [showClass, setShowClass] = useState("dont-show");
  const [theme, setTheme] = useState(getInitialTheme);
  const navigate = useNavigate();
  const { userState, dispatch } = useContext(UserContext);

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
        ? (nav.style.width = "22vw")
        : (nav.style.width = "6vw");
    }
  };

  function getInitialTheme() {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light"; // Default to "light" if no preference is found
  }

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userState,
        theme,
      })
    );
    dispatch({
      type: "UPDATETHEME",
      payload: theme,
    });
  }

  return (
    <nav
      className="bg-white fixed z-3 w-[18vw] h-[90vh] left-[1vw] top-[5vh] border-[1px] border-[#c8c8c8]"
      id="left-bar"
    >
      <div className="container nav-container flex relative justify-left pt-[3vh]">
        {/* <div className="logo">
          <Link to={props.link}>
            <img src="" alt="" className="icon" />
          </Link>
        </div> */}

        <ul className="menu-items w-full">
          <li className="logo-container">
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
          {/* <li>
            <a
              className="link icons"
              // onClick={hideNavText}
            >
              <div>
                <img src={search} />
              </div>
              <p>Search</p>
            </a>
          </li> */}
          <li>
            <Link className="link icons" to="/notices">
              <div>
                <img src={notice} />
              </div>
              <p>Notices</p>
            </Link>
          </li>
          {/* <li>
            <Link className="link icons" to="/notifications">
              <div>
                <img src={bell} />
              </div>
              <p>Notifications</p>
            </Link>
          </li> */}
          <li>
            <Link className="link icons" to="/createpost">
              <div>
                <img src={create} />
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
                <li onClick={toggleTheme}>
                  <div className="flex-left">
                    <img src={light} />
                    <p>Theme</p>
                  </div>
                </li>
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
