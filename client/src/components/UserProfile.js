import { useParams } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import "../Styles/profile.css";
import RightBar from "./RightBar";
import settings from "../images/settings.png";
import liked from "../images/liked.svg";
import notLiked from "../images/notLiked.svg";

const Profile = () => {
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isNotice, setIsNotice] = useState(false);
  const [noticeData, setNoticeData] = useState([]);
  const { userState, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const navigate = useNavigate();
  const [showfollow, setShowFollow] = useState(
    userState ? !userState.following?.includes(userid) : true
  );

  // const [showPost, setShowPost] = useState(false);
  // const [showComment, setShowComment] = useState(false);
  // const [currentItem, setCurrentItem] = useState(null);
  const [darkClass, setDarkClass] = useState(null);

  const setDimensions = (id) => {
    var img = document.getElementById(id);
    if (img.naturalWidth * 9 < img.naturalHeight * 16) {
      img.style.width = "";
      img.style.height = "100%";
    }
  };

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
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

  useEffect(() => {
    fetch(`/usernotices/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = result.notices.filter((item) => {
          return true;
        });
        setNoticeData(newData);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

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

  const unFollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setProfile((prevState) => {
          const newFollowers = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollowers,
            },
          };
        });
        setShowFollow(true);
      });
  };

  const handlePostClick = (item) => {
    navigate(`/posts/${item._id}`);
  };

  const handleLinkClick = (event) => {
    event.stopPropagation();
  };
  return (
    // <div className="">hello</div>
    <>
      {profile ? (
        <div className={`profile-body body ${darkClass}`}>
          <Navbar image={userState ? userState.pic : ""} />
          <RightBar
            displayToggle={false}
            data={data ? data : ""}
            filter={true}
          />
          <div className="profile">
            <section className="personal-info">
              <div>
                <div className="pfp-container">
                  <div className="pfp-img-wrapper">
                    <img
                      className="pfp"
                      src={profile.user.pic}
                      alt={`${profile.user.userName}'s profile picture`}
                    />
                  </div>
                </div>
              </div>
              <div className="text">
                <p className="userName">{profile.user.userName}</p>
                <p className="position">{profile.user.position}</p>

                <div className="numbers">
                  {/* <p>{posts.length} Posts</p> */}
                  <div>
                    <p>{profile.user.followers.length}</p>
                    Followers
                  </div>
                  <div>
                    <p>{profile.user.following.length}</p> Following
                  </div>
                  {/* <div className="special-links-container">
                    <a href="/">
                      <img src={settings} alt="social-link" />
                    </a>
                    <a href="/">
                      <img src={settings} alt="social-link" />
                    </a>
                    <a href="/">
                      <img src={settings} alt="social-link" />
                    </a>
                  </div> */}
                </div>
                <p className="bio">{profile.user.bio}</p>
              </div>
              <div className="options">
                {showfollow ? (
                  <button
                    className="text-white bg-[#2c67fc]"
                    onClick={() => followUser()}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    className="text-black bg-white"
                    onClick={() => unFollowUser()}
                  >
                    Unfollow
                  </button>
                )}
              </div>
            </section>
            <div className="line"></div>
            <div
              className={`relative left-1/2 translate-x-[-50%] inline-flex cursor-pointer select-none items-center justify-center rounded-md border-[1px] border-[#c8c8c8] ${
                userState?.theme == "dark"
                  ? "bg-[#0c3e87] border-none"
                  : "bg-gray-200"
              } p-1 my-4`}
            >
              <span
                className={`flex items-center space-x-[6px] rounded py-2 px-6 text-sm font-medium ${
                  !isNotice
                    ? "bg-blue-500 text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setIsNotice(false)}
              >
                Posts
              </span>
              <span
                className={`flex items-center space-x-[6px] rounded py-2 px-6 text-sm font-medium ${
                  !isNotice
                    ? "bg-transparent text-black"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => setIsNotice(true)}
              >
                Notice
              </span>
            </div>

            {!isNotice && (
              <section className="posts">
                {profile?.posts.length != 0 ? (
                  profile.posts?.map((item) => {
                    return (
                      <div
                        className="profile-post cursor-pointer"
                        onClick={() => {
                          handlePostClick(item);
                        }}
                        key={item._id}
                      >
                        <section className="left">
                          <div className="owner">
                            <div className="pfp-image">
                              <img
                                src={item.postedBy?.pic}
                                alt={`${item.postedBy.userName}'s pfp`}
                              />
                            </div>
                            <p className="username">
                              <Link
                                to={
                                  item?.postedBy?._id != userState?._id
                                    ? "/profile/" + item?.postedBy?._id
                                    : "/profile"
                                }
                                onClick={handleLinkClick}
                              >
                                {item?.postedBy?.userName}
                              </Link>
                            </p>
                          </div>
                          <p id="title">{item.title}</p>
                          <p id="desc">{item.desc}</p>
                        </section>
                        <section className="right">
                          <div className="images">
                            <img src={item.photo} alt="post" />
                          </div>
                          <div className="mid">
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
                            </div>
                          </div>
                          <div className="comment">
                            <form
                              onSubmit={(e) => {
                                makeComment(e.target[0].value, item._id);
                              }}
                              onClick={(e) => handleLinkClick(e)}
                            >
                              <textarea
                                rows="1"
                                placeholder="Add a comment"
                                className="rounded-md border-[1px] bg-transparent border-solid border-[#ccc] p-4 text-sm focus-within:outline-none"
                              />
                              <input type="submit" value="Post" />
                            </form>
                            {/* {item.comments.length != 0 ? ( */}
                          </div>
                        </section>
                      </div>
                    );
                  })
                ) : (
                  <p>No posts yet!</p>
                )}
              </section>
            )}
            {isNotice && (
              <section className="notices">
                {noticeData.length != 0 ? (
                  noticeData.map((item) => {
                    return (
                      <div
                        key={item._id}
                        className="notice rounded-md border-[1px] border-[#c8c8c8] px-[1.25em] py-[1em] mb-[1.5em] pr-[2em] bg-white"
                      >
                        <div className="owner">
                          <Link
                            className="pfp-image"
                            to={
                              item?.postedBy?._id != userState?._id
                                ? "/profile/" + item?.postedBy?._id
                                : "/profile"
                            }
                          >
                            <img
                              src={item.postedBy.pic}
                              alt={`${item.postedBy.userName}'s pfp`}
                            />
                          </Link>
                          <p className="username">
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
                            <div className="ml-[auto] mr-0">
                              <p
                                className="deletePost"
                                // onClick={() => {
                                //   deletePost(item._id);
                                // }}
                              >
                                delete post
                              </p>
                            </div>
                          )}
                        </div>
                        {/* <p id="title">{item.title}</p> */}
                        {/* <p>{item.category}</p> */}
                        <p
                          id="desc"
                          className="my-[1em] text-sm tracking-tight"
                        >
                          {item.desc}
                        </p>
                        {item.links &&
                          item.links.map((link, index) => {
                            return (
                              <Link
                                className="mr-[1em] text-blue-500"
                                to={`${link}`}
                              >
                                link {index + 1}
                              </Link>
                            );
                          })}
                      </div>
                    );
                  })
                ) : (
                  <p>No notices yet!</p>
                )}
              </section>
            )}
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default Profile;
