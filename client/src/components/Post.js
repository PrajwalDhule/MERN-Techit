import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { handleLinkClick } from "../lib/utils";
import Comments from "./Comments";

const Post = ({
  post,
  onLike,
  onComment = null,
  onDelete,
  showComment = false,
  isExpanded = false,
}) => {
  const navigate = useNavigate();
  const { userState, dispatch } = useContext(UserContext);
  if (!post) return null;
  const hasLiked = post.likes.includes(userState?._id);

  const handleLike = () => {
    const type = hasLiked ? "unlike" : "like";
    onLike(type, post._id);
  };

  const handlePostClick = (item) => {
    navigate(`/posts/${item._id}`);
  };

  return (
    <div className="post-container w-[50vw]">
      <div
        className="post w-full flex items-start"
        onClick={() => {
          if (!isExpanded) handlePostClick(post);
        }}
        key={post._id}
      >
        <Link
          to={`/profile/${post.postedBy._id}`}
          onClick={(e) => {
            handleLinkClick(e);
          }}
          className="flex items-center"
        >
          <div className="h-10 w-10 overflow-hidden flex justify-center items-center mr-[1em] rounded-[50%]">
            <img
              src={post.postedBy.pic}
              alt={`${post.postedBy.userName}'s pfp`}
              className="h-[6vh] object-cover object-center"
            />
          </div>
        </Link>
        <div className="w-[90%]">
          <section className="left">
            <div className="owner w-full flex justify-between gap-6 items-center mt-1 mb-1">
              <Link
                to={`/profile/${post.postedBy._id}`}
                onClick={(e) => {
                  handleLinkClick(e);
                }}
                className="flex items-center"
              >
                <p className="username">{post.postedBy.userName}</p>
              </Link>
              {post.postedBy._id == userState?._id && (
                <div className="flex items-start gap-4">
                  {/* <p
                    className="text-[#4e67e4] cursor-pointer"
                    onClick={(e) => {
                      //   editPost(post);
                      handleLinkClick(e);
                    }}
                  >
                    <Link to={"editpost/" + post._id} state={{ post: post }}>
                      edit
                    </Link>
                  </p> */}
                  <p
                    className="text-[#c20505] cursor-pointer"
                    onClick={(e) => {
                      onDelete(post._id);
                      handleLinkClick(e);
                    }}
                  >
                    delete
                  </p>
                </div>
              )}
            </div>
            <p id="title">{post.title}</p>
            {/* <p>{post.category}</p> */}
            <p id="desc" className="break-words max-w-full">
              {post.desc}
            </p>
          </section>
          <section className="right">
            <div className="images">
              <img
                src={post.photo}
                alt="post"
                // style={{
                //   height: img.height > img.width ? "100%" : "auto",
                //   width: img.height > img.width ? "auto" : "100%",
                // }}
                // style={{
                //   height: "",
                //   width: "100%",
                // }}
              />
            </div>
            <div className="mid flex justify-between items-center mt-6 mb-4 w-full">
              <div className="mid-right flex justify-start items-center gap-6">
                <div className="likes flex gap-2">
                  {/* <div> */}
                  <div
                    onClick={(e) => {
                      handleLike();
                      handleLinkClick(e);
                    }}
                    className="w-[2.75vh] h-[2.75vh]"
                  >
                    {hasLiked ? (
                      <svg
                        width="47"
                        height="39"
                        viewBox="0 0 47 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                      >
                        <path
                          d="M43.8926 16.6028C38.8432 26.2804 25.8828 34.8085 22.975 36.6382C22.6201 36.8615 22.174 36.8249 21.8448 36.5653C15.1218 31.2634 6.39988 26.4343 0.887433 16.6028C-0.289483 14.5038 -1.42129 6.00447 5.41429 1.87156C14.8196 -3.81507 21.2585 5.27092 22.39 5.27108C23.5215 5.27125 28.6146 -2.66136 39.3657 1.87156C43.8592 3.7661 46.6761 11.2679 43.8926 16.6028Z"
                          fill="#FF3636"
                        />
                      </svg>
                    ) : (
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
                    )}
                  </div>
                  {/* </div> */}
                  {post.likes.length}
                </div>

                <div className="comment-count flex items-center gap-2">
                  <div className="w-[2.75vh] h-[2.75vh]">
                    <svg
                      width="92"
                      height="88"
                      viewBox="0 0 92 88"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="comment-icon w-full h-full"
                    >
                      <path
                        d="M46 0.125C20.8281 0.125 0.125 17.8516 0.125 40C0.125 52.8516 7.25 64.1875 18 71.4375C17.9844 71.8672 18 72.5312 17.4375 74.625C16.7422 77.2109 15.3672 80.875 12.5 84.9375L10.4375 87.8125L14 87.875C26.3516 87.9297 33.5078 79.8125 34.625 78.5C38.2734 79.3125 42.0703 79.875 46 79.875C71.1641 79.875 91.875 62.1484 91.875 40C91.875 17.8516 71.1641 0.125 46 0.125ZM46 3.875C69.4297 3.875 88.125 20.1797 88.125 40C88.125 59.8203 69.4297 76.125 46 76.125C41.9922 76.125 38.1016 75.6406 34.4375 74.75L33.3125 74.5L32.5625 75.4375C32.5625 75.4375 26.7812 81.9531 17.5625 83.5C19.2266 80.5156 20.4922 77.7422 21.0625 75.625C21.8594 72.6641 21.875 70.625 21.875 70.625V69.625L21 69.0625C10.5469 62.4375 3.875 51.8828 3.875 40C3.875 20.1797 22.5625 3.875 46 3.875Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  {post.comments.length}
                </div>

                {/* below are share and save icons */}
                {/* <svg
              width="26"
              height="22"
              viewBox="0 0 26 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.625 5.21506H15.125V4.71506V1.57235C15.125 1.16134 15.3795 0.772727 15.7869 0.598011L15.5898 0.138483L15.7902 0.596604C16.1988 0.41792 16.6777 0.49161 17.0076 0.78005L17.0085 0.780817L25.1335 7.85193L25.1341 7.85246C25.3714 8.05833 25.5 8.3435 25.5 8.64346C25.5 8.93973 25.3691 9.22706 25.1323 9.43599C25.132 9.43629 25.1317 9.43658 25.1313 9.43687L17.0098 16.5049C17.0096 16.5051 17.0093 16.5053 17.0091 16.5055C16.6789 16.7904 16.2022 16.8654 15.7855 16.6883C15.3762 16.5143 15.125 16.1276 15.125 15.7146V12.5719V12.0719H14.625H9.75C6.7984 12.0719 4.375 14.3915 4.375 17.2859C4.375 18.9458 5.10554 19.9319 5.6647 20.4439L5.66469 20.4439L5.66855 20.4474C5.89243 20.6481 6 20.8623 6 21.0326C6 21.2728 5.79126 21.5 5.49961 21.5C5.41219 21.5 5.35877 21.4846 5.32637 21.467L5.32639 21.467L5.32155 21.4644C4.41708 20.9874 0.5 18.6316 0.5 13.3575C0.5 8.87636 4.26175 5.21506 8.9375 5.21506H14.625Z"
                stroke="black"
              />
            </svg>
    
            <svg
              width="16"
              height="22"
              viewBox="0 0 16 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bookmark-icon"
            >
              <path
                d="M1.30316 21.4055L1.30118 21.407C1.21797 21.4677 1.1175 21.5 1.0125 21.5C0.7447 21.5 0.5 21.2701 0.5 20.9559V2.0625C0.5 1.18536 1.18637 0.5 2 0.5H14C14.8136 0.5 15.5 1.18536 15.5 2.0625V20.9559C15.5 21.2701 15.2553 21.5 14.9875 21.5C14.8825 21.5 14.782 21.4677 14.6988 21.407L14.6968 21.4055L8.29267 16.7821L8 16.5708L7.70733 16.7821L1.30316 21.4055Z"
                stroke="black"
              />
            </svg> */}
              </div>
            </div>
            {/* <div className="comment">
          <form
            onSubmit={(e) => {
              onComment(e.target[0].value, post._id);
            }}
            onClick={(e) => {
              handleLinkClick(e);
            }}
          >
            <textarea
              rows="1"
              placeholder="Add a comment"
              className="rounded-md border-[1px] border-solid bg-transparent border-[#ccc] p-4 text-sm focus-within:outline-none"
            />
            <input type="submit" value="Post" />
          </form>
        </div> */}
          </section>
        </div>
      </div>
      {showComment && (
        <>
          <div className="h-[1px] w-full bg-inner-border mt-4 mb-8"></div>
          <Comments postId={post._id} onComment={onComment} />
        </>
      )}
    </div>
  );
};

export default Post;
