import React from "react";
import { Link } from "react-router-dom";

const NoDataCard = ({ title, message, btnText = "Go to Home" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="no-data-card bg-white p-12 rounded-lg shadow-md max-w-md w-full">
        <div className="text-6xl mb-6">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          {btnText}
        </Link>
      </div>
    </div>
  );
};

export default NoDataCard;
