import React from "react";

const PostButton = () => {
  return (
    <button
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-regular rounded-md text-md px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="submit"
      role="button"
    >
      Post
    </button>
  );
};

export default PostButton;
