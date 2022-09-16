import { useParams } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";
import "../Styles/profile.css";
import { Link } from "react-router-dom";
import cross from "../images/cross2.svg";
import cssTricks from "../images/CSS tricks.jpeg";
import mrElegant from "../images/mr elegant.jpeg";
import Navbar from "./Navbar";
import { UserContext } from "../App";

const Profile = () => {
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(null);
  const { userState, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(
    userState ? !userState.following?.includes(userid) : true
  );

  const [showPost, setShowPost] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
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
  return (
    // <div className="">hello</div>
    <>
      {profile ? (
        <div className={`profile-body body ${darkClass}`}>
          <Navbar image={userState ? userState.pic : ""} />
          <div className="profile">
            <section className="personal-info">
              <div className="pfp-image">
                <img
                  className="pfp"
                  src={profile.user.pic}
                  alt="Profile picture"
                />
              </div>
              <div className="text">
                <p className="userName">{profile.user.userName}</p>
                <p className="college">
                  Thadomal Shahani Engineering College, Bandra (W)
                </p>
                <p className="desc">
                  An Elegant history teacher and the housemaster of dormitory 3,
                  Cecile Hall at Eden Academy
                </p>
                <div className="numbers">
                  <p>{profile.posts.length} Posts</p>
                  <p>{profile.user.followers.length} Followers</p>
                  <p>{profile.user.following.length} Following</p>
                </div>
              </div>
              <div className="follow">
                {showfollow ? (
                  <button
                    style={{
                      color: "white",
                      backgroundColor: "rgb(46, 95, 220)",
                    }}
                    onClick={() => followUser()}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    style={{
                      color: "rgb(4 63 214)",
                      backgroundColor: "rgb(218 205 252)",
                    }}
                    onClick={() => unFollowUser()}
                  >
                    Unfollow
                  </button>
                )}
              </div>
            </section>
            <div className="line"></div>
            <section className="post-type">
              <p>Doubts</p>
              <p>Posts</p>
              <p>Informative</p>
            </section>
            {/* <section className="posts">
              {profile.posts.map((item) => {
                return (
                  <div className="post" key={item._id}>
                    <section>
                      <p>{item.title}</p>
                    </section>
                    <section>
                      <img src={item.photo} alt={item.title}></img>
                      <div>
                        <a href={item.link1} target="_blank">
                          <p>Code</p>
                        </a>
                        <a href={item.link2} target="_blank">
                          <p>Demo</p>
                        </a>
                      </div>
                    </section>
                  </div>
                );
              })}
            </section> */}
            <section className="posts">
              {profile.posts?.map((item) => {
                return (
                  <div
                    onClick={() => {
                      setShowPost(true);
                      setDarkClass("dark_bg");
                      setCurrentItem(item);
                    }}
                    className="profile-post"
                    key={item._id}
                  >
                    <section>
                      <p>{item.title}</p>
                    </section>
                    <section>
                      <img
                        id={item._id}
                        src={item.photo}
                        alt={item.title}
                      ></img>
                      {() => {
                        setDimensions(item._id);
                      }}
                    </section>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
      {showPost && (
        <>
          <div className="post overlapping-post" key={currentItem._id}>
            <section className="left">
              <p
                className="cross"
                onClick={() => {
                  setShowPost(false);
                  setDarkClass(null);
                }}
              >
                <img src={cross} />
              </p>
              <div className="owner">
                <div className="pfp-image">
                  <img src={profile?.user.pic} alt="" />
                </div>
                <p>
                  <Link
                    to={
                      currentItem.postedBy._id != userState._id
                        ? "/profile/" + currentItem.postedBy._id
                        : "/profile"
                    }
                  >
                    {/* {currentItem.postedBy.userName} */}
                    {profile?.user.userName}
                  </Link>
                </p>
              </div>
              <p id="title">{currentItem.title}</p>
              {/* <p>{item.category}</p> */}
              <p id="desc">{currentItem.desc}</p>
            </section>
            <section className="right">
              <div className="images">
                <img src={currentItem.photo} alt="post" />
              </div>
              <div className="mid">
                <div className="links">
                  {currentItem.link1 && (
                    <a href={currentItem.link1} target="_blank">
                      <p>Code</p>
                    </a>
                  )}
                  {currentItem.link2 && (
                    <a href={currentItem.link2} target="_blank">
                      <p>Demo</p>
                    </a>
                  )}
                </div>
                <div className="likes">
                  <p>{currentItem.likes.length} likes</p>
                  <div className="">
                    {currentItem.likes.includes(userState._id) ? (
                      <div
                        onClick={() => {
                          likePost("/unlike", currentItem._id);
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
                          likePost("/like", currentItem._id);
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
                            d="M17.4787 9.23105L17.3528 9.83333H17.9681H26.125C27.2657 9.83333 28.1913 10.7486 28.2081 11.8852L28.1998 11.9475L28.1672 12.1924L28.2083 12.2336V14.4978C28.2058 14.756 28.1552 15.0116 28.0592 15.2513L24.1669 24.3526L24.1656 24.3557C23.8535 25.0995 23.1143 25.625 22.25 25.625H10.625C9.47386 25.625 8.54167 24.6928 8.54167 23.5417V10.625C8.54167 10.0543 8.77449 9.53304 9.15211 9.14958C9.1525 9.14919 9.15289 9.14879 9.15328 9.1484L17.3046 0.997108L18.325 2.00793C18.3252 2.00815 18.3254 2.00837 18.3257 2.00859C18.585 2.26829 18.7469 2.62704 18.7469 3.02354C18.7469 3.12016 18.7338 3.21993 18.7118 3.33028C18.7117 3.33097 18.7115 3.33166 18.7114 3.33236L17.4787 9.23105ZM4.95834 11.125V25.625H0.791672V11.125H4.95834Z"
                            fill="white"
                            stroke="black"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="comment">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, currentItem._id);
                  }}
                >
                  <textarea rows="1" placeholder="Add a comment" />
                  <input type="submit" value="Post" />
                </form>
                {currentItem.comments.length != 0 ? (
                  <span
                    onClick={() => {
                      setShowComment(true);
                      setDarkClass("dark_bg");
                      setCurrentItem(currentItem);
                    }}
                  >
                    View all {currentItem.comments.length} comments
                  </span>
                ) : (
                  ""
                )}
              </div>
            </section>
          </div>
        </>
      )}
      {showComment && (
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
                      <img src={profile?.user.pic} alt="" />
                    </div>
                    <p>
                      <Link
                        to={
                          currentItem.postedBy._id != userState._id
                            ? "/profile/" + currentItem.postedBy._id
                            : "/profile"
                        }
                      >
                        {/* {currentItem.postedBy.userName} */}
                        {profile?.user.userName}
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

export default Profile;
