import {
  React,
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../Styles/home.css";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import RightBar from "./RightBar";
import Post from "./Post";
import { deletePost, likePost } from "../lib/utils";
import NoDataCard from "./NoDataCard";
import FeedSkeleton from "./FeedSkeleton";
import useCustomToast from "../hooks/use-custom-toast";
import { BottomNavbar } from "./BottomNavbar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { userState, dispatch } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [loadFeed, setLoadFeed] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFeed = searchParams.get("feed") ?? "for-you";
  const { customToast } = useCustomToast();
  const LIMIT = 4;

  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    page !== 1 ? setPage(1) : setLoadFeed(prev => !prev);
    setPosts([]);
    setHasMore(true);
  }, [activeFeed]);

  useEffect(() => {
    let isStale = false;
    const controller = new AbortController();
    
    const fetchPosts = () => {
      if(activeFeed === "following" && !userState?._id) return;
      setLoading(true);

      fetch(
        `/api/posts?feed=${activeFeed}&page=${page}&limit=${LIMIT}${
          userState?._id ? "&userId=" + userState._id : ""
        }`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        },
        {
          signal: controller.signal
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (isStale) return;
          if (result.error) {
            console.error("Error fetching posts:", result.error);
            customToast(
              "error",
              "Oops",
              "there was an issue while fetching posts!"
            );
            return;
          }
          if (result.posts.length < LIMIT) {
            setHasMore(false);
          }
          if (page === 1) {
            setPosts(result.posts);
          } else {
            setPosts((prev) => [...prev, ...result.posts]);
          }
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.warn("Fetch posts aborted due to component unmounting.");
            return;
          }
          console.error("Unexpected fetch posts error:", err);
        });
    };
 
    fetchPosts();

    return () => {
      isStale = true;
      controller.abort();
    };

  }, [page, loadFeed, userState?._id]);

  return (
    <div className="body">
      {/* className={`bg-[#f8f8f8] ${darkClass}`} */}
      <Navbar />
      <div className="main-container mb-16 lg:mb-0">
        <main>
          {posts.length > 0 &&
            posts.map((post, i) => {
              return (
                <Post
                  ref={i === posts.length - 2 ? lastPostRef : null}
                  key={`${post._id}-post`}
                  post={post}
                  onLike={(type, postId) =>
                    likePost(type, postId, posts, setPosts)
                  }
                  onDelete={(postId) => deletePost(postId, posts, setPosts)}
                />
              );
            })}
          {loading && <FeedSkeleton />}
          {!loading && posts.length === 0 && (
            <NoDataCard
              title="No Posts to Show!"
              message="Try Following more users or go to home."
            />
          )}
        </main>
      </div>
      <RightBar displayToggle={true} activeFeed={activeFeed} />
      <BottomNavbar />
    </div>
  );
};

export default Home;
