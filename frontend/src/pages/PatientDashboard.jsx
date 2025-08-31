import { useEffect, useState } from "react";
import axios from "axios";

export default function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // ✅ Fetch doctors & appointments
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/patient/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors", err);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/patient/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments", err);
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, [token]);

  // ✅ Book appointment
  const handleBook = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/patient/appointments",
        { doctorId: selectedDoctor, date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments([...appointments, res.data]);
      setMessage("✅ Appointment booked successfully!");
      setSelectedDoctor("");
      setDate("");
      setTime("");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Booking failed");
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-blue-600">👩‍⚕️ Patient Dashboard</h1>

      {/* ✅ Book Appointment */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">📅 Book Appointment</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="p-2 border rounded flex-1"
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} ({doc.specialization || "General"})
              </option>
            ))}
          </select>

          <input
            type="date"
            className="p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            className="p-2 border rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button
            onClick={handleBook}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={!selectedDoctor || !date || !time}
          >
            Book
          </button>
        </div>
        {message && (
          <p
            className={`mt-3 font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* ✅ My Appointments */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📋 My Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="border p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Doctor:</strong> {appt.doctorId?.name || "N/A"} (
                    {appt.doctorId?.specialization || "General"})
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(appt.date).toLocaleDateString()} |{" "}
                    <strong>Time:</strong> {appt.time}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
