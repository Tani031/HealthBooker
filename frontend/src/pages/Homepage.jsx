export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-20 w-full">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-yellow-300">Health Booker</span> 🚀
        </h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Book appointments with trusted doctors, manage consultations, and take control of your health—all in one place.
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow font-semibold hover:bg-gray-200 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg shadow font-semibold hover:bg-yellow-500 transition"
          >
            Register
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">✨ Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">🔎 Find Doctors</h3>
            <p className="text-gray-600">Search and connect with top doctors near you.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">📅 Book Appointments</h3>
            <p className="text-gray-600">Schedule appointments with just a few clicks.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">💬 Manage Consultations</h3>
            <p className="text-gray-600">Track and manage all your medical visits in one place.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">⚙️ How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">1️⃣ Register</h3>
              <p className="text-gray-600">Create an account as a patient or doctor.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">2️⃣ Book</h3>
              <p className="text-gray-600">Browse doctors and book an appointment instantly.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">3️⃣ Consult</h3>
              <p className="text-gray-600">Visit your doctor and manage your consultation online.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 max-w-6xl text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">💡 What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <p className="text-gray-700 italic">
              "Health Booker made booking my doctor so easy! I love how I can manage all my appointments in one place."
            </p>
            <h4 className="mt-4 font-semibold">– Sarah, Patient</h4>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <p className="text-gray-700 italic">
              "As a doctor, this platform helps me organize my availability and consultations seamlessly."
            </p>
            <h4 className="mt-4 font-semibold">– Dr. John, Cardiologist</h4>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">📩 Contact Us</h2>
          <p className="mb-6 text-gray-600">
            Have questions or feedback? Reach out and we'll get back to you soon!
          </p>
          <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="border rounded w-full py-2 px-3 mb-4"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border rounded w-full py-2 px-3 mb-4"
            />
            <textarea
              placeholder="Your Message"
              className="border rounded w-full py-2 px-3 mb-4"
              rows="4"
            ></textarea>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
