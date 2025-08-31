import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindDoctors from "./pages/FindDoctors";
import BookAppointments from "./pages/BookAppointments";
import ManageConsultations from "./pages/ManageConsultations";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage"; // ✅ ADD THIS IMPORT

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {/* ✅ Home Page */}
            <Route path="/" element={<HomePage />} /> {/* 👈 use HomePage */}
            {/* ✅ Feature Pages */}
            <Route path="/find-doctors" element={<FindDoctors />} />
            <Route
              path="/book-appointments"
              element={
                <ProtectedRoute role="patient">
                  <BookAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-consultations"
              element={
                <ProtectedRoute role="patient">
                  <ManageConsultations />
                </ProtectedRoute>
              }
            />
            {/* ✅ Patient Dashboard */}
            <Route
              path="/patient-dashboard"
              element={
                <ProtectedRoute role="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            {/* ✅ Dashboards */}
            <Route
              path="/doctor-dashboard"
              element={
                <ProtectedRoute role="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* ✅ Other Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
