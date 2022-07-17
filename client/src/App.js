import React from "react";
import Navbar from "./components/Navbar";
import SignInUp from "./components/SignInUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import "./Styles/global.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
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
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
