import { useContext, useState } from "react";
import {
  Home,
  Bell,
  Plus,
  MoreHorizontal,
  Sun,
  Moon,
  LogIn,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useCustomToast from "../hooks/use-custom-toast";
import { UserContext } from "../App";
import { useTheme } from "../contexts/ThemeProvider";

export function BottomNavbar() {
  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleBackdropClick = () => {
    if (isMoreDropdownOpen) {
      setIsMoreDropdownOpen(false);
    }
  };

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

  return (
    <>
      {/* Backdrop for dropdown */}
      {isMoreDropdownOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={handleBackdropClick}
        />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 lg:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <span className="text-xl font-bold text-blue-500">T</span>
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Home className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </Link>

          <Link
            to="/notices"
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </Link>

          <Link
            to="/createpost"
            onClick={(e) => {
              handleClick(e);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Plus className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </Link>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={toggleMoreDropdown}
              className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <MoreHorizontal className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Dropdown Menu */}
            {isMoreDropdownOpen && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                    <Link to="/">
                      <span className="text-sm">For You Feed</span>
                    </Link>
                  </button>

                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                    <Link to="/?feed=following">
                      <span className="text-sm">Following Feed</span>
                    </Link>
                  </button>

                  <hr className="my-2" />

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
          </div>

          {userState?.userName && (
            <Link
              to={`/profile/${userState._id}`}
              className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <img
                src={userState.pic}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
