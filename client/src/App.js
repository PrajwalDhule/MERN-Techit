import {
  React,
  useEffect,
  createContext,
  useReducer,
  useContext,
  useState,
} from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignInUp from "./components/SignInUp";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost/CreatePost";
import "./Styles/global.css";
import { userReducer, initialState } from "./reducers/userReducer";
import Profile from "./components/Profile";
import EditPost from "./components/EditPost";
import Notices from "./components/Notices";
import PostDetails from "./components/PostDetails";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./contexts/ThemeProvider";

export const UserContext = createContext();

const Routing = () => {
  const { userState, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("techit-user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
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
      {/* <Route exact path="/profile" element={<Profile />}></Route> */}
      <Route path="/createpost" element={<CreatePost />}></Route>
      <Route path="/editpost/:postid" element={<EditPost />}></Route>
      <Route path="/profile/:userid" element={<Profile />}></Route>
      <Route path="/posts/:postid" element={<PostDetails />} />
      <Route path="/notices" element={<Notices />}></Route>
      {/* <Route path="/notifications" element={<Notifications />}></Route> */}
    </Routes>
  );
};

function App() {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  // const [theme, setTheme] = useState(getInitialTheme);

  // useEffect(() => {
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  // function getInitialTheme() {
  //   const storedTheme = localStorage.getItem("theme");
  //   return storedTheme ? storedTheme : "light"; // Default to "light" if no preference is found
  // }

  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      <ThemeProvider>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;

// ,
//   "devDependencies": {
//     "tailwindcss": "^3.2.7"
//   }
