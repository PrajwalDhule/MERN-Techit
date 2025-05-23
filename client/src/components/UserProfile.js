import { useParams } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import "../Styles/profile.css";
import RightBar from "./RightBar";
import { useTheme } from "../contexts/ThemeProvider";
import Post from "./Post";
import { deletePost, likePost } from "../lib/utils";

const Profile = () => {
  const { theme, toggleTheme } = useTheme();
  const [posts, setPosts] = useState([]);
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
  }, [userid]);

  useEffect(() => {
    fetch(`/userposts/${userid}`)
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.userPosts);
        console.log(posts);
      });
  }, [userid]);

  useEffect(() => {
    fetch(`/usernotices/${userid}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = result.notices.filter((item) => {
          return true;
        });
        setNoticeData(newData);
      });
  }, [userid]);

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
        localStorage.setItem("techit-user", JSON.stringify(data));
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
        localStorage.setItem("techit-user", JSON.stringify(data));

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

  return (
    // <div className="">hello</div>
    <>
      {profile ? (
        <div className={`profile-body body ${darkClass ?? ""}`}>
          <Navbar image={userState ? userState.pic : ""} />
          <div className="profile main-container w-[50vw]">
            <main>
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
                  theme == "dark" ? "bg-[#0c3e87] border-none" : "bg-gray-200"
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

              {!isNotice ? (
                <section className="posts">
                  {posts.length != 0 ? (
                    posts.map((post) => {
                      return (
                        <Post
                          post={post}
                          onLike={(type, postId) =>
                            likePost(type, postId, posts, setPosts)
                          }
                          onDelete={(postId) =>
                            deletePost(postId, posts, setPosts)
                          }
                        />
                      );
                    })
                  ) : (
                    <p>No posts yet!</p>
                  )}
                </section>
              ) : (
                <section className="notices">
                  {noticeData.length != 0 ? (
                    noticeData.map((item) => {
                      return (
                        <div
                          key={item._id}
                          className="notice rounded-md border-[1px] border-[#c8c8c8] px-[1.25em] py-[1em] mb-[1.5em] pr-[2em] bg-white"
                        >
                          <div className="owner flex justify-left items-center">
                            <Link
                              className="pfp-image h-[6vh] w-[6vh] overflow-hidden flex justify-center items-center mr-[1em] rounded-[50%]"
                              to={
                                item?.postedBy?._id != userState?._id
                                  ? "/profile/" + item?.postedBy?._id
                                  : "/profile"
                              }
                            >
                              <img
                                src={item.postedBy.pic}
                                alt={`${item.postedBy.userName}'s pfp`}
                                className="h-[6vh] object-cover object-center"
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
                            {item.postedBy._id == userState?._id && (
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
            </main>
          </div>
          <RightBar displayToggle={false} />
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default Profile;
