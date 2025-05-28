import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import RightBar from "./RightBar";

const Notices = () => {
  const { userState, dispatch } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [noticeData, setNoticeData] = useState([]);
  useEffect(() => {
    fetch("/allnotices", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.error) {
          console.error("Error fetching notices:", result.error);
          alert("Oops, there was an issue fetching the notices!");
          return;
        } 
        const newData = result.notices.filter((item) => {
          return true;
        });
        setNoticeData(newData);
      });
  }, []);

  return (
    <div className="notice-body body">
      <Navbar />
      <div className="main-container w-[50vw]">
        {/* <div className="top-cover "></div> */}
        <main>
          {/* <div className="topbar fixed w-[60vw]">
            <div className="pt-[5vh] pb-[2em] flex w-full">
              <p className="w-[50%] text-center ">For you</p>
              <p className="w-[50%] text-center ">Following</p>
            </div>
            <div
              className={`h-[1px] ${
                theme == "dark" ? "bg-[#444444]" : "bg-[#c7c7c7]"
              }`}
            ></div>
          </div> */}
          <div className="notices-wrapper">
            {/* {noticeData.map((item) => {
              return (
                <>
                  <div className="notice rounded-md border-[1px] border-[#c8c8c8] px-[1.25em] py-[1em] mb-[1.5em] pr-[2em] bg-white">
                    <div className="owner">
                      <Link
                        className="pfp-image"
                        to={`/profile/${item.postedBy._id}`}
                      >
                        <img
                          src={item.postedBy.pic}
                          alt={`${item.postedBy.userName}'s pfp`}
                        />
                      </Link>
                      <p className="username">
                        <Link to={`/profile/${item.postedBy._id}`}>
                          {item.postedBy.userName}
                        </Link>
                      </p>
                      {item.postedBy._id == userState._id && (
                        <div className="ml-[auto] mr-0">
                          <p
                            className="deletePost"
                            // onClick={() => {
                            //   deletePost(item._id);
                            // }}
                          >
                            delete post
                          </p>
                        </div>
                      )}
                    </div>
                    <p id="desc" className="my-[1em] text-sm tracking-tight">
                      {item.desc}
                    </p>
                    {item.links &&
                      item.links.map((link, index) => {
                        return (
                          <a
                            className="mr-[1em] text-blue-500"
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            link {index + 1}
                          </a>
                        );
                      })}
                  </div> */}

            <section className="notices">
              {noticeData.length != 0 ? (
                noticeData.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="notice rounded-xl border-[1px] border-[#dfdfdf] px-[1.25em] py-[1em] mb-2 pr-[2em] bg-white"
                    >
                      <div className="owner flex justify-left items-center">
                        <Link
                          className="pfp-image h-8 w-8 overflow-hidden flex justify-center items-center mr-3 rounded-[50%]"
                          to={`/profile/${item.postedBy._id}`}
                        >
                          <img
                            src={item.postedBy.pic}
                            alt={`${item.postedBy.userName}'s pfp`}
                            className="h-8 object-cover object-center"
                          />
                        </Link>
                        <p className="username text-base">
                          <Link to={`/profile/${item.postedBy._id}`}>
                            {item.postedBy.userName}
                          </Link>
                        </p>
                        {item.postedBy._id == userState?._id && (
                          <div className="ml-[auto] mr-0">
                            <p
                              className="deletePost"
                              // onClick={() => {
                              //   deletePost(item._id);
                              // }}
                            >
                              delete post
                            </p>
                          </div>
                        )}
                      </div>
                      {/* <p id="title">{item.title}</p> */}
                      {/* <p>{item.category}</p> */}
                      <p id="desc" className="my-[1em] text-sm tracking-tight">
                        {item.desc}
                      </p>
                      {item.links &&
                        item.links.map((link, index) => {
                          return (
                            <a
                              className="mr-[1em] text-blue-500"
                              href={`${link}`}
                              target="_blank"
                            >
                              link {index + 1}
                            </a>
                          );
                        })}
                    </div>
                  );
                })
              ) : (
                <p className="dark:text-white">No notices yet!</p>
              )}
            </section>
            {/* </>
              );
            })} */}
          </div>
        </main>
      </div>
      <RightBar displayToggle={false} />
    </div>
  );
};

export default Notices;

//   position: relative;
//   width: 60vw;
//   left: 20vw;
//   min-height: 100vh;
//   // background-color: $light-grey-bg;
//   padding-top: 5vh;
//   overflow-x: hidden;
