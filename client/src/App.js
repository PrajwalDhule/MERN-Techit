import { React, useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignInUp from "./components/SignInUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import "./Styles/global.css";
import { userReducer, initialState } from "./reducers/userReducer";
import UserProfile from "./components/UserProfile";
import FollowedPosts from "./components/FollowedPosts";
import EditPost from "./components/EditPost";

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();

  const { userState, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      // navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route
        path="/signup"
        element={
          <SignInUp
            type="signup"
            title="Create an account"
            option="Login"
            button="Create account"
          />
        }
      ></Route>
      <Route
        path="/login"
        element={
          <SignInUp
            type="signin"
            title="Login to your account"
            option="Sign up"
            button="Log in"
          />
        }
      ></Route>
      <Route exact path="/profile" element={<Profile />}></Route>
      <Route path="/createpost" element={<CreatePost />}></Route>
      <Route path="/profile/:userid" element={<UserProfile />}></Route>
      <Route path="/editpost/:postid" element={<EditPost />}></Route>
      <Route path="/followedposts" element={<FollowedPosts />}></Route>
    </Routes>
  );
};

function App() {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  return (
    <div>
      <UserContext.Provider value={{ userState, dispatch }}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
