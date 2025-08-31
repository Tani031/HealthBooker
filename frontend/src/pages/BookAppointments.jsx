import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function BookAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/patient/doctors",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDoctors(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setMessage("❌ Failed to load doctors. Please try again.");
      }
    };

    fetchDoctors();
  }, [token, navigate]);

  const handleBook = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(
        "http://localhost:5000/api/patient/appointments",
        { doctorId, date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Appointment booked successfully!");
      setDoctorId("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("❌ Failed to book appointment. Try again.");
    }
  };

  // ✅ Doctor ki availability se slots nikaalna
  const getAvailableSlots = () => {
    if (!doctorId || !date) return [];
    const doctor = doctors.find((d) => d._id === doctorId);
    if (!doctor || !doctor.availability) return [];

    const selectedDay = new Date(date).toLocaleString("en-US", {
      weekday: "long",
    });

    const dayAvailability = doctor.availability.find(
      (a) => a.day === selectedDay
    );
    return dayAvailability ? dayAvailability.slots : [];
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        📅 Book an Appointment
      </h1>

      <form
        onSubmit={handleBook}
        className="space-y-4 bg-white shadow-md rounded-lg p-6"
      >
        {/* Doctor Dropdown */}
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">-- Select Doctor --</option>
          {doctors.length > 0 ? (
            doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} ({doc.specialization})
              </option>
            ))
          ) : (
            <option disabled>No doctors available</option>
          )}
        </select>

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />

        {/* ✅ Time dropdown based on doctor availability */}
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-3 border rounded"
          required
          disabled={!date || !doctorId}
        >
          <option value="">-- Select Time Slot --</option>
          {getAvailableSlots().map((slot, idx) => (
            <option key={idx} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Book Appointment
          </button>

          <Link
            to="/manage-consultations"
            className="flex-1 px-6 py-3 text-center bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            My Appointments
          </Link>
        </div>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
