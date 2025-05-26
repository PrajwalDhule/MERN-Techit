import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import "../Styles/nav.css";
import logo from "../images/logo.svg";
import useCustomToast from "../hooks/use-custom-toast";
import { useTheme } from "../contexts/ThemeProvider";
import {
  Home,
  Bell,
  Plus,
  User,
  MoreHorizontal,
  Moon,
  Sun,
  LogOut,
  LogIn,
  ChevronDown,
} from "lucide-react";

const Navbar = (props) => {
  const [showClass, setShowClass] = useState("dont-show");
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { userState, dispatch } = useContext(UserContext);
  const { customToast } = useCustomToast();

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

  // function getInitialTheme() {
  //   const storedTheme = localStorage.getItem("techit-theme");
  //   return storedTheme ? storedTheme : "light"; // Default to "light" if no preference is found
  // }

  function handleClick(link, message) {
    if (userState === null) {
      const btn = <a href={"/login"}>Login</a>;
      customToast("Login Required!", message, btn);
      return;
    }
    navigate(link);
  }

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const toggleLogin = () => {
    // setIsLoggedIn(!isLoggedIn)
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/login");
  };

  const navItems = [
    { name: "Feed", icon: Home, href: "#" },
    { name: "Notices", icon: Bell, href: "#" },
    { name: "Create", icon: Plus, href: "#" },
    { name: "Profile", icon: User, href: "#" },
  ];

  return (
    <>
          {/* <nav
            className="sticky z-3 w-[18.75vw] h-[95vh] top-[2.5vh] border-[1px] rounded-2xl border-[#80808035] bg-white"
            id="left-bar"
          >
            <div className="container nav-container flex relative justify-left pt-[3vh]">

              <ul className="menu-items w-full">
                <li className="logo-container">
                  <Link className="nav-item logo" to={props.link}>
                    <div>
                      <img src={logo} />
                    </div>
                  </Link>
                </li>

                <li>
                  <Link className="nav-item icons" to="/">
                    <div>
                      <svg
                        width="41"
                        height="38"
                        viewBox="0 0 41 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 19.5L19.32 1.66207C19.7012 1.29095 20.3062 1.28321 20.6967 1.64444L40 19.5"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M6 15V33.5C6 35.1569 7.34315 36.5 9 36.5H14.5M14.5 36.5H19H23H26M14.5 36.5V26.5C14.5 24.8431 15.8431 23.5 17.5 23.5H23C24.6569 23.5 26 24.8431 26 26.5V36.5M26 36.5H31.5C33.1569 36.5 34.5 35.1569 34.5 33.5V15"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <p className="w-0">Feed</p>
                  </Link>
                </li>
                <li>
                  <Link className="nav-item icons" to="/notices">
                    <div>
                      <svg
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18.5"
                          cy="18.5"
                          r="17.5"
                          stroke="black"
                          stroke-width="2"
                        />

                        <rect
                          x="17"
                          y="9"
                          width="3"
                          height="13"
                          rx="1.5"
                          fill="black"
                        />
                        <circle cx="18.5" cy="26.5" r="2.5" fill="black" />
                      </svg>
                    </div>
                    <p>Notices</p>
                  </Link>
                </li>
                <li>
                  <button
                    className="nav-item icons"
                    onClick={() =>
                      handleClick(
                        "/createpost",
                        "Please Login to Create a Post"
                      )
                    }
                  >
                    <div>
                      <svg
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18.5"
                          cy="18.5"
                          r="17.5"
                          stroke="black"
                          stroke-width="2"
                        />
                        <path
                          d="M18 10V28"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M9 19L27 19"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <p>Create</p>
                  </button>
                </li>

                {userState && (
                  <li>
                    <Link className="nav-item icons" to="/profile">
                      <div className="profile-icon">
                        <img src={props.image} />
                      </div>
                      <p>Profile</p>
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    className="nav-item icons more-option"
                    onClick={() => {
                      showClass == "dont-show"
                        ? setShowClass("show")
                        : setShowClass("dont-show");
                    }}
                  >
                    <div>
                      <svg
                        width="34"
                        height="30"
                        viewBox="0 0 34 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33 1H1"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M33 15H1"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M33 29H1"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <p>More</p>
                  </button>
                </li>
                <li className="more-item">
                  <div className={`more-options ${showClass}`}>
                    <ul className="flex-center">
                      <li onClick={toggleTheme} className="toggle">
                        <div className="flex-left">
                          {theme == "dark" ? (
                            <svg
                              width="37"
                              height="37"
                              viewBox="0 0 37 37"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="18.5"
                                cy="18.5"
                                r="17.5"
                                stroke="#C8C8C8"
                                stroke-width="2"
                              />
                              <circle
                                cx="18.5"
                                cy="18.5"
                                r="11.5"
                                fill="#C8C8C8"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="37"
                              height="37"
                              viewBox="0 0 37 37"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="18.5"
                                cy="18.5"
                                r="17.5"
                                stroke="#133363"
                                stroke-width="2"
                              />
                            </svg>
                          )}
                          <p>Dark mode</p>
                        </div>
                      </li>
                      <li>
                        <div className="flex-left">
                          <a
                            onClick={() => {
                              localStorage.clear();
                              dispatch({ type: "CLEAR" });
                              navigate("/login");
                            }}
                          >
                            <svg
                              width="37"
                              height="37"
                              viewBox="0 0 37 37"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22 11.0962V2C22 1.44771 21.5523 1 21 1H2C1.44772 1 1 1.44772 1 2V35C1 35.5523 1.44772 36 2 36H21C21.5523 36 22 35.5523 22 35V25.5673"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                              <path
                                d="M15 18.4159H35M35 18.4159L29.5 13M35 18.4159L29.5 23.5"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                            </svg>

                            <p>{userState ? "Logout" : "Login"}</p>
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </nav> */}

          <div>
            <div
              className="sticky z-3 w-[17.75vw] h-[95vh] top-[2.5vh] border-[1px] rounded-2xl border-[#80808035] bg-white"
              id="left-bar"
            >
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">T</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Techit
                    </span>
                  </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-4 flex flex-col">
                  <ul className="space-y-2">
                    {/* {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                </li>
              ))} */}

                    <li>
                      <Link
                        to="/"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-900 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <Home className="w-5 h-5" />
                        <span className="font-medium">Feed</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/notices"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-900 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <Bell className="w-5 h-5" />
                        <span className="font-medium">Notices</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/createpost"
                        onClick={(e) => {
                          if (userState === null) {
                            e.preventDefault();
                            const btn = <a href={"/login"}>Login</a>;
                            customToast(
                              "Login Required!",
                              "Please login to create a post",
                              btn
                            );
                          }
                        }}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-900 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Create</span>
                      </Link>
                    </li>

                    {/* More Dropdown */}
                    <li className="relative">
                      <button
                        onClick={() =>
                          setIsMoreDropdownOpen(!isMoreDropdownOpen)
                        }
                        className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <MoreHorizontal className="w-5 h-5" />
                          <span className="font-medium">More</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isMoreDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {isMoreDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                          <div className="py-2">
                            <button
                              onClick={toggleTheme}
                              className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                              {isDarkMode ? (
                                <Sun className="w-4 h-4" />
                              ) : (
                                <Moon className="w-4 h-4" />
                              )}
                              <span className="text-sm">
                                {isDarkMode ? "Light Mode" : "Dark Mode"}
                              </span>
                            </button>

                            <button
                              onClick={toggleLogin}
                              className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                              {isLoggedIn ? (
                                <LogOut className="w-4 h-4" />
                              ) : (
                                <LogIn className="w-4 h-4" />
                              )}
                              <span className="text-sm">
                                {userState ? "Logout" : "Login"}
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  </ul>

                  {userState && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto mb-0">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <img
                        src={userState.pic}
                        alt="Profile picture"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{userState.userName.length > 15 ? userState.userName.slice(0, 12) + "..." : userState.userName}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {userState.email.length > 18 ? userState.email.slice(0, 15) + "..." : userState.email}
                        </span>
                      </div>
                    </Link>
                  </div>
                  )}
                </nav>
              </div>
            </div>
          </div>
    </>
  );
};

Navbar.defaultProps = {
  link: "/",
};

export default Navbar;
