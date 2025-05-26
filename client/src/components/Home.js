import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../Styles/home.css";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import RightBar from "./RightBar";
import Post from "./Post";
import { deletePost, likePost } from "../lib/utils";

const Home = () => {
  const [posts, setPosts] = useState([]);
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

  // if (!rendered) {
  //   return (
  //     <div className="flex gap-4 w-fit absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
  //       {/* animation-delay added in global.css */}
  //       <div className="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce blue-circle"></div>
  //       <div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle"></div>
  //       <div className="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce red-circle"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="body">
      {/* className={`bg-[#f8f8f8] ${darkClass}`} */}
      <Navbar image={userState ? userState.pic : ""} />
      <div className="main-container">
        <main>
          {rendered ? posts.map((post) => {
            return (
              <Post
                post={post}
                onLike={(type, postId) =>
                  likePost(type, postId, posts, setPosts)
                }
                onDelete={(postId) => deletePost(postId, posts, setPosts)}
              />
            );
          })
          :
          <></>
        }
        </main>
      </div>
      <RightBar displayToggle={true} activeFeed={activeFeed} />
    </div>
  );
};

export default Home;
