import { useState, useEffect, useRef } from "react";
import signupimg from "../assets/login_signup/signupimg.svg";
import download from "../assets/download.png";
import { Camera, Eye, EyeOff, ChevronDown, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [studentClass, setStudentClass] = useState("");
  const [studentSubjects, setStudentSubjects] = useState([]);
  const [teacherSubject, setTeacherSubject] = useState("");
  const [experience, setExperience] = useState("");
  const [profilePicture, setprofilePicture] = useState(null);
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { signup, isSigningUp } = useAuthStore();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setprofilePicture(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const subjectsList = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Computer",
  ];

  const dropdownRef = useRef(null);

  // Handle subject selection
  const handleSubjectSelect = (subject) => {
    setStudentSubjects(
      (prev) =>
        prev.includes(subject)
          ? prev.filter((s) => s !== subject) // Remove if already selected
          : [...prev, subject] // Add new subject
    );
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions to proceed.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const formData = new FormData();
    const signupData = {
      name,
      email,
      mobile,
      password,
      role,
      ...(role === "student"
        ? { studentClass, subjects: studentSubjects }
        : { specializedSubject: teacherSubject, experience }),
    };

    Object.entries(signupData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else if (value) {
        formData.append(key, value);
      }
    });

    if (file) formData.append("profilePicture", file);

    await signup(formData);

    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setRole("student");
    setStudentClass(""); // Ensure this correctly resets
    setStudentSubjects([]); // Reset selected subjects
    setTeacherSubject("");
    setExperience("");
    setprofilePicture(null);
    setFile(null);
    setTermsAccepted(false);

    // Force UI update for profile picture
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-5xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-row-reverse md:flex-col items-center justify-center p-6 bg-blue-50 rounded-lg">
          <img
            src={signupimg}
            alt="AI Assistant"
            className="max-w-72 min-w-20 h-auto mb-4"
          />
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-center">
              AI-Powered Grading
            </h2>
            <p className="text-gray-700 text-center hidden sm:block px-6 text-sm  md:text-lg">
              Experience seamless learning with AI that reviews assignments and
              grades them efficiently. Join us today and make learning smarter!
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <img
                src={profilePicture || download}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full border shadow"
              />
              <label
                htmlFor="fileInput"
                className="mt-2 cursor-pointer text-blue-500"
              >
                <Camera className="w-6 h-6" />
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full border p-3 rounded-lg"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <div className="flex justify-center items-center">
              <label className="font-medium w-1/3 mb-1">Select Role: </label>
              <select
                className="w-2/3 border p-3 rounded-lg"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                {/* <option value="teacher">Teacher</option> */}
              </select>
            </div>

            {role === "teacher" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Specialized Subject */}
                <div>
                  <label className="block font-medium mb-1">
                    Specialized Subject
                  </label>
                  <select
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                    value={teacherSubject}
                    onChange={(e) => setTeacherSubject(e.target.value)}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjectsList.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block font-medium mb-1">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                    min="0"
                  />
                </div>
              </div>
            )}

            {role === "student" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Class Selection */}
                <div>
                  <label className="block font-medium mb-1">Class: </label>
                  <select
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                    value={studentClass}
                    onChange={(e) => setStudentClass(Number(e.target.value))}
                    required
                  >
                    <option value="">Select Class</option>
                    {Array.from({ length: 4 }, (_, i) => (
                      <option key={i + 9} value={i + 9}>
                        Class {i + 9}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subjects Selection */}
                <div className="relative w-full" ref={dropdownRef}>
                  <label className="block font-medium mb-1">
                    Select Subjects
                  </label>

                  {/* Button to toggle dropdown */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-full border border-gray-300 p-2 rounded-md flex justify-between items-center focus:ring-2 focus:ring-green-400"
                  >
                    {studentSubjects.length > 0
                      ? studentSubjects.join(", ")
                      : "Select Subjects"}
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  </button>

                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg p-2 z-20 max-h-40 overflow-y-auto">
                      {subjectsList.map((subject) => (
                        <label
                          key={subject}
                          className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={studentSubjects.includes(subject)}
                            onChange={() => handleSubjectSelect(subject)}
                            className="form-checkbox text-green-500"
                          />
                          <span>{subject}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border p-3 rounded-lg pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                required
              />
              <label className="ml-2 text-sm">
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-blue-600 font-semibold underline"
                >
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              className="bg-green-600 text-white w-full px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center"
              disabled={isSigningUp} // Disable button during sign-up process
            >
              {isSigningUp ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold underline"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
