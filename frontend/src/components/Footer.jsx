

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Branding / About */}
        <div>
          <h2 className="text-xl font-bold text-white">Health Booker</h2>
          <p className="mt-2 text-gray-400 text-sm">
            A simple way to book doctor appointments online.  
            Made with  by{" "}
            <a
              href="https://www.linkedin.com/in/tanisha-sharma/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Tanisha Sharma
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/book-appointments" className="hover:text-blue-400">Book Appointment</a></li>
            <li><a href="/manage-consultations" className="hover:text-blue-400">My Appointments</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold text-white">Connect</h3>
          <div className="flex space-x-6 mt-3">
            <a
              href="https://www.linkedin.com/in/tanisha-sharma/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <Github size={22} />
            </a>
            <a
              href="mailto:sharmatanisha9058@gmail.com"
              className="hover:text-red-400 transition"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Health Booker. All rights reserved.
      </div>
    </footer>
  );
}
