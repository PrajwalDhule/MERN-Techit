import React, { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../App";
import { useTheme } from "../contexts/ThemeProvider";
import PostSnippetFeedSkeleton from "./PostSnippetFeedSkeleton";

const RightBar = ({ displayToggle, activeFeed = "" }) => {
  const { userState, dispatch } = useContext(UserContext);
  const { theme, toggleTheme } = useTheme();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/top-posts`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.error) {
          console.error("Error fetching top posts:", result.error);
          return;
        }
        setPosts(result.posts);
        setIsLoading(false);
      });
  }, []);

  return (
    <div
      className="sticky z-3 w-[19vw] h-[95vh] overflow-auto top-[2.5vh] right-bar-body flex flex-col justify-start items-center"
      id="right-bar"
    >
      <div
        className={`${
          displayToggle && userState ? "" : "hidden"
        } toggle w-full flex flex-row justify-start items-center py-2 mb-2`}
      >
        <Link
          to="/"
          className={`my-[.25em] px-[1em] py-[.5em] ${
            activeFeed === "for-you"
              ? `${
                  theme == "dark" ? "text-black font-medium" : "text-white"
                } rounded-md bg-blue-500`
              : `${theme == "dark" ? "text-[#E7E9EA]" : ""}`
          }`}
        >
          For you
        </Link>
        <Link
          to="/?feed=following"
          className={`ml-[.5em] px-[1em] py-[.5em] ${
            activeFeed === "following"
              ? `${
                  theme == "dark" ? "text-black" : "text-white"
                } rounded-md bg-blue-500`
              : `${theme == "dark" ? "text-white" : ""}`
          }`}
        >
          Following
        </Link>
      </div>
      <div className="posts w-full p-3 border-[1px] border-[#80808035] rounded-2xl bg-white">
        <h4 className="text-lg font-semibold pl-[.5em] ">Top Posts</h4>
        <div className="h-[0.5px] mx-[.5em] mt-2"></div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-0">
          {posts.map((item) => {
            return (
              <article className="py-[.5em] px-[.5em]" key={item._id}>
                <Link
                  to={`/posts/${item._id}`}
                  className="block font-medium mt-3 mb-1 text-sm"
                >
                  {item.title}
                </Link>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/profile/${item.postedBy._id}`}
                    className="my-1 flex justify-left items-center text-xs"
                  >
                    <span className="flex justify-center items-center mr-2">
                      <img
                        src={item.postedBy.pic}
                        alt="pfp"
                        className="w-6 h-6 rounded-full object-cover object-center"
                      />
                    </span>
                    <span>{item.postedBy.userName.length > 15 ? item.postedBy.userName.slice(0, 12) + "..." : item.postedBy.userName}</span>
                  </Link>
                  <div className="text-xs flex justify-center items-center">
                    {/* <span>{item.likesCount}</span> */}
                    {/* <p className="ml-1">likes</p> */}

                    <div className="mid-right flex justify-start items-center gap-4">
                      <div className="likes flex items-center gap-2">
                        <div className="w-4 h-4">
                          <svg
                            width="47"
                            height="39"
                            viewBox="0 0 47 39"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full"
                          >
                            <path
                              d="M44.8926 17.6028C39.8432 27.2804 26.8828 35.8085 23.975 37.6382C23.6201 37.8615 23.174 37.8249 22.8448 37.5653C16.1218 32.2634 7.39988 27.4343 1.88743 17.6028C0.710517 15.5038 -0.421293 7.00447 6.41429 2.87156C15.8196 -2.81507 22.2585 6.27092 23.39 6.27108C24.5215 6.27125 29.6146 -1.66136 40.3657 2.87156C44.8592 4.7661 47.6761 12.2679 44.8926 17.6028Z"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                          </svg>
                        </div>
                        {item.likesCount}
                      </div>

                      <div className="comment-count flex items-center gap-2">
                        <div className="w-4 h-4">
                          <svg
                            width="92"
                            height="88"
                            viewBox="0 0 92 88"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="comment-icon w-[99%] h-full"
                          >
                            <path
                              d="M46 0.125C20.8281 0.125 0.125 17.8516 0.125 40C0.125 52.8516 7.25 64.1875 18 71.4375C17.9844 71.8672 18 72.5312 17.4375 74.625C16.7422 77.2109 15.3672 80.875 12.5 84.9375L10.4375 87.8125L14 87.875C26.3516 87.9297 33.5078 79.8125 34.625 78.5C38.2734 79.3125 42.0703 79.875 46 79.875C71.1641 79.875 91.875 62.1484 91.875 40C91.875 17.8516 71.1641 0.125 46 0.125ZM46 3.875C69.4297 3.875 88.125 20.1797 88.125 40C88.125 59.8203 69.4297 76.125 46 76.125C41.9922 76.125 38.1016 75.6406 34.4375 74.75L33.3125 74.5L32.5625 75.4375C32.5625 75.4375 26.7812 81.9531 17.5625 83.5C19.2266 80.5156 20.4922 77.7422 21.0625 75.625C21.8594 72.6641 21.875 70.625 21.875 70.625V69.625L21 69.0625C10.5469 62.4375 3.875 51.8828 3.875 40C3.875 20.1797 22.5625 3.875 46 3.875Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                        {item.commentsCount}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          {isLoading && (
            <div className="mt-2">
              <PostSnippetFeedSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;

// search component below
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
