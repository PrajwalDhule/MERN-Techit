import { React, useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import RightBar from "./RightBar";
import "../Styles/home.css";
import cross from "../images/cross2.svg";

const FollowedPosts = () => {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const { userState, dispatch } = useContext(UserContext);
  const [rendered, setRendered] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const [display, setDisplay] = useState("none");
  const [showComment, setShowComment] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [darkClass, setDarkClass] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/followedposts", {
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
        setRendered(true);
      });
  }, []);

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
        setAllData(newData);
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

  const showOptions = () => {
    if (dropdown == "up") {
      setDropdown("");
      setDisplay("none");
    } else {
      setDropdown("up");
      setDisplay("block");
    }
  };

  const handlePostClick = (item) => {
    navigate(`/posts/${item._id}`);
  };

  const handleLinkClick = (event) => {
    event.stopPropagation();
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
      <div>
        <Navbar image={userState ? userState.pic : ""} link="/followedposts" />
        <RightBar
          displayToggle={true}
          data={allData ? allData : ""}
          filter={true}
        />
        <div className="home-body body">
          <main>
            {data.length != 0 ? (
              data.map((item) => {
                return (
                  <div
                    className="post"
                    key={item._id}
                    onClick={() => {
                      handlePostClick(item);
                    }}
                  >
                    <section className="left">
                      <div className="owner">
                        <div className="pfp-image">
                          <img src={item?.postedBy?.pic} alt="" />
                        </div>
                        <p>
                          <Link
                            to={
                              item?.postedBy?._id != userState._id
                                ? "/profile/" + item?.postedBy?._id
                                : "/profile"
                            }
                            onClick={(e) => {
                              handleLinkClick(e);
                            }}
                          >
                            {item.postedBy?.userName}
                          </Link>
                        </p>
                      </div>
                      <p id="title">{item.title}</p>
                      <p id="desc">{item.desc}</p>
                      {/* <p>{item.category}</p> */}
                    </section>
                    <section className="right">
                      <div className="images">
                        <img src={item.photo} alt="post" />
                      </div>
                      <div className="mid">
                        {/* <div className="links">
                      {item.link1 && (
                        <a href={item.link1} target="_blank">
                          <p>Code</p>
                        </a>
                      )}
                      {item.link2 && (
                        <a href={item.link2} target="_blank">
                          <p>Demo</p>
                        </a>
                      )}
                    </div> */}
                        <div className="mid-right flex">
                          <div className="likes">
                            <div>
                              {item.likes.includes(userState._id) ? (
                                <div
                                  onClick={(e) => {
                                    likePost("/unlike", item._id);
                                    handleLinkClick(e);
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
                                  onClick={(e) => {
                                    likePost("/like", item._id);
                                    handleLinkClick(e);
                                  }}
                                >
                                  {/* <img src={notLiked} alt="liked icon" /> */}
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
                            <p>{item.likes.length}</p>
                            <div></div>
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
                      <div className="comment">
                        <form
                          onSubmit={(e) => {
                            makeComment(e.target[0].value, item._id);
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
                      </div>
                    </section>
                  </div>
                );
              })
            ) : (
              <p>No posts yet!</p>
            )}
          </main>
        </div>
      </div>
      {showComment && (
        <>
          <div className="comments">
            <div className="comments-body">
              <p
                className="cross"
                onClick={() => {
                  setShowComment(false);
                  setDarkClass(null);
                }}
              >
                {/* cross */}
                <img src={cross} />
              </p>
              <div className="left">
                <img src={currentItem?.photo} alt="post_image" />
                <div className="comment comment-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      makeComment(e.target[0].value, currentItem?._id);
                    }}
                  >
                    <textarea rows="1" placeholder="Add a comment" />
                    <input type="submit" />
                  </form>
                </div>
              </div>
              <div className="right">
                <div className="replies">
                  <div className="owner">
                    <div className="pfp-image">
                      <img src={currentItem.postedBy.pic} alt="" />
                    </div>
                    <p>
                      <Link
                        to={
                          currentItem.postedBy._id != userState._id
                            ? "/profile/" + currentItem.postedBy._id
                            : "/profile"
                        }
                      >
                        {currentItem.postedBy.userName}
                      </Link>
                    </p>
                  </div>
                  <p id="title2">{currentItem.title}</p>
                  <div className="line"></div>
                  {currentItem?.comments.map((record) => {
                    return (
                      <div key={record._id} className="reply">
                        <span>{record.postedBy.userName}</span>
                        <span>{record.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FollowedPosts;
