import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("doctors"); // doctors | patients | appointments
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // ✅ Fetch Doctors
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/doctors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(data);
    } catch (err) {
      setMessage("❌ Failed to fetch doctors.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Patients
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(data);
    } catch (err) {
      setMessage("❌ Failed to fetch patients.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Appointments
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(data);
    } catch (err) {
      setMessage("❌ Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve Doctor
  const approveDoctor = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/admin/doctors/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Doctor approved successfully!");
      setDoctors((prev) => prev.map((doc) => (doc._id === id ? data.doctor : doc)));
    } catch {
      setMessage("❌ Failed to approve doctor.");
    }
  };

  // ✅ Delete Doctor
  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("🗑️ Doctor deleted.");
      setDoctors((prev) => prev.filter((doc) => doc._id !== id));
    } catch {
      setMessage("❌ Failed to delete doctor.");
    }
  };

  // ✅ Delete Patient
  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("🗑️ Patient deleted.");
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch {
      setMessage("❌ Failed to delete patient.");
    }
  };

  // ✅ Initial Load
  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        🛠️ Admin Dashboard
      </h1>

      {/* ✅ Message Banner */}
      {message && (
        <div className="mb-4 text-center text-sm font-medium p-2 rounded bg-gray-100">
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-8">
        {["doctors", "patients", "appointments"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading && <p className="text-center text-gray-500">⏳ Loading...</p>}

      {/* Doctors Tab */}
      {activeTab === "doctors" && !loading && (
        <div className="space-y-4">
          {doctors.length === 0 ? (
            <p>No doctors found.</p>
          ) : (
            doctors.map((doc) => (
              <div
                key={doc._id}
                className="border p-4 rounded-lg flex justify-between items-center shadow-sm"
              >
                <div>
                  <p><strong>Name:</strong> {doc.name}</p>
                  <p><strong>Email:</strong> {doc.email}</p>
                  <p><strong>Specialization:</strong> {doc.specialization}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        doc.isApproved
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {doc.isApproved ? "Approved" : "Pending"}
                    </span>
                  </p>
                </div>
                <div className="space-x-2">
                  {!doc.isApproved && (
                    <button
                      onClick={() => approveDoctor(doc._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => deleteDoctor(doc._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Patients Tab */}
      {activeTab === "patients" && !loading && (
        <div className="space-y-4">
          {patients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            patients.map((p) => (
              <div
                key={p._id}
                className="border p-4 rounded-lg flex justify-between items-center shadow-sm"
              >
                <div>
                  <p><strong>Name:</strong> {p.name}</p>
                  <p><strong>Email:</strong> {p.email}</p>
                  <p><strong>Age:</strong> {p.age}</p>
                </div>
                <button
                  onClick={() => deletePatient(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === "appointments" && !loading && (
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            appointments.map((appt) => (
              <div key={appt._id} className="border p-4 rounded-lg shadow-sm">
                <p>
                  <strong>Patient:</strong> {appt.patientId?.name} (
                  {appt.patientId?.email})
                </p>
                <p>
                  <strong>Doctor:</strong> {appt.doctorId?.name} (
                  {appt.doctorId?.specialization})
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appt.date).toLocaleDateString()} |{" "}
                  <strong>Time:</strong> {appt.time}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      appt.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : appt.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : appt.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appt.status}
                  </span>
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

