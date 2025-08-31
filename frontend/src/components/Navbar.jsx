import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // ✅ Role-based links
  const renderLinks = () => {
    if (!token) {
      return (
        <>
          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>
          <Link to="/register" className="hover:text-blue-600">
            Register
          </Link>
        </>
      );
    }

    if (role === "patient") {
      return (
        <>
          <Link to="/book-appointments" className="hover:text-blue-600">
            Book
          </Link>
          <Link to="/manage-consultations" className="hover:text-blue-600">
            My Appointments
          </Link>
        </>
      );
    }

    if (role === "doctor") {
      return (
        <Link to="/doctor-dashboard" className="hover:text-blue-600">
          Doctor Dashboard
        </Link>
      );
    }

    if (role === "admin") {
      return (
        <Link to="/admin-dashboard" className="hover:text-blue-600">
          Admin Dashboard
        </Link>
      );
    }

    return null;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          Health Booker
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          {renderLinks()}
          {token && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 focus:outline-none text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-3 text-gray-700 font-medium">
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-blue-600">
            Home
          </Link>
          {renderLinks()}
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : null}
        </div>
      )}
    </nav>
  );
}
