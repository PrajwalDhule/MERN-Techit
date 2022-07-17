import React from "react";
import "../Styles/profile.css";
import cssTricks from "../images/CSS tricks.jpeg";
import mrElegant from "../images/mr elegant.jpeg";

const Profile = () => {
  return (
    <div className="profile-body body">
      <div className="profile">
        <section className="personal-info">
          <img src={mrElegant} alt="Profile picture" />
          <div className="text">
            <p className="userName">Henry Henderson</p>
            <p className="desc">
              An Elegant history teacher and the housemaster of dormitory 3,
              Cecile Hall at Eden Academy
            </p>
            <div className="numbers">
              <p>16 Posts</p>
              <p>102 Followers</p>
              <p>125 Following</p>
            </div>
          </div>
        </section>
        <div class="line"></div>
        <section className="post-type">
          <p>Doubts</p>
          <p>Posts</p>
          <p>Informative</p>
        </section>
        <section className="posts">
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
