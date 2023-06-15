import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import RightBar from "./RightBar";
import liked from "../images/liked.svg";
import notLiked from "../images/notLiked.svg";
// import "../Styles/home.css";

const Post = (props) => {
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
    fetch("/allposts", {
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
        <RightBar displayToggle={false} data={data ? data : ""} filter={true} />

        <div className="relative single-post-wrapper left-1/2 translate-x-[-53.75%] w-[54vw] mb-[10vh] pt-[5vh]">
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
                    src={userState?.pic}
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
                    <p>{currentPost[0]?.likes.length} likes</p>
                    <div>
                      {currentPost[0]?.likes.includes(userState?._id) ? (
                        <div
                          onClick={() => {
                            likePost("/unlike", currentPost[0]._id);
                          }}
                        >
                          <img src={liked} alt="liked icon" />
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            likePost("/like", currentPost[0]._id);
                          }}
                          className=""
                        >
                          <img src={notLiked} alt="liked icon" />
                        </div>
                      )}
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="comment">
                <form
                  onSubmit={(e) => {
                    makeComment(e.target[0].value, currentPost[0]._id);
                  }}
                >
                  <textarea
                    rows="1"
                    placeholder="Add a comment"
                    className="rounded-md border-[1px] border-solid border-[#ccc] p-4 text-sm focus-within:outline-none"
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

export default Post;
