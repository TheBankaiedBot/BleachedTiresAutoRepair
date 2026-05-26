import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!token) return <Navigate to="/login" replace />;

  return children;
}
