import { useParams } from "react-router-dom";
import { React, useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import "../Styles/profile.css";
import RightBar from "./RightBar";
import { useTheme } from "../contexts/ThemeProvider";
import Post from "./Post";
import { deletePost, likePost } from "../lib/utils";
import useCustomToast from "../hooks/use-custom-toast";
import NoDataCard from "./NoDataCard";
import FeedSkeleton from "./FeedSkeleton";
import NoticeFeedSkeleton from "./NoticeFeedSkeleton";
import ProfileSkeleton from "./ui/ProfileSkeleton";

const Profile = () => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isNotice, setIsNotice] = useState(false);
  const [noticeData, setNoticeData] = useState([]);
  const [isEditDropdownOpen, setIsEditDropdownOpen] = useState(false);
  const [isProfileLoading, setisProfileLoading] = useState(false);
  const [isPostsloading, setIsPostsLoading] = useState(false);
  const [isNoticesloading, setIsNoticesLoading] = useState(false);
  const { userState, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [image, setImage] = useState("");
  const [showfollow, setShowFollow] = useState(
    userState ? !userState.following?.includes(userid) : true
  );
  const [position, setPosition] = useState("");
  const [bio, setBio] = useState("");
  const [isDialogBio, setIsDialogBio] = useState(false);
  const navigate = useNavigate();
  const { customToast } = useCustomToast();

  let dialog = document.getElementById("dialog");

  useEffect(() => {
    setisProfileLoading(true);
    fetch(`/api/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.error("Error fetching user data:", result.error);
          customToast(
            "error",
            "Oops",
            "There was an issue while getting the user, it probably doesn't exist!"
          );
          setisProfileLoading(false);
          setIsPostsLoading(false);
          setIsNoticesLoading(false);
          return;
        }
        setProfile(result);
        setPosition(result.user.position);
        setBio(result.user.bio);
        setisProfileLoading(false);
      });
  }, [userid]);

  useEffect(() => {
    setIsPostsLoading(true);
    fetch(`/api/userposts/${userid}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.error("Error fetching user posts:", result.error);
          customToast(
            "error",
            "Oops",
            "there was an issue while fetching user posts!"
          );
          setIsPostsLoading(false);
          return;
        }
        setPosts(result.userPosts);
        setIsPostsLoading(false);
      });
  }, [userid]);

  useEffect(() => {
    setIsNoticesLoading(true);
    fetch(`/api/usernotices/${userid}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.error("Error fetching user notices:", result.error);
          customToast(
            "error",
            "Oops",
            "there was an issue while fetching user notices!"
          );
          setIsNoticesLoading(false);
          return;
        }
        const newData = result.notices.filter((item) => {
          return true;
        });
        setNoticeData(newData);
        setIsNoticesLoading(false);
      });
  }, [userid]);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "techit");
      data.append("cloud_name", "techitcloud");
      fetch("https://api.cloudinary.com/v1_1/techitcloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error("Error uploading image:", data.error);
            customToast(
              "error",
              "Oops",
              "there was an issue while uploading the image!"
            );
            return;
          }
          fetch("/api/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.error) {
                console.error("Error updating profile picture:", result.error);
                customToast(
                  "error",
                  "Oops",
                  "there was an issue while updating the profile picture!"
                );
                return;
              }
              localStorage.setItem(
                "techit-user",
                JSON.stringify({ ...userState, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [image]);

  const removePhoto = () => {
    fetch("/api/updatepic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: "https://res.cloudinary.com/techitcloud/image/upload/v1660983423/profile_depnam.png",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.error("Error removing profile picture:", result.error);
          customToast(
            "error",
            "Oops",
            "there was an issue while removing the profile picture!"
          );
          return;
        }
        localStorage.setItem(
          "techit-user",
          JSON.stringify({
            ...userState,
            pic: "https://res.cloudinary.com/techitcloud/image/upload/v1660983423/profile_depnam.png",
          })
        );
        dispatch({
          type: "UPDATEPIC",
          payload:
            "https://res.cloudinary.com/techitcloud/image/upload/v1660983423/profile_depnam.png",
        });
      });

    setImage(null);
  };

  const updatePosition = () => {
    fetch("/api/position", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        position: position,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.error("Error updating position:", result.error);
          customToast(
            "error",
            "Oops",
            "there was an issue while updating the position!"
          );
          return;
        }
        localStorage.setItem(
          "techit-user",
          JSON.stringify({
            ...userState,
            position: position,
          })
        );
        dispatch({
          type: "UPDATEPOSITION",
          payload: position,
        });
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              position: position,
            },
          };
        });
      });
  };

  const updateBio = () => {
    fetch("/api/bio", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        bio: bio,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.error("Error updating bio:", result.error);
          customToast(
            "error",
            "Oops",
            "there was an issue while updating the bio!"
          );
          return;
        }
        localStorage.setItem(
          "techit-user",
          JSON.stringify({
            ...userState,
            bio: bio,
          })
        );
        dispatch({
          type: "UPDATEBIO",
          payload: bio,
        });
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              bio: bio,
            },
          };
        });
      });
  };

  const followUser = () => {
    if (!userState) {
      const btn = <a href={"/login"}>Login</a>;
      customToast(
        "error",
        "Login Required!",
        "Please login to follow a user",
        btn
      );
      return;
    }
    fetch("/api/follow", {
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
        if (data.error) {
          console.error("Error following user:", data.error);
          customToast(
            "error",
            "Oops",
            "there was an issue while following the user!"
          );
          return;
        }
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
    fetch("/api/unfollow", {
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
        if (data.error) {
          console.error("Error unfollowing user:", data.error);
          customToast(
            "error",
            "Oops",
            "there was an issue while unfollowing the user!"
          );
          return;
        }
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

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    // <div className="">hello</div>
    <>
      <div className={`profile-body body`}>
        <Navbar />
        <div className="profile main-container">
          <main>
            {isProfileLoading && <ProfileSkeleton />}

            {!isProfileLoading && profile && (
              <>
                <section className="personal-info flex relative justify-start w-full rounded-sm px-8 pt-8 pb-12 border-[1px] border-[#c8c8c8] bg-white">
                  <div className="profile-image h-[8rem] w-[8rem] overflow-hidden flex justify-center items-center flex-shrink-0 mr-8 rounded-[50%]">
                    <img
                      className="h-[8rem] w-[8rem] object-cover object-center"
                      src={profile.user.pic}
                      alt={`${profile.user.userName}'s profile picture`}
                    />
                  </div>
                  <div className="profile-text w-full">
                    <div className="flex justify-between">
                      <p className="text-3xl font-medium">
                        {profile.user.userName}
                      </p>
                      <div className="options relative">
                        {userState?._id === userid ? (
                          <button
                            onClick={() =>
                              setIsEditDropdownOpen(!isEditDropdownOpen)
                            }
                            className="option-btn"
                          >
                            Edit Profile
                          </button>
                        ) : showfollow ? (
                          <button
                            className="option-btn text-white bg-[#2c67fc]"
                            onClick={() => followUser()}
                          >
                            Follow
                          </button>
                        ) : (
                          <button
                            className="option-btn text-black bg-white"
                            onClick={() => unFollowUser()}
                          >
                            Unfollow
                          </button>
                        )}
                        {isEditDropdownOpen && (
                          <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 w-fit">
                            <div className="py-2 w-fit">
                              <div className="relative inline-block hover:bg-gray-100 dark:hover:bg-gray-700">
                                <button
                                  onClick={() => setIsEditDropdownOpen(false)}
                                  className="flex items-center space-x-3 w-fit px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                  Update Profile Picture
                                </button>
                                <input
                                  type="file"
                                  onChange={(e) => {
                                    // removePhoto();
                                    updatePhoto(e.target.files[0]);
                                  }}
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                              </div>

                              <button
                                onClick={() => {
                                  removePhoto();
                                  setIsEditDropdownOpen(false);
                                }}
                                className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                              >
                                <span className="text-sm">
                                  Remove Profile Picture
                                </span>
                              </button>
                              <button
                                onClick={() => {
                                  setIsDialogBio(false);
                                  dialog.showModal();
                                  setIsEditDropdownOpen(false);
                                  // bioDialog.close();
                                }}
                                className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                              >
                                <span className="text-sm">Update Position</span>
                              </button>
                              <button
                                onClick={() => {
                                  setIsDialogBio(true);
                                  dialog.showModal();
                                  setIsEditDropdownOpen(false);
                                }}
                                className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                              >
                                <span className="text-sm">Update Bio</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 mb-3 text-base">
                      {profile.user.position}
                    </p>

                    <div className="numbers">
                      <div>
                        <p>{profile.user.followers.length}</p>
                        Followers
                      </div>
                      <div>
                        <p>{profile.user.following.length}</p> Following
                      </div>
                    </div>
                    <p className="bio">{profile.user.bio}</p>
                  </div>
                </section>
                <dialog id="dialog">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      isDialogBio ? updateBio() : updatePosition();
                      dialog.close();
                    }}
                  >
                    <textarea
                      maxLength={`${isDialogBio ? "160" : "42"}`}
                      placeholder={`Enter ${isDialogBio ? "Bio" : "Position"}`}
                      value={isDialogBio ? bio : position}
                      onChange={(e) => {
                        isDialogBio
                          ? setBio(e.target.value)
                          : setPosition(e.target.value);
                      }}
                    />
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          dialog.close();
                        }}
                      >
                        Close
                      </button>
                      <input type="submit" value="Done" />
                    </div>
                  </form>
                </dialog>
              </>
            )}
            {(isProfileLoading || profile) &&
              <>
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
                        : "bg-transparent text-black dark:text-white"
                    }`}
                    onClick={() => setIsNotice(false)}
                  >
                    Posts
                  </span>
                  <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-6 text-sm font-medium ${
                      isNotice
                        ? "bg-blue-500 text-white"
                        : "bg-transparent text-black dark:text-white"
                    }`}
                    onClick={() => setIsNotice(true)}
                  >
                    Notice
                  </span>
                </div>
              </>
            }
          </main>

          {!isNotice && (
            <section className="posts">
              {!isProfileLoading &&
                posts.length > 0 &&
                posts.map((post) => {
                  return (
                    <Post
                      post={post}
                      onLike={(type, postId) =>
                        likePost(type, postId, posts, setPosts)
                      }
                      onDelete={(postId) => deletePost(postId, posts, setPosts)}
                    />
                  );
                })}
              {isPostsloading && <FeedSkeleton />}
              {!isPostsloading && profile && posts.length === 0 && (
                <NoDataCard title="No Posts to Show!" message="" />
              )}
            </section>
          )}

          {isNotice && (
            <section className="notices">
              {!isProfileLoading &&
                noticeData.length > 0 &&
                noticeData.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="notice rounded-md border-[1px] border-[#c8c8c8] px-[1.25em] py-[1em] mb-[1.5em] pr-[2em] bg-white"
                    >
                      <div className="owner flex justify-left items-center">
                        <Link
                          className="pfp-image h-8 w-8 overflow-hidden flex justify-center items-center mr-[1em] rounded-[50%]"
                          to={`/profile/${item.postedBy._id}`}
                        >
                          <img
                            src={item.postedBy.pic}
                            alt={`${item.postedBy.userName}'s pfp`}
                            className="h-8 object-cover object-center"
                          />
                        </Link>
                        <p className="username">
                          <Link to={`/profile/${item.postedBy._id}`}>
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
                      <p id="desc" className="my-[1em] text-sm tracking-tight">
                        {item.desc}
                      </p>
                      {item.links &&
                        item.links.map((link, index) => {
                          return (
                            <a
                              className="mr-[1em] text-blue-500"
                              href={`${link}`}
                              target="_blank"
                            >
                              link {index + 1}
                            </a>
                          );
                        })}
                    </div>
                  );
                })}
              {isNoticesloading && <NoticeFeedSkeleton />}
              {!isNoticesloading && profile && noticeData.length === 0 && (
                <NoDataCard title="No Notices to Show!" message="" />
              )}
            </section>
          )}

          {!isProfileLoading && !profile && (
            <NoDataCard
              title="This User doesn't exist!"
              message="Try searching for another user or go to Home."
            />
          )}
        </div>
        <RightBar displayToggle={false} />
      </div>
    </>
  );
};

export default Profile;
