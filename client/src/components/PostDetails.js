import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import RightBar from "./RightBar";
import liked from "../images/liked.svg";
import notLiked from "../images/notLiked.svg";
// import "../Styles/home.css";

const PostDetails = (props) => {
  const [data, setData] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);
  const [rendered, setRendered] = useState(false);
  const { userState, dispatch } = useContext(UserContext);
  const { postid } = useParams();

  useEffect(() => {
    fetch(`/posts/${postid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.currentPost[0]);
        setCurrentPost(result.currentPost);
        setRendered(true);
      });
  }, [data]);

  useEffect(() => {
    fetch("/posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = result.posts.filter((item) => {
          return true;
        });
        setData(newData);
      });
  }, []);

  const likePost = (type, id) => {
    fetch(type, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return { ...item, likes: result.likes };
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!rendered) {
    return (
      <div className="flex gap-4 w-fit absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        {/* animation-delay added in global.css */}
        <div className="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce blue-circle"></div>
        <div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle"></div>
        <div className="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce red-circle"></div>
      </div>
    );
  }

  return (
    <>
      <div className="body post-body ">
        <Navbar image={userState ? userState.pic : ""} />
        <RightBar displayToggle={false} posts={data ? data : ""}/>

        <div className="relative single-post-wrapper left-1/2 translate-x-[-53.75%] w-[54vw] pb-[5vh] pt-[5vh]">
          <div
            className="single-post"
            key={currentPost._id}
            onClick={() => {
              // setDarkClass("dark_bg");
            }}
          >
            <section className="left">
              <div className="owner">
                <div className="pfp-image">
                  <img
                    src={currentPost[0]?.postedBy?.pic}
                    alt={`${currentPost[0]?.userName}'s pfp`}
                  />
                </div>
                <p className="username">
                  <Link
                    to={
                      currentPost[0]?.postedBy?._id != userState?._id
                        ? "/profile/" + currentPost[0]?.postedBy?._id
                        : "/profile"
                    }
                  >
                    {currentPost[0]?.postedBy.userName}
                  </Link>
                </p>
              </div>
              <p id="title">{currentPost[0]?.title}</p>
              <p id="desc">{currentPost[0]?.desc}</p>
            </section>
            <section className="right">
              <div className="images">
                <img src={currentPost[0]?.photo} alt="post image" />
              </div>
              <div className="mid">
                <div className="mid-right flex">
                  <div className="likes">
                    <div>
                      {currentPost[0]?.likes.includes(userState?._id) ? (
                        <div
                          onClick={() => {
                            likePost("/unlike", currentPost[0]._id);
                          }}
                        >
                          <svg
                            width="47"
                            height="39"
                            viewBox="0 0 47 39"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M43.8926 16.6028C38.8432 26.2804 25.8828 34.8085 22.975 36.6382C22.6201 36.8615 22.174 36.8249 21.8448 36.5653C15.1218 31.2634 6.39988 26.4343 0.887433 16.6028C-0.289483 14.5038 -1.42129 6.00447 5.41429 1.87156C14.8196 -3.81507 21.2585 5.27092 22.39 5.27108C23.5215 5.27125 28.6146 -2.66136 39.3657 1.87156C43.8592 3.7661 46.6761 11.2679 43.8926 16.6028Z"
                              fill="#FF3636"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            likePost("/like", currentPost[0]._id);
                          }}
                          className=""
                        >
                          <svg
                            width="47"
                            height="39"
                            viewBox="0 0 47 39"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M44.8926 17.6028C39.8432 27.2804 26.8828 35.8085 23.975 37.6382C23.6201 37.8615 23.174 37.8249 22.8448 37.5653C16.1218 32.2634 7.39988 27.4343 1.88743 17.6028C0.710517 15.5038 -0.421293 7.00447 6.41429 2.87156C15.8196 -2.81507 22.2585 6.27092 23.39 6.27108C24.5215 6.27125 29.6146 -1.66136 40.3657 2.87156C44.8592 4.7661 47.6761 12.2679 44.8926 17.6028Z"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p>{currentPost[0]?.likes.length}</p>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="h-[1px] w-full bg-gray-300 mt-4 mb-8"></div>
              <div className="comment">
                <form
                  onSubmit={(e) => {
                    makeComment(e.target[0].value, currentPost[0]._id);
                  }}
                >
                  <textarea
                    rows="1"
                    placeholder="Add a comment"
                    className="rounded-md border-[1px] bg-transparent border-solid border-[#ccc] p-4 text-sm focus-within:outline-none"
                  />
                  <input type="submit" value="Post" />
                </form>
              </div>
            </section>

            <div className="mt-4 ml-0 mr-auto">
              {currentPost[0]?.comments.map((record) => {
                return (
                  <div
                    className="flex justify-center items-start ml-0 mr-auto my-2"
                    key={record._id}
                  >
                    <div className="@apply self-start h-[6vh] w-[6vh] overflow-hidden rounded-[50%]">
                      <img
                        className=" h-full object-cover object-center"
                        src={record.postedBy.pic}
                      />
                    </div>
                    <div className="mr-auto ml-[1em] mt-[8px] w-[90%] text-sm">
                      <span className="mr-[1em] font-semibold cursor-pointer">
                        <Link
                          to={
                            record.postedBy._id != userState?._id
                              ? "/profile/" + record.postedBy._id
                              : "/profile"
                          }
                        >
                          {record.postedBy.userName}
                        </Link>
                      </span>
                      {/* <span className="mr-auto ml-0 cursor-pointer"> */}
                      {record.text}
                      {/* </span> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
