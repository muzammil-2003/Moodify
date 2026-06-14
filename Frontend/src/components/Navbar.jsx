import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-400 font-semibold transition"
      : "hover:text-indigo-400 transition";

  return (
    <nav className="bg-gray-900 text-white shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-indigo-400">MoodAI</span>
            <span className="text-sm text-gray-400 hidden sm:block">
              Detect emotions with AI
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/detect" className={linkClass}>
              Detect Mood
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <NavLink
                to="/login"
                className="px-4 py-1.5 text-sm border border-indigo-400 rounded-full hover:bg-indigo-400 hover:text-black transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-1.5 text-sm bg-indigo-500 rounded-full hover:bg-indigo-600 transition shadow-md shadow-indigo-500/30"
              >
                Register
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-6 pb-4">
          <NavLink to="/" className={linkClass + " block py-2"}>
            Home
          </NavLink>
          <NavLink to="/detect" className={linkClass + " block py-2"}>
            Detect Mood
          </NavLink>
          <NavLink to="/about" className={linkClass + " block py-2"}>
            About
          </NavLink>

          <div className="flex flex-col mt-4 gap-4">
            <NavLink
              to="/login"
              className="block text-center px-4 py-2 border border-indigo-400 rounded-lg hover:bg-indigo-400 hover:text-black"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="block text-center px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600"
            >
              Register
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}