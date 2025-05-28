import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";

const AuthGuard = ({ children }) => {
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
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