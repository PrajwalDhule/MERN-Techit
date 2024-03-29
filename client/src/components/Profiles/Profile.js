import { React, useEffect, useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../App";
import Navbar from "../Navbar";
import RightBar from "../RightBar";
// import EditBioDialog from "./EditBioDialog";
import "../../Styles/profile.css";
import settings from "../../images/settings.png";
import liked from "../../images/liked.svg";
import notLiked from "../../images/notLiked.svg";

const Profile = () => {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const { userState, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [darkClass, setDarkClass] = useState(null);
  const [position, setPosition] = useState("");
  const [bio, setBio] = useState("");
  const [display, setDisplay] = useState("none");
  const [isNotice, setIsNotice] = useState(false);
  const [likesData, setLikesData] = useState({});
  const [noticeData, setNoticeData] = useState([]);
  const [isDialogBio, setIsDialogBio] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  let bioDialog = document.getElementById("bioDialog");

  const setDimensions = (id) => {
    var img = document.getElementById(id);
    if (img.naturalWidth * 9 < img.naturalHeight * 16) {
      img.style.width = "";
      img.style.height = "100%";
    }
  };

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
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.mypost);

        const initialLikesData = result.mypost.reduce((acc, post) => {
          const { _id, likes } = post;
          acc[_id] = likes;
          return acc;
        }, {});

        setLikesData(initialLikesData);
      });
  }, []);

  useEffect(() => {
    fetch(`/usernotices/${userState?._id}`, {
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
          fetch("/updatepic", {
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
              localStorage.setItem(
                "user",
                JSON.stringify({ ...userState, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  const removePhoto = () => {
    fetch("/updatepic", {
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
        localStorage.setItem(
          "user",
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
    fetch("/position", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        position: inputRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userState,
            position: inputRef.current.value,
          })
        );
        dispatch({
          type: "UPDATEPOSITION",
          payload: inputRef.current.value,
        });
      });
  };

  // const updateBio = () => {
  //   console.log(inputRef.current.value);
  //   setBio(inputRef.current.value);
  // };
  const updateBio = () => {
    fetch("/bio", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        bio: inputRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userState,
            bio: inputRef.current.value,
          })
        );
        dispatch({
          type: "UPDATEBIO",
          payload: inputRef.current.value,
        });
      });
  };

  const likePost = (type, postId) => {
    fetch(type, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: postId,
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

        setLikesData((prevLikesData) => {
          const updatedLikesData = { ...prevLikesData };
          if (type == "/like") {
            updatedLikesData[postId] = [
              ...updatedLikesData[postId],
              userState._id,
            ];
          } else {
            updatedLikesData[postId] = updatedLikesData[postId].filter(
              (id) => id !== userState._id
            );
          }
          return updatedLikesData;
        });
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

  const handlePostClick = (item) => {
    navigate(`/posts/${item._id}`);
  };

  const handleLinkClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className={`profile-body body ${darkClass}`}>
        <Navbar image={userState ? userState.pic : ""} />
        <RightBar displayToggle={false} data={data ? data : ""} filter={true} />
        <div className="profile">
          <div></div>
          <section className="personal-info">
            <div>
              <div className="pfp-container">
                <div className="pfp-img-wrapper">
                  <img
                    className="pfp"
                    src={userState ? userState.pic : ""}
                    alt="Profile picture"
                  />
                </div>
              </div>
            </div>
            <div className="text">
              <p className="userName">
                {userState ? userState.userName : "loading"}
              </p>
              <p className="position">
                {/* Tech Lead @LosPollos */}
                {userState?.position}
              </p>
              <div className="numbers">
                {/* <p>{posts.length} Posts</p> */}
                <div>
                  <p>{userState ? userState.followers?.length : 0}</p> Followers
                </div>
                <div>
                  <p>{userState ? userState.following?.length : 0}</p> Following
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
              <div
                className=""
                style={{ display: display, position: "absolute" }}
              >
                {/* <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updatePosition();
                  }}
                >
                  <textarea
                    rows="3"
                    cols="50"
                    placeholder="Enter Position name"
                    // value=""
                    // onChange={() => {}}
                    ref={inputRef}
                  ></textarea>
                  <input type="submit" value="Done" />
                </form>
                <p onClick={() => setDisplay("none")}>cross</p> */}
              </div>
              <p className="bio">{userState?.bio}</p>

              {/* {console.log(userState)} */}
            </div>
            <div className="options">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="settings"
              >
                Edit Profile
              </button>
              {showOptions && (
                <div className="option-list">
                  <div>
                    <input
                      type="file"
                      onChange={(e) => {
                        // removePhoto();
                        updatePhoto(e.target.files[0]);
                      }}
                    />
                    <p>Update Profile Picture</p>
                  </div>
                  <p onClick={() => removePhoto()}>Remove Profile Picture</p>
                  <p
                    onClick={() => {
                      setIsDialogBio(false);
                      bioDialog.showModal();
                    }}
                  >
                    Update Position
                  </p>
                  {/* <p onClick={() => setDisplay("block")}>Update Bio</p> */}
                  <p
                    onClick={() => {
                      setIsDialogBio(true);
                      bioDialog.showModal();
                    }}
                  >
                    Update Bio
                  </p>
                </div>
              )}
            </div>
          </section>
          <dialog id="bioDialog">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isDialogBio ? updateBio() : updatePosition();
                bioDialog.close();
              }}
            >
              <input
                type="text"
                maxLength={`${isDialogBio ? "160" : "42"}`}
                placeholder="Enter Bio"
                ref={inputRef}
                // value={userState?.bio}
              />
              <div>
                <button
                  type="button"
                  onClick={() => {
                    bioDialog.close();
                  }}
                >
                  Close
                </button>
                <input type="submit" value="Done" />
              </div>
            </form>
          </dialog>

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
              {posts.length != 0 ? (
                posts?.map((item) => {
                  // console.log("post: ", item);
                  return (
                    <div
                      className="profile-post cursor-pointer"
                      onClick={(e) => {
                        // setShowPost(true);
                        // setDarkClass("dark_bg");
                        // setCurrentItem(item);
                        handlePostClick(item);
                      }}
                      key={item._id}
                    >
                      <section className="left">
                        <div className="owner">
                          <div className="pfp-image">
                            <img
                              src={userState?.pic}
                              alt={`${userState.userName}'s pfp`}
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
                                onClick={(e) => {
                                  deletePost(item._id);
                                  handleLinkClick(e);
                                }}
                              >
                                delete post
                              </p>
                            </>
                          )}
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
                                {likesData[item._id].includes(userState._id) ? (
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
                              <p>{likesData[item._id].length} likes</p>
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
                          {/* {item.comments.length != 0 ? (
                        <span
                          onClick={() => {
                            // setShowComment(true);
                            // setDarkClass("dark_bg");
                            setCurrentItem(item);
                          }}
                        >
                          View all {item.comments.length} comments
                        </span>
                      ) : (
                        ""
                      )} */}
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
                      <p id="desc" className="my-[1em] text-sm tracking-tight">
                        {item.desc}
                      </p>
                      {item.links &&
                        item.links.map((link, index) => {
                          return (
                            <Link
                              className="mr-[1em] text-blue-500"
                              to={`${link}`}
                              key={index}
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
      {showPost && (
        // <div className="overlapping-post-wrapper">
        //   <div className="overlapping-post" key={currentItem._id}>
        //     <section className="left">
        //       <p
        //         className="cross"
        //         onClick={() => {
        //           setShowPost(false);
        //           setDarkClass(null);
        //         }}
        //       >
        //         <img src={cross} />
        //       </p>
        //       <div className="owner">
        //         <div className="pfp-image">
        //           <img src={userState.pic} alt="" />
        //         </div>
        //         <p>
        //           <Link
        //             to={
        //               currentItem.postedBy._id != userState._id
        //                 ? "/profile/" + currentItem.postedBy._id
        //                 : "/profile"
        //             }
        //           >
        //             {currentItem.postedBy.userName}
        //           </Link>
        //         </p>
        //         {currentItem.postedBy._id == userState._id && (
        //           <>
        //             <p
        //               className="editPost"
        //               onClick={() => {
        //                 // editPost(item._id);
        //               }}
        //             >
        //               edit post
        //             </p>
        //             <p
        //               className="deletePost"
        //               onClick={() => {
        //                 deletePost(currentItem._id);
        //               }}
        //             >
        //               delete post
        //             </p>
        //           </>
        //         )}
        //       </div>
        //       <p id="title">{currentItem.title}</p>
        //       {/* <p>{item.category}</p> */}
        //       <p id="desc">{currentItem.desc}</p>
        //     </section>
        //     <section className="right">
        //       <div className="images">
        //         <img src={currentItem.photo} alt="post" />
        //       </div>
        //       <div className="mid">
        //         <div className="links">
        //           {currentItem.link1 && (
        //             <a href={currentItem.link1} target="_blank">
        //               <p>Code</p>
        //             </a>
        //           )}
        //           {currentItem.link2 && (
        //             <a href={currentItem.link2} target="_blank">
        //               <p>Demo</p>
        //             </a>
        //           )}
        //         </div>
        //         <div className="likes">
        //           <p>{currentItem.likes.length} likes</p>
        //           <div className="">
        //             {currentItem.likes.includes(userState._id) ? (
        //               <div
        //                 onClick={() => {
        //                   likePost("/unlike", currentItem._id);
        //                 }}
        //                 className=""
        //               >
        //                 <svg
        //                   width="29"
        //                   height="27"
        //                   viewBox="0 0 29 27"
        //                   fill="none"
        //                   xmlns="http://www.w3.org/2000/svg"
        //                 >
        //                   <path
        //                     d="M11.5213 17.1856L11.6472 16.5833H11.0319L2.87499 16.5833C1.73434 16.5833 0.808683 15.6681 0.791893 14.5314L0.80019 14.4692L0.832848 14.2243L0.79166 14.1831L0.79166 11.9189C0.794241 11.6606 0.844826 11.4051 0.940832 11.1653L4.83306 2.06411L4.83439 2.06095C5.14646 1.31719 5.88567 0.791668 6.74999 0.791668L18.375 0.791668C19.5261 0.791668 20.4583 1.72385 20.4583 2.875L20.4583 15.7917C20.4583 16.3623 20.2255 16.8836 19.8479 17.2671C19.8475 17.2675 19.8471 17.2679 19.8467 17.2683L11.6954 25.4196L10.675 24.4087C10.6748 24.4085 10.6746 24.4083 10.6743 24.4081C10.415 24.1484 10.2531 23.7896 10.2531 23.3931C10.2531 23.2965 10.2662 23.1967 10.2882 23.0864C10.2883 23.0857 10.2885 23.085 10.2886 23.0843L11.5213 17.1856ZM24.0417 15.2917L24.0417 0.791668L28.2083 0.791668L28.2083 15.2917L24.0417 15.2917Z"
        //                     fill="white"
        //                     stroke="black"
        //                   />
        //                 </svg>
        //               </div>
        //             ) : (
        //               <div
        //                 onClick={() => {
        //                   likePost("/like", currentItem._id);
        //                 }}
        //                 className=""
        //               >
        //                 <svg
        //                   width="29"
        //                   height="27"
        //                   viewBox="0 0 29 27"
        //                   fill="none"
        //                   xmlns="http://www.w3.org/2000/svg"
        //                 >
        //                   <path
        //                     d="M17.4787 9.23105L17.3528 9.83333H17.9681H26.125C27.2657 9.83333 28.1913 10.7486 28.2081 11.8852L28.1998 11.9475L28.1672 12.1924L28.2083 12.2336V14.4978C28.2058 14.756 28.1552 15.0116 28.0592 15.2513L24.1669 24.3526L24.1656 24.3557C23.8535 25.0995 23.1143 25.625 22.25 25.625H10.625C9.47386 25.625 8.54167 24.6928 8.54167 23.5417V10.625C8.54167 10.0543 8.77449 9.53304 9.15211 9.14958C9.1525 9.14919 9.15289 9.14879 9.15328 9.1484L17.3046 0.997108L18.325 2.00793C18.3252 2.00815 18.3254 2.00837 18.3257 2.00859C18.585 2.26829 18.7469 2.62704 18.7469 3.02354C18.7469 3.12016 18.7338 3.21993 18.7118 3.33028C18.7117 3.33097 18.7115 3.33166 18.7114 3.33236L17.4787 9.23105ZM4.95834 11.125V25.625H0.791672V11.125H4.95834Z"
        //                     fill="white"
        //                     stroke="black"
        //                   />
        //                 </svg>
        //               </div>
        //             )}
        //           </div>
        //         </div>
        //       </div>
        //       <div className="comment">
        //         <form
        //           onSubmit={(e) => {
        //             e.preventDefault();
        //             makeComment(e.target[0].value, currentItem._id);
        //           }}
        //         >
        //           <textarea rows="1" placeholder="Add a comment" />
        //           <input type="submit" value="Post" />
        //         </form>
        //         {currentItem.comments.length != 0 ? (
        //           <span
        //             onClick={() => {
        //               setShowComment(true);
        //               setDarkClass("dark_bg");
        //               setCurrentItem(currentItem);
        //             }}
        //           >
        //             View all {currentItem.comments.length} comments
        //           </span>
        //         ) : (
        //           ""
        //         )}
        //       </div>
        //     </section>
        //   </div>
        // </div>
        // <div className="overlapping-post-wrapper">
        //   <div className="overlapping-post">
        //     <p
        //       className="cross"
        //       onClick={() => {
        //         setShowPost(false);
        //         setDarkClass(null);
        //       }}
        //     >
        //       {/* cross */}
        //       <img src={cross} />
        //     </p>
        //     <div className="left">
        //       <div className="comment comment-2">
        //         <form
        //           onSubmit={(e) => {
        //             makeComment(e.target[0].value, currentItem?._id);
        //           }}
        //         >
        //           <textarea rows="1" placeholder="Add a comment" />
        //           <input type="submit" />
        //         </form>
        //       </div>
        //       <img src={currentItem?.photo} alt="post_image" />
        //       <p id="desc">{currentItem.desc}</p>
        //     </div>
        //     <div className="right">
        //       <div className="replies">
        //         <div className="owner">
        //           <div className="pfp-image">
        //             <img src={userState?.pic} alt="pfp" />
        //           </div>
        //           <p>
        //             <Link
        //               to={
        //                 currentItem.postedBy._id != userState._id
        //                   ? "/profile/" + currentItem.postedBy._id
        //                   : "/profile"
        //               }
        //             >
        //               {currentItem.postedBy.userName}
        //             </Link>
        //           </p>
        //         </div>
        //         <p id="title2">{currentItem.title}</p>
        //         <div className="line"></div>
        //         {currentItem?.comments.map((record) => {
        //           return (
        //             <div key={record._id} className="reply">
        //               <span>{record.postedBy.userName}</span>
        //               <span>{record.text}</span>
        //             </div>
        //           );
        //         })}
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <></>
      )}
      {/* {showComment && (
        <>
          <div className="comments">
            <div className="comments-body">
              <p
                className="cross"
                onClick={() => {
                  setShowComment(false);
                }}
              >
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
                      <img src={userState.pic} alt="" />
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
      )} */}
    </>
  );
};

export default Profile;
