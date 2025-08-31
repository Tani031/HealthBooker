import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ Purana clear karke naya save
      localStorage.clear();
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      setMessage("✅ Login successful!");

      // ✅ Role ke hisaab se redirect
      if (res.data.role === "patient") {
        navigate("/book-appointments");
      } else if (res.data.role === "doctor") {
        navigate("/doctor-dashboard");
      } else if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-600">
          Health Booker
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Your Health, Our Priority 🩺
        </p>

        {/* Message */}
        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.includes("✅")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg pl-10 focus:ring-2 focus:ring-blue-500"
              required
            />
            <span className="absolute left-3 top-3 text-gray-400">📧</span>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg pl-10 focus:ring-2 focus:ring-blue-500"
              required
            />
            <span className="absolute left-3 top-3 text-gray-400">🔒</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
