import { React, useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../Styles/home.css";
import cross from "../images/cross2.svg";
import dropdownLogo from "../images/dropdown1.png";

const Home = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("Informative");
  const [infoColor, setInfoColor] = useState("blue");
  const [doubtColor, setDoubtColor] = useState("black");
  const [showComment, setShowComment] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [darkClass, setDarkClass] = useState(null);
  const [dropdown, setDropdown] = useState("");
  const [display, setDisplay] = useState("none");
  const { userState, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = result.posts.filter((item) => {
          return item.category == category;
        });
        setData(newData);
      });
  }, [category]);

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

  const deletePost = (postid) => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      fetch(`/deletepost/${postid}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          const newData = data.filter((item) => {
            return item._id !== result._id;
          });
          setData(newData);
        });
    }
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

  return (
    <div style={{ backgroundColor: "#f8f8f8" }}>
      <Navbar image={userState ? userState.pic : ""} />
      <div className={`home-body body ${darkClass}`}>
        {/* <div className="options">
          <div className="Techit" onClick={() => showOptions()}>
            <p>Techit </p>
            <img className={dropdown} src={dropdownLogo} />
          </div>
          <div className="post-options" style={{ display: `${display}` }}>
            <div className="post-option-1">
              <p>
                <Link className="link" to="/followedposts">
                  Following
                </Link>
              </p>
              <p>
                <Link className="link home-link" to="/">
                  All
                </Link>
              </p>
            </div>
            <div className="line"></div>
            <div className="post-option-2">
              <p
                style={{ color: `${infoColor}` }}
                onClick={() => {
                  setCategory("Informative");
                  setInfoColor("blue");
                  setDoubtColor("black");
                }}
              >
                Informative
              </p>
              <p
                style={{ color: `${doubtColor}` }}
                onClick={() => {
                  setCategory("Doubt");
                  setInfoColor("black");
                  setDoubtColor("blue");
                }}
              >
                Doubts
              </p>
            </div>
          </div>
        </div> */}
        <main>
          {data.map((item) => {
            return (
              <div className="post" key={item._id}>
                <section className="left">
                  <div className="owner">
                    <div className="pfp-image">
                      <img src={item.postedBy.pic} alt="" />
                    </div>
                    <p>
                      <Link
                        to={
                          item?.postedBy?._id != userState?._id
                            ? "/profile/" + item?.postedBy?._id
                            : "/profile"
                        }
                      >
                        {item.postedBy.userName}
                      </Link>
                    </p>
                    {item.postedBy._id == userState._id && (
                      <>
                        <p
                          className="editPost"
                          // onClick={() => {
                          //   editPost(item);
                          // }}
                        >
                          <Link
                            to={"editpost/" + item._id}
                            state={{ post: item }}
                          >
                            edit post
                          </Link>
                        </p>
                        <p
                          className="deletePost"
                          onClick={() => {
                            deletePost(item._id);
                          }}
                        >
                          delete post
                        </p>
                      </>
                    )}
                  </div>
                  <p id="title">{item.title}</p>
                  {/* <p>{item.category}</p> */}
                  <p id="desc" className="mb-[1em]">
                    {item.desc}
                  </p>
                </section>
                <section className="right">
                  <div className="images">
                    <img
                      src={item.photo}
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
                  <div className="mid">
                    <div className="links">
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
                    </div>
                    <div className="mid-right">
                      <div className="likes">
                        <p>{item.likes.length} likes</p>
                        <div className="">
                          {item.likes.includes(userState._id) ? (
                            <div
                              onClick={() => {
                                likePost("/unlike", item._id);
                              }}
                              className=""
                            >
                              <svg
                                width="29"
                                height="27"
                                viewBox="0 0 29 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.5213 17.1856L11.6472 16.5833H11.0319L2.87499 16.5833C1.73434 16.5833 0.808683 15.6681 0.791893 14.5314L0.80019 14.4692L0.832848 14.2243L0.79166 14.1831L0.79166 11.9189C0.794241 11.6606 0.844826 11.4051 0.940832 11.1653L4.83306 2.06411L4.83439 2.06095C5.14646 1.31719 5.88567 0.791668 6.74999 0.791668L18.375 0.791668C19.5261 0.791668 20.4583 1.72385 20.4583 2.875L20.4583 15.7917C20.4583 16.3623 20.2255 16.8836 19.8479 17.2671C19.8475 17.2675 19.8471 17.2679 19.8467 17.2683L11.6954 25.4196L10.675 24.4087C10.6748 24.4085 10.6746 24.4083 10.6743 24.4081C10.415 24.1484 10.2531 23.7896 10.2531 23.3931C10.2531 23.2965 10.2662 23.1967 10.2882 23.0864C10.2883 23.0857 10.2885 23.085 10.2886 23.0843L11.5213 17.1856ZM24.0417 15.2917L24.0417 0.791668L28.2083 0.791668L28.2083 15.2917L24.0417 15.2917Z"
                                  fill="white"
                                  stroke="black"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                likePost("/like", item._id);
                              }}
                              className=""
                            >
                              {/* <svg
                                width="29"
                                height="27"
                                viewBox="0 0 29 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17.4787 9.23105L17.3528 9.83333H17.9681H26.125C27.2657 9.83333 28.1913 10.7486 28.2081 11.8852L28.1998 11.9475L28.1672 12.1924L28.2083 12.2336V14.4978C28.2058 14.756 28.1552 15.0116 28.0592 15.2513L24.1669 24.3526L24.1656 24.3557C23.8535 25.0995 23.1143 25.625 22.25 25.625H10.625C9.47386 25.625 8.54167 24.6928 8.54167 23.5417V10.625C8.54167 10.0543 8.77449 9.53304 9.15211 9.14958C9.1525 9.14919 9.15289 9.14879 9.15328 9.1484L17.3046 0.997108L18.325 2.00793C18.3252 2.00815 18.3254 2.00837 18.3257 2.00859C18.585 2.26829 18.7469 2.62704 18.7469 3.02354C18.7469 3.12016 18.7338 3.21993 18.7118 3.33028C18.7117 3.33097 18.7115 3.33166 18.7114 3.33236L17.4787 9.23105ZM4.95834 11.125V25.625H0.791672V11.125H4.95834Z"
                                  fill="white"
                                  stroke="black"
                                />
                              </svg> */}
                              <svg
                                width="25"
                                height="22"
                                viewBox="0 0 25 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.7432 21.4509H8.25095C8.31248 18.7196 8.3125 17.5133 8.3125 16.0242V14.1436V11.7866V10.564C8.3125 9.28235 8.89273 8.07475 9.88417 7.27048C9.88451 7.27021 9.88485 7.26993 9.88519 7.26966L10.2444 6.98165L10.2451 6.98113C11.6307 5.86637 12.5769 4.29961 12.922 2.5547C12.9221 2.55449 12.9221 2.55428 12.9221 2.55407L13.0342 1.99568L13.0343 1.99486C13.2349 0.986511 14.2087 0.336125 15.2041 0.53634C16.2013 0.736893 16.8534 1.71442 16.6533 2.72231C16.6532 2.72252 16.6532 2.72273 16.6532 2.72293L16.541 3.28188L16.5407 3.28341C16.2929 4.53864 15.8348 5.73276 15.1943 6.81876L14.7496 7.57276H15.625H22.6562C23.6714 7.57276 24.5 8.40197 24.5 9.42969C24.5 10.4113 23.7484 11.21 22.7985 11.2832L21.7852 11.3613L22.4654 12.1164C22.76 12.4434 22.9375 12.8795 22.9375 13.3579C22.9375 14.2646 22.29 15.0179 21.4442 15.1795L20.7367 15.3148L21.1108 15.9303C21.2778 16.205 21.375 16.5374 21.375 16.8933C21.375 17.7188 20.8394 18.4181 20.1044 18.6568L19.6768 18.7957L19.7696 19.2356C19.797 19.3657 19.8125 19.5029 19.8125 19.6431C19.8125 20.6708 18.9839 21.5 17.9688 21.5H14.3799C14.0635 21.5 13.9237 21.5 13.7841 21.4981C13.5173 21.4944 13.2507 21.4834 11.754 21.451L11.754 21.4509H11.7432ZM1.5625 8.35841H4.6875C5.27298 8.35841 5.75 8.83407 5.75 9.42969V20.4287C5.75 21.0243 5.27298 21.5 4.6875 21.5H1.5625C0.977025 21.5 0.5 21.0243 0.5 20.4287V9.42969C0.5 8.83407 0.977025 8.35841 1.5625 8.35841Z"
                                  stroke="black"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      <svg
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
                      >
                        <path
                          d="M1.30316 21.4055L1.30118 21.407C1.21797 21.4677 1.1175 21.5 1.0125 21.5C0.7447 21.5 0.5 21.2701 0.5 20.9559V2.0625C0.5 1.18536 1.18637 0.5 2 0.5H14C14.8136 0.5 15.5 1.18536 15.5 2.0625V20.9559C15.5 21.2701 15.2553 21.5 14.9875 21.5C14.8825 21.5 14.782 21.4677 14.6988 21.407L14.6968 21.4055L8.29267 16.7821L8 16.5708L7.70733 16.7821L1.30316 21.4055Z"
                          stroke="black"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="comment">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        makeComment(e.target[0].value, item._id);
                      }}
                    >
                      <textarea rows="1" placeholder="Add a comment" />
                      <input type="submit" value="Post" />
                    </form>
                    {item.comments.length != 0 ? (
                      <span
                        onClick={() => {
                          setShowComment(true);
                          setDarkClass("dark_bg");
                          setCurrentItem(item);
                        }}
                      >
                        View all {item.comments.length} comments
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </section>
              </div>
            );
          })}
        </main>
      </div>
      {/* {showComment && <Comments opacity="1" item={currentItem} />} */}
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
    </div>
  );
};

export default Home;
