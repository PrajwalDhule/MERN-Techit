import { React, useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Notifications = () => {
  const { userState, dispatch } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("Informative");
  useEffect(() => {
    fetch("/api/allnotices", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = result.notices.filter((item) => {
          return true;
        });
        setData(newData);
      });
  }, [category]);
  return (
    <div className="bg-[#f8f8f8]">
      <Navbar image={userState ? userState.pic : ""} />
      <div className="notifications-body relative w-[50vw] left-1/2 translate-x-[-50%] min-h-[100vh] overflow-x-hidden ">
        <div className="top-cover "></div>
        <main>
          <div className="notifications-wrapper pt-[5vh]">
            <div className="h-[90vh] grid place-items-center text-2xl font-semibold">
              <p>No notifications yet!</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
