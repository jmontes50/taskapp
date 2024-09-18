import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
