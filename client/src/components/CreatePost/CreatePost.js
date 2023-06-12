import React, { useState, useEffect, useContext } from "react";
import "../../Styles/createPost.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../App";
import PostButton from "./PostButton";
import logo from "../../images/logo.svg";

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
  const [linkCount, setLinkCount] = useState(0);

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
    console.log("ummm hello?");
    fetch("/createnotice", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        desc: noticeDesc,
        tags: noticeTags,
        links: [...noticeLinks],
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
    const newLinks = [...noticeLinks];
    newLinks[index] = event.target.value;
    setNoticeLinks(newLinks);
  };

  const AddInput = () => {
    if (linkCount < 3) {
      setLinkCount(linkCount + 1);
      setNoticeLinks([...noticeLinks, ""]);
    }
  };

  const removeInput = (index) => {
    if (linkCount > 0) {
      setLinkCount(linkCount - 1);
      const newLinks = [...noticeLinks];
      newLinks.splice(index, 1);
      setNoticeLinks(newLinks);
    }
  };

  // const classes = {
  //   underlineBlue: [
  //     "after:absolute",
  //     "after:bottom-[-5px]",
  //     "after:left-0",
  //     "after:bg-[#2e5fdc]",
  //     "after:h-1",
  //     "after:w-full",
  //     "after:rounded-sm",
  //   ],
  // };

  return (
    <div className="body createPost-body flex bg-[#f8f8f8] h-[100vh]">
      {/* <Navbar image={userState ? userState.pic : ""} /> */}
      {/* <section className="w-2/5 pt-[3vh] pl-[3vw]">
        <Link to="/" className="flex items-center">
        </Link>
      </section> */}
      <Link to="/" className="absolute top-6 left-6 flex items-center">
        <img src={logo} alt="Techit logo" className="h-[6vh]" />
      </Link>
      <section className="edit-details w-full h-full bg-white px-[5vw] py-[3vh]">
        <div className="flex items-center justify-center w-fit mx-auto mb-[2rem]">
          <h2 className="text-2xl  w-fit mr-[2rem]">
            Create a {isNotice ? `Notice` : `Post`}
          </h2>
          <div class="relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-gray-200 p-1 ">
            <span
              class={`flex items-center space-x-[6px] rounded py-2 px-6 text-sm font-medium ${
                !isNotice
                  ? "bg-blue-500 text-white"
                  : "bg-transparent text-black"
              }`}
              onClick={() => setIsNotice(false)}
            >
              Post
            </span>
            <span
              class={`flex items-center space-x-[6px] rounded py-2 px-6 text-sm font-medium ${
                !isNotice
                  ? "bg-transparent text-black"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => setIsNotice(true)}
            >
              Notice
            </span>
          </div>
        </div>
        {/* <h3 className="flex justify-center text-xl mb-[1em]">
          <div className="w-1/2 text-center ">
            <p
              className={`w-fit mx-auto relative cursor-pointer ${
                !isNotice ? classes.underlineBlue.join(" ") : ""
              }`}
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
        </h3> */}
        {!isNotice ? (
          <form
            className="post-container flex flex-col w-1/3 mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              postDetails();
            }}
          >
            <div className="field">
              <p>Title:</p>
              <input
                className="w-full"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title of the post"
                required
              />
            </div>

            <div className="field">
              <p>Description:</p>
              <textarea
                className="w-full"
                rows="6"
                // cols="48"
                placeholder="Enter description of the post"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="field">
              <p>Select pictures for uploading:</p>
              <input
                className="w-full"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            {/* <div className="field">
              <p>Provide links for references (optional):</p>
              <div className="links flex mt-[.5em]">
                <div className="link1">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    type="text"
                    placeholder="code"
                  />
                </div>
                <div className="link2 ml-[1em]">
                  <input
                    value={demo}
                    onChange={(e) => setDemo(e.target.value)}
                    type="text"
                    placeholder="demo"
                  />
                </div>
              </div>
            </div> */}
            <PostButton />
          </form>
        ) : (
          <form
            className="post-container flex flex-col w-1/3 mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              postNotice();
            }}
          >
            <div className="field">
              <p>Description:</p>
              <textarea
                className="w-full"
                rows="4"
                cols="50"
                placeholder="Enter description of the post"
                value={noticeDesc}
                onChange={(e) => setNoticeDesc(e.target.value)}
                required
              ></textarea>
            </div>

            <div>
              {noticeLinks.map((link, index) => {
                return (
                  <div className="mt-[.25em]" key={index}>
                    <label className="block mb-2">{`Link ${index + 1}:`}</label>
                    <div className="relative">
                      <input
                        className="border-gray-400 border rounded px-3 py-2 w-full"
                        type="text"
                        value={link.value}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 hover:text-gray-800"
                        type="button"
                        onClick={() => removeInput(index)}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.6449 2.04935C12.1134 1.58082 12.1134 0.819928 11.6449 0.351398C11.1763 -0.117133 10.4154 -0.117133 9.9469 0.351398L6 4.30205L2.04935 0.355146C1.58082 -0.113384 0.819928 -0.113384 0.351398 0.355146C-0.117133 0.823676 -0.117133 1.58457 0.351398 2.0531L4.30205 6L0.355146 9.95065C-0.113384 10.4192 -0.113384 11.1801 0.355146 11.6486C0.823676 12.1171 1.58457 12.1171 2.0531 11.6486L6 7.69795L9.95065 11.6449C10.4192 12.1134 11.1801 12.1134 11.6486 11.6449C12.1171 11.1763 12.1171 10.4154 11.6486 9.9469L7.69795 6L11.6449 2.04935Z"
                            fill="black"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
              {linkCount < 3 && (
                <button
                  className="text-blue-500 hover:text-blue-600 rounded my-4"
                  type="button"
                  onClick={AddInput}
                >
                  Add Link +
                </button>
              )}
            </div>

            <PostButton />
          </form>
        )}
      </section>
    </div>
  );
};

export default CreatePost;
