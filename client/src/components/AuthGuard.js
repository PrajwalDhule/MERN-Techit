import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";

const AuthGuard = ({ children }) => {
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  // if (userState === undefined) return <div>Loading...</div>;
  // if (userState === null) {
  //   return <Navigate to="/login" />;
  // }

  useEffect(() => {
    console.log("AuthGuard userState outside: ", userState);
    const timeout = setTimeout(() => {
      console.log("AuthGuard userState inside: ", userState);
      if (!userState) {
        navigate("/");
      }
    }
    , 0);

    return () => {
      clearTimeout(timeout);
    }
  }, [userState])
  
  return <>{children}</>;
};

export default AuthGuard;