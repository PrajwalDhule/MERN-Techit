import { React, useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../Styles/home.css";

const FollowedPosts = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [color, setColor] = useState("#FFFFFF");
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    fetch("/followedposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
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
        console.log(result);
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
        console.log(result);
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
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="home-body body">
        <div className="post-option">
          <p>
            <Link to="/followedposts">Following</Link>
          </p>
          <p>
            <Link to="/">all</Link>
          </p>
        </div>
        <main>
          {data.map((item) => {
            console.log(item);
            return (
              <div className="post" key={item._id}>
                <section className="left">
                  <div className="owner">
                    <img src="#" alt="" />
                    <Link
                      to={
                        item.postedBy._id != state._id
                          ? "/profile/" + item.postedBy._id
                          : "/profile"
                      }
                    >
                      <p>{item.postedBy.userName}</p>
                    </Link>
                  </div>
                  <p id="title">{item.title}</p>
                  {item.postedBy._id == state._id && (
                    <p onClick={() => deletePost(item._id)}>delete post</p>
                  )}
                  <p id="desc">{item.desc}</p>
                  <p>{item.category}</p>
                </section>
                <section className="right">
                  <div className="images">
                    <div className="image">
                      <img src={item.photo} alt="" />
                    </div>
                  </div>
                  <a href={item.link1} target="_blank">
                    <p>Code</p>
                  </a>
                  <a href={item.link2} target="_blank">
                    <p>Demo</p>
                  </a>
                  <p>{item.likes.length} likes</p>
                  <div className="">
                    {item.likes.includes(state._id) ? (
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
                  <div className="replies">Replies</div>
                  {item.comments.map((record) => {
                    return (
                      <div key={record._id}>
                        <span>{record.postedBy.userName}</span>
                        <span>{record.text}</span>
                      </div>
                    );
                  })}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      makeComment(e.target[0].value, item._id);
                    }}
                  >
                    <input type="text" placeholder="add a comment" />
                    <input type="submit" />
                  </form>
                </section>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default FollowedPosts;
