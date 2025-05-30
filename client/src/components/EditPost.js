import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "../App";

const EditPost = () => {
  const { state } = useLocation();
  const { post } = state || {};

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { userState, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [title, setTitle] = useState(post?.title);
  const [category, setCategory] = useState(post?.category);
  const [desc, setDesc] = useState(post?.desc);
  const [code, setCode] = useState(post?.link1);
  const [demo, setDemo] = useState(post?.link2);
  const [url, setUrl] = useState(post?.photo);
  const { postid } = useParams();

  const postDetails = () => {
    //uploading image to cloudinary
    if (isImage) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "techit");
      data.append("cloud_name", "techitcloud");
      fetch("https://api.cloudinary.com/v1_1/techitcloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((imageData) => {
          if(imageData.error) {
            console.error("Error uploading image:", imageData.error);
            alert("Oops, there was an issue while uploading image!");
            return;
          }

          setUrl(imageData.url);
          fetch(`/api/editpost/${postid}`, {
            method: "put",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              title,
              category,
              desc,
              link1: code,
              link2: demo,
              pic: url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              if(result.error) {
                console.error("Error creating post:", result.error);
                alert("Oops, there was an issue while creating the post!");
                return;
              } 

              alert("Created post successfully");
              navigate("/");
                
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      fetch(`/api/editpost/${postid}`, {
        method: "put",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          category,
          desc,
          link1: code,
          link2: demo,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if(result.error) {
            console.error("Error creating post:", result.error);
            alert("Oops, there was an issue while creating the post!");
            return;
          } 
          
            alert("Created post successfully");
            navigate("/");
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  //   const editPost = async() => {
  //     let error = await postDetails();
  //           fetch(`/api/editpost/${postid}`, {
  //             method: "put",
  //             headers: {
  //               Authorization: "Bearer " + localStorage.getItem("jwt"),
  //             },
  //             body: JSON.stringify({
  //               title,
  //               category,
  //               desc,
  //               link1: code,
  //               link2: demo,
  //               pic: url,
  //             }),
  //           })
  //             .then((res) => res.json())
  //             .then((data) => {
  //               console.log(data);
  //               if (data.error) {
  //                 alert(data.error);
  //               } else {
  //                 alert("Created post successfully");
  //                 navigate("/");
  //               }
  //             })
  //             .catch((e) => {
  //               console.error(e);
  //             });
  //   };

  return (
    <div>
      <Navbar />
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
        <form
          className="post-container"
          onSubmit={(e) => {
            e.preventDefault();
            postDetails();
          }}
        >
          <div className="field">
            <p>Title:</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title of the post"
              required
            />
          </div>
          <div className="field">
            <p>Category:</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              data-placeholder="Choose category"
              required
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
              required
            ></textarea>
          </div>
          <div className="field">
            <p>Select pictures for uploading:</p>
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setIsImage(true);
              }}
            />
          </div>
          <div className="field">
            <p>Provide links for references (optional):</p>
            <div className="links">
              <div className="link1">
                <p>Code:</p>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  placeholder="link"
                />
              </div>
              <div className="link2">
                <p>Demo:</p>
                <input
                  value={demo}
                  onChange={(e) => setDemo(e.target.value)}
                  type="text"
                  placeholder="link"
                />
              </div>
            </div>
          </div>
          <input
            type="submit"
            // onClick={}
            value="Post"
          />
          {/* Post
          </input> */}
        </form>
      </div>
    </div>
  );
};

export default EditPost;
