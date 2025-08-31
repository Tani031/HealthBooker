import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Agar token hi nahi hai → Login pe redirect
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar role mismatch hai → Home pe bhej do
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
