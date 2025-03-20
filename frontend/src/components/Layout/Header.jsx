import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import mobile_logo from "../../assets/logo_mobile.png";
import logo from "../../assets/logo.png";
import { useAuthStore } from "../../store/useAuthStore";
import download from "../../assets/download.png";

function Header() {
  const { user, logout } = useAuthStore();
  const role = user?.role;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    }


    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen, mobileMenuOpen]);

  return (
    <header className="text-white text-sm md:text-base lg:text-lg py-3 md:py-4 px-6 flex items-center justify-between shadow-lg w-full min-h-[60px] md:min-h-[80px] lg:min-h-[100px] bg-gray-900">
      {/* Mobile Navigation */}
      <div
        className="md:hidden flex items-center space-x-4 relative"
        ref={mobileMenuRef}
      >
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white text-2xl px-4 py-3"
        >
          ☰
        </button>

        {/* Mobile Menu Dropdown */}
        <div
          className={`absolute top-16 left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-xl py-2 border border-gray-200 z-50 transition-all duration-200 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }`}
        >
          <Link
            to="/"
            className="block px-5 py-2 text-sm font-medium hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          {role === "student" && (
            <Link
              to="/subjects"
              className="block px-5 py-2 text-sm font-medium hover:bg-gray-100 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Subjects
            </Link>
          )}
          <Link
            to={user ? `${role}-dashboard` : "/login"}
            className="block px-5 py-2 text-sm font-medium hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          {role === "admin" && (
            <>
              <Link
                to="students"
                className="block px-5 py-2 text-sm font-medium hover:bg-gray-100 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Students
              </Link>
              <Link
                to="teachers"
                className="block px-5 py-2 text-sm font-medium hover:bg-gray-100 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Teachers
              </Link>
            </>
          )}
          <Link
            to="/about"
            className="block px-5 py-2 text-sm font-medium hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-5 py-2 text-sm font-medium hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Logo */}
        <img
          src={mobile_logo}
          alt="AI Grader Logo"
          className="max-w-[50px] h-auto md:hidden"
        />
      </div>

      {/* Big Screen Logo */}
      <div className="hidden md:block">
        <img src={logo} alt="AI Grader Logo" className="max-w-[200px] h-auto" />
      </div>

      {/* Center Section: Navigation (Big Screens Only) */}
      <nav className="hidden md:flex space-x-6 ml-12">
        <Link
          to="/"
          className="hover:text-[#eb9809] hover:scale-105 transition duration-100"
        >
          Home
        </Link>
        {role === "student" && (
          <Link
            to="/subjects"
            className="hover:text-[#eb9809] hover:scale-105 transition duration-100"
          >
            Subjects
          </Link>
        )}
        <Link
          to={user ? `${role}-dashboard` : "/login"}
          className="hover:text-[#eb9809] hover:scale-105 transition duration-100"
        >
          Dashboard
        </Link>
        {role === "admin" && (
          <>
            <Link
              to="students"
              className="hover:text-[#eb9809] hover:scale-105 transition duration-100"
            >
              Students
            </Link>
            <Link
              to="teachers"
              className="hover:text-[#eb9809] hover:scale-105 transition duration-100"
            >
              Teachers
            </Link>
          </>
        )}
        <Link
          to="/about"
          className="hover:text-[#eb9809] hover:scale-105 transition duration-100"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="hover:text-[#eb9809] hover:scale-105 transition duration-100"
        >
          Contact Us
        </Link>
      </nav>

      {/* Right Section: Profile or Register (Mobile View) */}
      <div
        className="md:hidden flex items-center space-x-4 relative"
        ref={dropdownRef}
      >
        {!user ? (
          <Link
            to="/signup"
            className="text-[#eb9809] text-lg transition hover:font-medium hover:scale-105"
          >
            Register
          </Link>
        ) : (
          <>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img
                src={user.profilePicture || download}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray shadow-md hover:scale-105 transition"
              />
            </button>

            {/* Profile Dropdown */}
            <div
              className={`absolute top-14 right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-xl py-2 border border-gray-200 z-50 transition-all ${
                dropdownOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              <Link
                to="/profile"
                className="block px-5 py-2 hover:bg-gray-100 transition"
                onClick={() => setDropdownOpen(false)}
              >
                👤 Profile
              </Link>
              <button
                className="block w-full text-left px-5 py-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition"
                onClick={logout}
              >
                🚪 Logout
              </button>
            </div>
          </>
        )}
      </div>

      {/* Right Section: Profile or Auth (Big Screens) */}
      <div
        className="hidden md:flex items-center space-x-6 ml-auto"
        ref={dropdownRef}
      >
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-[#eb9809] text-lg relative transition-all duration-150 hover:font-medium hover:scale-105 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-[#eb9809] after:scale-x-0 after:transition-transform after:duration-150 hover:after:scale-x-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-[#eb9809] text-lg relative transition-all duration-150 hover:font-medium hover:scale-105 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-[#eb9809] after:scale-x-0 after:transition-transform after:duration-150 hover:after:scale-x-100"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            {/* Profile Button */}
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img
                src={user.profilePicture || download}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-gray shadow-md hover:scale-110 transition"
              />
            </button>

            {/* Profile Dropdown */}
            <div
              className={`absolute top-[92px] right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-xl py-2 border border-gray-200 z-50 transition-all ${
                dropdownOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              <Link
                to="/profile"
                className="block px-5 py-2 hover:bg-gray-100 transition"
                onClick={() => setDropdownOpen(false)}
              >
                👤 Profile
              </Link>
              <button
                className="block w-full text-left px-5 py-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition"
                onClick={logout}
              >
                🚪 Logout
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
