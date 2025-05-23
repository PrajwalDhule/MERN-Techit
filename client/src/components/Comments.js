import { React, useState, useEffect, useContext } from "react";
import "../Styles/comments.css";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const Comments = ({ postId, onComment = null }) => {
  const [comments, setComments] = useState([]);
  const { userState, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch(`/posts/${postId}/comments`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setComments(result.comments);
      });
  }, [postId]);

  return (
    <div className="comments-container">
      <div className="comment">
        <form
          onSubmit={(e) => {
            if(onComment) onComment(e.target[0].value, postId);
          }}
        >
          <textarea
            rows="1"
            placeholder="Add a comment"
            className="rounded-md border-[1.5px] bg-[#bbbbbb2b] border-solid border-inner-border p-4 text-sm focus-within:outline-none"
          />
          <input type="submit" value="Post" />
        </form>
      </div>

      <div className="mt-6 ml-0 mr-auto">
        {comments.map((comment) => {
          return (
            <div
              className="flex justify-center items-start ml-0 mr-auto my-4"
              key={comment._id}
            >
              <div className="@apply self-start h-[4.5vh] w-[4.5vh] overflow-hidden rounded-[50%]">
                <img
                  className=" h-full object-cover object-center"
                  src={comment.postedBy.pic}
                />
              </div>
              <div className="mr-auto ml-[1em] mt-[8px] w-[90%] text-sm">
                <span className="mr-[1em] font-semibold cursor-pointer">
                  <Link
                    to={
                      comment.postedBy._id != userState?._id
                        ? "/profile/" + comment.postedBy._id
                        : "/profile"
                    }
                    className="comment-user-name"
                  >
                    {comment.postedBy.userName}
                  </Link>
                </span>
                {/* <span className="mr-auto ml-0 cursor-pointer"> */}
                {comment.text}
                {/* </span> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
