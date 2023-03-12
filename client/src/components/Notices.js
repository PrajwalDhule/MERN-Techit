import { React, useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Notices = () => {
  const { userState, dispatch } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("Informative");
  useEffect(() => {
    fetch("/allnotices", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = result.notices.filter((item) => {
          return true;
        });
        setData(newData);
      });
  }, [category]);
  return (
    <div className="bg-[#f8f8f8]">
      <Navbar />
      <div className="notifications-body relative w-[60vw] left-[20vw] min-h-[100vh] overflow-x-hidden ">
        <div className="top-cover "></div>
        <main>
          <div className="topbar fixed w-[60vw] bg-[#f8f8f8]">
            <div className="pt-[5vh] pb-[2em] flex w-full">
              <p className="w-[50%] text-center ">Posts</p>
              <p className="w-[50%] text-center ">Notifications</p>
            </div>
            <div className="h-[1px] bg-[rgb(200,200,200)]"></div>
          </div>
          <div className="notifications-wrapper pt-[17.5vh]">
            {data.map((item) => {
              return (
                <>
                  <div className="notification rounded-md border-[1px] border-[rgb(200, 200, 200)] px-[1.25em] py-[1em] mb-[1.5em] bg-white">
                    <section className="">
                      <div className="owner">
                        <div className="pfp-image">
                          <img src={item.postedBy.pic} alt="" />
                        </div>
                        <p>
                          <Link
                            // to={
                            //   item?.postedBy?._id != userState?._id
                            //     ? "/profile/" + item?.postedBy?._id
                            //     : "/profile"
                            // }
                            to="/"
                          >
                            {item.postedBy.userName}
                            {/* Prajwal Dhule */}
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
                      <p id="desc" className=" mb-[.5em]">
                        {item.desc}
                      </p>
                    </section>
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
