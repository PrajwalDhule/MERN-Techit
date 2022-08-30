import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../Styles/profile.css";
import cssTricks from "../images/CSS tricks.jpeg";
import settings from "../images/settings.png";
import Navbar from "./Navbar";
import { UserContext } from "../App";

const Profile = () => {
  const [pics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "techit");
      data.append("cloud_name", "techitcloud");
      fetch("https://api.cloudinary.com/v1_1/techitcloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  const removePhoto = () => {
    fetch("/updatepic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: "https://res.cloudinary.com/techitcloud/image/upload/v1660983423/profile_depnam.png",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...state,
            pic: "https://res.cloudinary.com/techitcloud/image/upload/v1660983423/profile_depnam.png",
          })
        );
        dispatch({
          type: "UPDATEPIC",
          payload:
            "https://res.cloudinary.com/techitcloud/image/upload/v1660983423/profile_depnam.png",
        });
      });

    setImage(null);
    console.log("removing");
  };

  return (
    <div className="profile-body body">
      <Navbar image={state ? state.pic : ""} />
      <div className="profile">
        <section className="personal-info">
          <div className="pfp-image">
            <img
              className="pfp"
              src={state ? state.pic : ""}
              alt="Profile picture"
            />
          </div>
          <div className="text">
            <p className="userName">{state ? state.userName : "loading"}</p>
            <p className="college">
              Thadomal Shahani Engineering College, Bandra (W)
            </p>
            <p className="desc">
              An Elegant history teacher and the housemaster of dormitory 3,
              Cecile Hall at Eden Academy
            </p>
            <div className="numbers">
              <p>{pics.length} Posts</p>
              <p>{state ? state.followers?.length : 0} Followers</p>
              <p>{state ? state.following?.length : 0} Following</p>
            </div>
            {/* {console.log(state)} */}
          </div>
          <div className="options">
            <img
              onClick={() => setShowOptions(!showOptions)}
              className="settings"
              src={settings}
              alt="settings"
            />
            {showOptions && (
              <div className="option-list">
                <p>
                  <input
                    type="file"
                    onChange={(e) => {
                      // removePhoto();
                      updatePhoto(e.target.files[0]);
                    }}
                  />
                  Update Profile Picture
                </p>
                <p onClick={() => removePhoto()}>Remove Profile Picture</p>
                <p>Update Bio</p>
                <p>Update College</p>
              </div>
            )}
          </div>
        </section>
        <div className="line"></div>
        <section className="post-type">
          <p>Doubts</p>
          <p>Posts</p>
          <p>Informative</p>
        </section>
        <section className="posts">
          {pics?.map((item) => {
            return (
              <div className="post" key={item._id}>
                <section>
                  <p>{item.title}</p>
                </section>
                <section>
                  <img src={item.photo} alt={item.title}></img>
                  <div>
                    <a href={item.link1} target="_blank">
                      <p>Code</p>
                    </a>
                    <a href={item.link2} target="_blank">
                      <p>Demo</p>
                    </a>
                  </div>
                </section>
              </div>
            );
          })}
          <div className="post">
            <section>
              <p>Simple and Useful CSS tricks</p>
            </section>
            <section>
              <img src={cssTricks} alt="post image" />
              <div>
                <p>Github</p>
                <p>Website</p>
                <p>Document</p>
              </div>
            </section>
          </div>
          <div className="post">
            <section className="title">
              <p>Simple and Useful CSS tricks</p>
            </section>
            <section>
              <img src={cssTricks} alt="post image" />
              <div>
                <p>Github</p>
                <p>Website</p>
                <p>Document</p>
              </div>
            </section>
          </div>
          <div className="post">
            <section className="title">
              <p>Simple and Useful CSS tricks</p>
            </section>
            <section>
              <img src={cssTricks} alt="post image" />
              <div>
                <p>Github</p>
                <p>Website</p>
                <p>Document</p>
              </div>
            </section>
          </div>
          <div className="post">
            <section className="title">
              <p>Simple and Useful CSS tricks</p>
            </section>
            <section>
              <img src={cssTricks} alt="post image" />
              <div>
                <p>Github</p>
                <p>Website</p>
                <p>Document</p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
