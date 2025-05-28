import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import "../Styles/nav.css";
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

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { userState, dispatch } = useContext(UserContext);
  const { customToast } = useCustomToast();

  function handleClick(e) {
    if (!userState) {
      e.preventDefault();
      const btn = <a href={"/login"}>Login</a>;
      customToast(
        "error",
        "Login Required!",
        "Please login to create a post",
        btn
      );
    }
  }

  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const toggleLogin = () => {
    userState && localStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/login");
  };

  const isDarkMode = theme === "dark";

  const navItems = [
    { name: "Feed", icon: Home, href: "#" },
    { name: "Notices", icon: Bell, href: "#" },
    { name: "Create", icon: Plus, href: "#" },
    { name: "Profile", icon: User, href: "#" },
  ];

  return (
    <>
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
                    handleClick(e);
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
                  onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
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
                        {userState ? (
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

            {userState?.userName && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto mb-0">
                <Link
                  to={`/profile/${userState._id}`}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <img
                    src={userState.pic}
                    alt="Profile picture"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">
                      {userState.userName.length > 15
                        ? userState.userName.slice(0, 12) + "..."
                        : userState.userName}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {userState.email.length > 18
                        ? userState.email.slice(0, 15) + "..."
                        : userState.email}
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
