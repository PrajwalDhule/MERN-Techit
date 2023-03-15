import React from "react";
import { Link } from "react-router-dom";

const RightBar = () => {
  //write a function here to toggle
  return (
    <div className=" fixed z-3 w-[16vw] h-[90vh] right-[1vw] top-[5vh] right-bar-body flex flex-col justify-start items-center ">
      <div className="toggle w-full flex flex-row justify-between items-center py-2">
        <button className="my-[.25em] px-[1em] py-[.5em] rounded-md bg-[#69e6ff] ">
          For you
        </button>
        <button className="ml-[.5em] px-[1em] py-[.5em]">Following</button>
      </div>
      <nav className="w-full mt-[2.5vh] p-2 border-[1px] bg-white border-[#c8c8c8] ">
        <h4 className=" text-lg">Trending</h4>
        <article>
          <Link to="/" className="block my-2">
            <span>pfp</span>
            <span>username</span>
          </Link>
          <Link to="/" className="block font-bold text-[1.1rem] my-2">
            Pros and cons of Sveltekit
          </Link>
          <p>likes and all</p>
        </article>
      </nav>
    </div>
  );
};

export default RightBar;

// <form>
//   <label
//     for="default-search"
//     class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
//   >
//     Search
//   </label>
//   <div class="relative">
//     <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//       <svg
//         aria-hidden="true"
//         class="w-5 h-5 text-gray-500 dark:text-gray-400"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           stroke-width="2"
//           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//         ></path>
//       </svg>
//     </div>
//     <input
//       type="search"
//       id="default-search"
//       class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       placeholder="Search Mockups, Logos..."
//       required
//     />
//     <button
//       type="submit"
//       class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//     >
//       Search
//     </button>
//   </div>
// </form>
