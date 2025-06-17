import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import RightBar from "./RightBar";
import Post from "./Post";
import { deletePost, likePost, makeComment } from "../lib/utils";
import PostSkeleton from "./ui/PostSkeleton";
import useCustomToast from "../hooks/use-custom-toast";
import NoDataCard from "./NoDataCard";
import { BottomNavbar } from "./BottomNavbar";
// import "../Styles/home.css";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { postid } = useParams();
  const { customToast } = useCustomToast();

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/posts/${postid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.error("Error fetching post details:", result.error);
          customToast(
            "error", "Oops", "there was an issue while fetching the post, it probably doesn't exist!"
          );
          setPost(null);
          setIsLoading(false);
          return;
        }
        setPost(result.post);
        setIsLoading(false);
      });
  }, [postid]);

  return (
    <>
      <div className="body">
        <Navbar />
        <div className="main-container mb-16 lg:mb-0">
          <main>
            {post && (
              <Post
                post={post}
                onLike={(type, postId) => likePost(type, postId, post, setPost)}
                onComment={(text, postId) =>
                  makeComment(text, postId, post, setPost)
                }
                onDelete={(postId) => deletePost(postId, post, setPost)}
                showComment={true}
              />
            )}
            {isLoading && <PostSkeleton />}
            {!isLoading && !post && (
              <NoDataCard
                title="This Post doesn't exist!"
                message="Try searching for another Post or go to Home."
              />
            )}
          </main>
        </div>
        <RightBar displayToggle={false} />
        <BottomNavbar />
      </div>
    </>
  );
};

export default PostDetails;
