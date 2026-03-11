import { Navigate } from "react-router-dom";

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;
  if (role && userRole !== role) return <Navigate to="/dashboard" />;

  return children;
}

export default PrivateRoute;
