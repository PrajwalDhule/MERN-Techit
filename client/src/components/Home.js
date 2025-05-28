import { React, useState, useEffect, useContext, useRef, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../Styles/home.css";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import RightBar from "./RightBar";
import Post from "./Post";
import { deletePost, likePost } from "../lib/utils";
import NoDataCard from "./NoDataCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  // const [rendered, setRendered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { userState, dispatch } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFeed = searchParams.get("feed") ?? "for-you";
  const limit = 5;

  const observer = useRef();
  const lastPostRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setPage(1);
    setPosts([]);
    setHasMore(true);
  }, [activeFeed]);

  useEffect(() => {
    setLoading(true);
    console.log("Fetching posts for feed:", activeFeed, "Page:", page);
    fetch(
      `/api/posts?feed=${activeFeed}&page=${page}&limit=${limit}${
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
        if(result.error) {
          console.error("Error fetching posts:", result.error);
          alert("Oops, there was an issue while fetching posts!");
          return;
        } 
        if (result.posts.length < limit) {
          setHasMore(false);
        }
        if (page === 1) {
          setPosts(result.posts);
        } else {
          setPosts((prev) => [...prev, ...result.posts]);
        }
        // setRendered(true);
        setLoading(false);
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
      <Navbar />
      <div className="main-container">
        <main>
          {posts.length > 0 && posts.map((post, i) => {
            return (
              <Post
                ref={i === posts.length - 2 ? lastPostRef : null}
                key={post._id}
                post={post}
                onLike={(type, postId) =>
                  likePost(type, postId, posts, setPosts)
                }
                onDelete={(postId) => deletePost(postId, posts, setPosts)}
              />
            );
          })}
          {loading && <>loading...</>}
          {
            !loading && posts.length === 0 && <NoDataCard title="No Posts to Show!" message="Try Following more users or go to home."/>
          }
        
        </main>
      </div>
      <RightBar displayToggle={true} activeFeed={activeFeed} />
    </div>
  );
};

export default Home;
