import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import RightBar from "./RightBar";
import Post from "./Post";
import { deletePost, likePost, makeComment } from "../lib/utils";
// import "../Styles/home.css";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [rendered, setRendered] = useState(false);
  const { userState, dispatch } = useContext(UserContext);
  const { postid } = useParams();

  useEffect(() => {
    fetch(`/api/posts/${postid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.error) {
          console.error("Error fetching post details:", result.error);
          alert("Oops, there was an issue while fetching the post details!");
          return;
        } 
        setPost(result.post);
        setRendered(true);
      });
  }, []);

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
    <>
      <div className="body">
        <Navbar />
        <div className="main-container">
          <main>
            {post && (
              <Post
                post={post}
                onLike={(type, postId) => likePost(type, postId, post, setPost)}
                onComment={(text, postId) => makeComment(text, postId, post, setPost)}
                onDelete={(postId) => deletePost(postId, post, setPost)}
                showComment={true}
              />
            )}
          </main>
        </div>
        <RightBar
          displayToggle={false}
        />
      </div>
    </>
  );
};

export default PostDetails;
