import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

const AuthGuard = ({ children }) => {
  const { userState } = useContext(UserContext);

  if (userState === undefined) return <div>Loading...</div>;
  if (userState === null) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

export default AuthGuard;