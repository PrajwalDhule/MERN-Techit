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
        // console.log(result);
        const newData = result.notices.filter((item) => {
          return true;
        });
        setNoticeData(newData);
      });
  }, []);

  useEffect(() => {
    fetch("/posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = result.posts.filter((item) => {
          return true;
        });
        setData(newData);
      });
  }, []);

  return (
    <div>
      <Navbar image={userState ? userState.pic : ""} />
      <RightBar
        displayToggle={false}
      />
      <div className="notice-body relative w-[54vw] left-1/2 translate-x-[-53.75%] min-h-[100vh] overflow-x-hidden ">
        <div className="top-cover "></div>
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
          <div className="notices-wrapper pt-[5vh]">
            {noticeData.map((item) => {
              return (
                <>
                  <div className="notice rounded-md border-[1px] border-[#c8c8c8] px-[1.25em] py-[1em] mb-[1.5em] pr-[2em] bg-white">
                    <div className="owner">
                      <Link
                        className="pfp-image"
                        to={
                          item?.postedBy?._id != userState?._id
                            ? "/profile/" + item?.postedBy?._id
                            : "/profile"
                        }
                      >
                        <img
                          src={item.postedBy.pic}
                          alt={`${item.postedBy.userName}'s pfp`}
                        />
                      </Link>
                      <p className="username">
                        <Link
                          to={
                            item?.postedBy?._id != userState?._id
                              ? "/profile/" + item?.postedBy?._id
                              : "/profile"
                          }
                        >
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
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            link {index + 1}
                          </a>
                        );
                      })}
                  </div>
                </>
              );
            })}
          </div>
        </main>
      </div>
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
