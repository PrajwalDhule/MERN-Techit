import React, { useState } from "react";
import "../Styles/createPost.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [code, setCode] = useState("");
  const [demo, setDemo] = useState("");

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "techit");
    data.append("cloud_name", "techitcloud");
    console.log(data);
    fetch("https://api.cloudinary.com/v1_1/techitcloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="body createPost-body">
      <svg
        className="circle"
        width="168"
        height="335"
        viewBox="0 0 335 335"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M275 137.5C275 213.439 213.439 275 137.5 275C61.5608 275 0 213.439 0 137.5C0 61.5608 61.5608 0 137.5 0C213.439 0 275 61.5608 275 137.5ZM11.9576 137.5C11.9576 206.835 68.1648 263.042 137.5 263.042C206.835 263.042 263.042 206.835 263.042 137.5C263.042 68.1648 206.835 11.9576 137.5 11.9576C68.1648 11.9576 11.9576 68.1648 11.9576 137.5Z"
          fill="blue"
          fill-opacity="0.1"
        />
      </svg>
      <svg
        className="circle"
        width="168"
        height="335"
        viewBox="0 0 335 335"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M275 137.5C275 213.439 213.439 275 137.5 275C61.5608 275 0 213.439 0 137.5C0 61.5608 61.5608 0 137.5 0C213.439 0 275 61.5608 275 137.5ZM11.9576 137.5C11.9576 206.835 68.1648 263.042 137.5 263.042C206.835 263.042 263.042 206.835 263.042 137.5C263.042 68.1648 206.835 11.9576 137.5 11.9576C68.1648 11.9576 11.9576 68.1648 11.9576 137.5Z"
          fill="blue"
          fill-opacity="0.1"
        />
      </svg>
      <svg
        className="circle"
        width="168"
        height="335"
        viewBox="0 0 335 335"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M275 137.5C275 213.439 213.439 275 137.5 275C61.5608 275 0 213.439 0 137.5C0 61.5608 61.5608 0 137.5 0C213.439 0 275 61.5608 275 137.5ZM11.9576 137.5C11.9576 206.835 68.1648 263.042 137.5 263.042C206.835 263.042 263.042 206.835 263.042 137.5C263.042 68.1648 206.835 11.9576 137.5 11.9576C68.1648 11.9576 11.9576 68.1648 11.9576 137.5Z"
          fill="blue"
          fill-opacity="0.1"
        />
      </svg>
      <svg
        className="circle"
        width="168"
        height="335"
        viewBox="0 0 335 335"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M275 137.5C275 213.439 213.439 275 137.5 275C61.5608 275 0 213.439 0 137.5C0 61.5608 61.5608 0 137.5 0C213.439 0 275 61.5608 275 137.5ZM11.9576 137.5C11.9576 206.835 68.1648 263.042 137.5 263.042C206.835 263.042 263.042 206.835 263.042 137.5C263.042 68.1648 206.835 11.9576 137.5 11.9576C68.1648 11.9576 11.9576 68.1648 11.9576 137.5Z"
          fill="blue"
          fill-opacity="0.1"
        />
      </svg>
      <p className="heading">Create a post</p>
      <form className="post-container">
        <div className="field">
          <p>Title:</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title of the post"
          />
        </div>
        <div className="field">
          <p>Category:</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            data-placeholder="Choose category"
          >
            <option value=""></option>
            <option>Doubt</option>
            <option>Informative</option>
          </select>
        </div>
        <div className="field">
          <p>Description:</p>
          <textarea
            rows="4"
            cols="50"
            placeholder="Enter description of the post"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="field">
          <p>Select pictures for uploading (optional):</p>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="field">
          <p>Provide links for references (optional):</p>
          <div className="links">
            <div className="link1">
              <p>Code:</p>
              <input type="text" placeholder="link" />
            </div>
            <div className="link2">
              <p>Demo:</p>
              <input type="text" placeholder="link" />
            </div>
          </div>
        </div>
        <button onClick={() => postDetails()}>Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
