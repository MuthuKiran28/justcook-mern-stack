import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">Checking session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
