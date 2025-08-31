import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState([{ day: "", slots: [""] }]); 
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // ✅ Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/doctor/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };
    fetchAppointments();
  }, [token]);

  // ✅ Update Appointment Status
  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/doctor/appointments/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === id ? data : appt))
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  // ✅ Handle Availability Change
  const handleAvailabilityChange = (index, field, value) => {
    const newAvailability = [...availability];
    if (field === "day") {
      newAvailability[index].day = value;
    } else {
      newAvailability[index].slots = value.split(",").map((s) => s.trim());
    }
    setAvailability(newAvailability);
  };

  // ✅ Add new availability row
  const addRow = () => {
    setAvailability([...availability, { day: "", slots: [""] }]);
  };

  // ✅ Save availability (FIXED → PUT instead of POST)
  const saveAvailability = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/doctor/availability",
        { availability },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Availability updated successfully!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("❌ Failed to update availability.");
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">🧑‍⚕️ Doctor Dashboard</h1>

      {/* ✅ Availability Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">📅 Set Availability</h2>
        {availability.map((a, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <select
              value={a.day}
              onChange={(e) =>
                handleAvailabilityChange(index, "day", e.target.value)
              }
              className="p-2 border rounded w-40"
            >
              <option value="">-- Select Day --</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
            <input
              type="text"
              value={a.slots.join(", ")}
              onChange={(e) =>
                handleAvailabilityChange(index, "slots", e.target.value)
              }
              placeholder="e.g. 10:00 AM, 11:00 AM"
              className="flex-1 p-2 border rounded"
            />
          </div>
        ))}
        <div className="flex gap-4">
          <button
            onClick={addRow}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            + Add Row
          </button>
          <button
            onClick={saveAvailability}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Availability
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

      {/* ✅ Appointment Management */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📋 Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Patient:</strong>{" "}
                    {appt.patientId?.name} ({appt.patientId?.email})
                  </p>
                  <p>
                    <strong>Date:</strong> {appt.date} -{" "}
                    <strong>Time:</strong> {appt.time}
                  </p>
                  <p>
                    <strong>Status:</strong> {appt.status}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => updateStatus(appt._id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(appt._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(appt._id, "completed")}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
