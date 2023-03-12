import React, { useState, useEffect, useContext } from "react";
import "../Styles/createPost.css";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "../App";
import logo from "../images/logo.svg";

const CreatePost = () => {
  const navigate = useNavigate();
  const { userState, dispatch } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [code, setCode] = useState("");
  const [demo, setDemo] = useState("");
  const [url, setUrl] = useState("");

  const [isNotice, setIsNotice] = useState(false);
  const [noticeDesc, setNoticeDesc] = useState("");
  const [noticeTags, setNoticeTags] = useState([]);
  const [noticeLinks, setNoticeLinks] = useState([]);
  const [inputCount, setInputCount] = useState(0);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    if (url) {
      //sending fetched createPost data to database
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
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
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            alert("Created post successfully");
            navigate("/");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [url]);

  const postDetails = () => {
    //uploading image to cloudinary
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
        // console.log(data);
        setUrl(data.url);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const postNotice = () => {
    //sending fetched createNotice data to database
    fetch("/createnotice", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        desc: noticeDesc,
        tags: noticeTags,
        links: noticeLinks,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          alert("Created notice successfully");
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  const AddInput = () => {
    if (inputCount < 3) {
      setInputCount(inputCount + 1);
      setInputs([...inputs, { value: "" }]);
    }
  };

  const RemoveInput = (index) => {
    if (inputCount > 0) {
      setInputCount(inputCount - 1);
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
    }
  };

  const renderInputs = () => {
    return inputs.map((input, index) => (
      <div className="mt-4" key={index}>
        <label className="block mb-2">{`Link ${index + 1}:`}</label>
        <div className="relative">
          <input
            className="border-gray-400 border rounded px-3 py-2 w-full"
            type="text"
            value={input.value}
            onChange={(event) => handleInputChange(index, event)}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 hover:text-gray-800"
            type="button"
            onClick={() => RemoveInput(index)}
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M13.414 6.586a2 2 0 112.828 2.828L15.657 10l2.585 2.586a2 2 0 11-2.828 2.828L12.829 12l-2.586 2.586a2 2 0 11-2.828-2.828L10.343 10 7.757 7.414a2 2 0 112.828-2.828L10.829 7l2.585-2.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    ));
  };

  const classes = {
    underlineBlue: [
      "after:absolute",
      "after:bottom-[-5px]",
      "after:left-0",
      "after:bg-[#2e5fdc]",
      "after:h-1",
      "after:w-full",
      "after:rounded-sm",
    ],
  };

  return (
    <div className="body createPost-body flex bg-[#f8f8f8] h-[100vh]">
      {/* <Navbar image={userState ? userState.pic : ""} /> */}
      <section className="w-2/5 pt-[1vw] pl-[1vw]">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Techit logo" className="h-[6vh]" /> <p>Techit</p>
        </Link>
      </section>
      <section className="edit-details w-3/5 h-full bg-white px-[5vw] py-[3vh]">
        <h3 className="flex justify-center text-xl mb-[1em]">
          <div className="w-1/2 text-center ">
            <p
              className={`w-fit mx-auto relative cursor-pointer ${
                !isNotice ? classes.underlineBlue.join(" ") : ""
              }`}
              onClick={() => setIsNotice(false)}
            >
              Post
            </p>
          </div>
          <div className="w-1/2 text-center ">
            <p
              className={`w-fit mx-auto relative cursor-pointer ${
                isNotice ? classes.underlineBlue.join(" ") : ""
              }`}
              onClick={() => setIsNotice(true)}
            >
              Notice
            </p>
          </div>
        </h3>
        <h2 className="text-2xl mb-3">
          Create a {isNotice ? `Notice` : `Post`}
        </h2>
        {!isNotice ? (
          <form
            className="post-container flex flex-col"
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
            {/* <div className="field">
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
          </div> */}
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
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <div className="field">
              <p>Provide links for references (optional):</p>
              <div className="links flex mt-[.5em]">
                <div className="link1">
                  {/* <p>Code:</p> */}
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    type="text"
                    placeholder="code"
                  />
                </div>
                <div className="link2 ml-[1em]">
                  {/* <p>Demo:</p> */}
                  <input
                    value={demo}
                    onChange={(e) => setDemo(e.target.value)}
                    type="text"
                    placeholder="demo"
                  />
                </div>
              </div>
            </div>
            <button
              class="self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-regular rounded-md text-md px-6 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="submit"
              role="button"
              // onClick={}
            >
              Post
            </button>
            {/* Post
          </input> */}
          </form>
        ) : (
          <form
            className="post-container flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              postNotice();
            }}
          >
            <div className="field">
              <p>Description:</p>
              <textarea
                rows="4"
                cols="50"
                placeholder="Enter description of the post"
                value={noticeDesc}
                onChange={(e) => setNoticeDesc(e.target.value)}
                required
              ></textarea>
            </div>

            <div>
              {inputs.map((input, index) => {
                return (
                  <div className="mt-4" key={index}>
                    <label className="block mb-2">{`Link ${index + 1}:`}</label>
                    <div className="relative">
                      <input
                        className="border-gray-400 border rounded px-3 py-2 w-full"
                        type="text"
                        value={input.value}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 hover:text-gray-800"
                        type="button"
                        onClick={() => RemoveInput(index)}
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M13.414 6.586a2 2 0 112.828 2.828L15.657 10l2.585 2.586a2 2 0 11-2.828 2.828L12.829 12l-2.586 2.586a2 2 0 11-2.828-2.828L10.343 10 7.757 7.414a2 2 0 112.828-2.828L10.829 7l2.585-2.586z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
              {inputCount < 3 && (
                <button
                  className="text-blue-500 hover:text-blue-600 rounded mt-4"
                  type="button"
                  onClick={AddInput}
                >
                  Add Link +
                </button>
              )}
            </div>

            <button
              class="self-end  mt-[1em] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-regular rounded-md text-md px-6 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="submit"
              role="button"
              // onClick={}
            >
              Post
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default CreatePost;
