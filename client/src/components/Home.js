import React from "react";

const Home = () => {
  return (
    <div className="home-body body">
      <div className="story">
        <div className="story-container">
          <div>
            <img src="../images/dio 1.jpg" alt="" />
            <p>Shirogane</p>
          </div>
          <div>
            <img src="../images/ishigami 1.jpg" alt="" />
            <p>Yuuuu</p>
          </div>
        </div>
      </div>
      <div className="sidebar"></div>
      <main>
        <div className="post">
          <section>
            <div className="owner">
              <img src="../images/ishigami 2.jpg" alt="" />
              <p>Person 1</p>
            </div>
            <p id="title">Title lol</p>
            <p id="desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Architecto, iure? Libero fugit doloribus soluta nostrum sapiente
              pariatur cupiditate quisquam fugiat animi nihil, in
              exercitationem, facilis et, dolor iusto. Itaque, veniam.
            </p>
          </section>
          <section>
            <div className="images">
              <div className="image">
                <img src="../images/ishigami 3.jpg" alt="" />
              </div>
            </div>
            <p>links</p>
            <div className="replies">Replies</div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
