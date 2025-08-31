import { useEffect, useState } from "react";
import axios from "axios";

export default function FindDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token"); // Patient login ke baad token store hoga
        const res = await axios.get("http://localhost:5000/api/patient/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(res.data);
      } catch (err) {
        console.error("❌ Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">⏳ Loading doctors...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Available Doctors
      </h1>

      {doctors.length === 0 ? (
        <p className="text-center text-gray-600">No doctors available</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{doc.name}</h2>
              <p className="text-gray-600">
                Specialization: {doc.specialization || "N/A"}
              </p>
              <p className="text-gray-600">Email: {doc.email}</p>
              <p className="text-gray-600">
                Experience: {doc.experience || 0} years
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
