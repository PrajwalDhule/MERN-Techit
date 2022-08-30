import { useParams } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";
import "../Styles/profile.css";
import cssTricks from "../images/CSS tricks.jpeg";
import mrElegant from "../images/mr elegant.jpeg";
import Navbar from "./Navbar";
import { UserContext } from "../App";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(
    state ? !state.following?.includes(userid) : true
  );
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

  const unFollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setProfile((prevState) => {
          const newFollowers = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollowers,
            },
          };
        });
        setShowFollow(true);
      });
  };
  return (
    // <div className="">hello</div>
    <>
      {profile ? (
        <div className="profile-body body">
          <Navbar image={profile.user.pic} />
          <div className="profile">
            <section className="personal-info">
              <div className="pfp-image">
                <img
                  className="pfp"
                  src={profile.user.pic}
                  alt="Profile picture"
                />
              </div>
              <div className="text">
                <p className="userName">{profile.user.userName}</p>
                <p className="college">
                  Thadomal Shahani Engineering College, Bandra (W)
                </p>
                <p className="desc">
                  An Elegant history teacher and the housemaster of dormitory 3,
                  Cecile Hall at Eden Academy
                </p>
                <div className="numbers">
                  <p>{profile.posts.length} Posts</p>
                  <p>{profile.user.followers.length} Followers</p>
                  <p>{profile.user.following.length} Following</p>
                </div>
              </div>
              <div className="follow">
                {showfollow ? (
                  <button
                    style={{ color: "white", backgroundColor: "#2e5fdc" }}
                    onClick={() => followUser()}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    style={{ color: "blue", backgroundColor: "white" }}
                    onClick={() => unFollowUser()}
                  >
                    Unfollow
                  </button>
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
              {profile.posts.map((item) => {
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
            </section>
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default Profile;
