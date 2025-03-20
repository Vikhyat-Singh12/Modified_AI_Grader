import React, { useState } from "react";
import download from "../assets/download.png";
import { Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [studentClass, setStudentClass] = useState("");
  const [studentSubjects, setStudentSubjects] = useState([]);
  const [teacherSubject, setTeacherSubject] = useState("");
  const [experience, setExperience] = useState(""); 
  const [profilePicture, setprofilePicture] = useState(null);
  const [file, setFile] = useState(null);
  
  const {signup} = useAuthStore();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setprofilePicture(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const subjectsList = ["Mathematics","Science","English","History","Geography","Computer"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions to proceed.");
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
    setConfirmPassword("");
    setRole("student");
    setStudentClass("");    
    setStudentSubjects([]);
    setTeacherSubject("");
    setExperience("");
    setprofilePicture(null);
    setFile(null);
    setTermsAccepted(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Preview & Image Upload */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <img
                src={profilePicture || download}
                alt="Profile Preview"
                className="w-20 h-20 object-cover rounded-full border border-gray-300"
              />
              <label htmlFor="fileInput" className="mt-2 cursor-pointer">
                <Camera className="w-8 h-8 text-green-500" />
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Form Inputs - Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block font-medium mb-1">Mobile Number</label>
              <input
                type="tel"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block font-medium mb-1">Role</label>
              <select
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium mb-1">Password</label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Confirm Password</label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Additional Fields Based on Role */}
          {role === "student" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Class Selection */}
              <div>
                <label className="block font-medium mb-1">Class</label>
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
              <div>
                <label className="block font-medium mb-1">
                  Select Subjects
                </label>
                <select
                  multiple
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                  onChange={(e) =>
                    setStudentSubjects(
                      Array.from(e.target.selectedOptions, (opt) => opt.value)
                    )
                  }
                  required
                >
                  {subjectsList.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

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

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-green-600"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              required
            />
            <label className="ml-2 text-sm">
              I agree to the{" "}
              <a
                href="/terms"
                className="text-orange-600 font-semibold underline"
              >
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Signup Button */}
          <button className="bg-green-600 text-white w-full px-4 py-2 rounded-md hover:bg-green-700 transition">
            Sign Up
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
