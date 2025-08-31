import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageConsultations() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/patient/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error("❌ Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate, token]);

  if (loading) return <p className="text-center mt-10">⏳ Loading consultations...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        💬 My Consultations
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No consultations found</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  🧑‍⚕️ {appt.doctorId?.name || "Doctor Unavailable"}
                </h2>
                <p className="text-gray-600">
                  {appt.doctorId?.specialization || "Specialization N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  📅 {appt.date} | ⏰ {appt.time}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold shadow ${
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
  );
}
