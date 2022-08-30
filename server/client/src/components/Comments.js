import { React, useState, useEffect, useContext } from "react";
import "../Styles/comments.css";

const Comments = (props) => {
  const [opacity, setOpacity] = useState(props.opacity);
  return (
    <div className="comments" style={{ opacity: `${opacity}` }}>
      <p
        onClick={() => {
          setOpacity("0");
        }}
      >
        cross
      </p>
      <div className="comment">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // makeComment(e.target[0].value, props.item?._id);
          }}
        >
          <textarea rows="1" placeholder="Add a comment" />
          <input type="submit" />
        </form>
      </div>
      <div className="replies">
        {props.item?.comments.map((record) => {
          return (
            <div key={record._id} className="reply">
              <span>{record.postedBy.userName}</span>
              <span>{record.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
