import { React, useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import RightBar from "./RightBar";
import "../Styles/home.css";
import cross from "../images/cross2.svg";
import Post from "./Post";
import { likePost } from "../lib/utils";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("Informative");
  const [showComment, setShowComment] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [darkClass, setDarkClass] = useState(null);
  const [dropdown, setDropdown] = useState("");
  const [display, setDisplay] = useState("none");
  const navigate = useNavigate();
  const [rendered, setRendered] = useState(false);
  const { userState, dispatch } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFeed = searchParams.get("feed") ?? "for-you";

  useEffect(() => {
    fetch(
      `/posts?feed=${activeFeed}&page=${page}${
        userState ? "&userId=" + userState._id : ""
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.posts);
        setRendered(true);
      });
  }, [activeFeed, page, userState?._id]);

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
        const newData = posts.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newData);
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
          const newData = posts.filter((item) => {
            return item._id !== result._id;
          });
          setPosts(newData);
        });
    }
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

  // classes.underlineBlue.join(" ") : ""

  const classes = {
    "post-width": "[50vw]",
    "post-height": "[95vh]",
    "image-height": "[60vh]",
    blue: "#4e67e4",
    "light-blue": "#c6e7fc",
    "light-blue-2": "#a9ccff",
    "light-blue-3": "#f7f9ff",
    "light-grey-bg": "#f8f8f8",
    "grayish-blue": "#dedeff",
    "dark-blue": "#2a4365",
    "dark-blue-2": "#25256e",
    "darker-blue": "#062653",
  };

  return (
    <>
      {/* className={`bg-[#f8f8f8] ${darkClass}`} */}
      <div className="relative flex justify-center gap-4 w-[95vw] mx-auto">
        <Navbar image={userState ? userState.pic : ""} />
        <div className="home-body body">
          <main>
            {posts.map((post) => {
              return (
                <Post
                  post={post}
                  onLike={(type, postId) => likePost(type, postId, posts, setPosts)}
                  onComment={makeComment}
                  onDelete={deletePost}
                />
              );
            })}
          </main>
        </div>
        {/* {showComment && <Comments opacity="1" item={currentItem} />} */}
        <RightBar
          displayToggle={true}
          posts={posts ? posts : []}
          isNotices={false}
        />
      </div>
      {/* {showComment && (
        <>
          <div className="overlapping-post-wrapper">
            <div className="overlapping-post">
              <p
                className="cross"
                onClick={() => {
                  setShowComment(false);
                  setDarkClass(null);
                }}
              >
                <img src={cross} />
              </p>
              <div className="left">
                <img src={currentItem?.photo} alt="post_image" />
                <div className="comment comment-2">
                  <form
                    onSubmit={(e) => {
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
                          currentItem.postedBy._id != userState?._id
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

export default Home;
