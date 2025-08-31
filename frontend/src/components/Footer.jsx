export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Text */}
        <p className="text-sm text-gray-400">
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/tanisha-sharma/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Tanisha Sharma
          </a>
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com/in/tanisha-sharma/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            🔗 LinkedIn
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            💻 GitHub
          </a>
          <a
            href="mailto:sharmatanisha9058@gmail.com"
            className="hover:text-red-400 transition"
          >
            📧 Email
          </a>
        </div>
      </div>
    </footer>
  );
}
