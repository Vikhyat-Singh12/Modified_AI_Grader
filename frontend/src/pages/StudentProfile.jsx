import React, { useState } from "react";
import download from "../assets/download.png";
import {
  FaEdit,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBook,
  FaSave,
  FaCalendarAlt,
} from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

function StudentProfile() {
  const { user, updateProfile } = useAuthStore();

  const [student, setStudent] = useState(user);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Save changes
  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile({
        mobile: student.mobile,
        bio: student.bio,
        dob: student.dob,
        address: student.address,
      });

      setStudent(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        {/* Profile Image */}
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={user.profilePicture || download}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-gray-300"
          />
        </div>

        {/* Student Info */}
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-600 flex items-center justify-center gap-2">
          <FaEnvelope className="text-gray-500" /> {user.email}
        </p>
        <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full mt-2">
          Student
        </span>

        {/* Editable Information */}
        <div className="mt-4 text-left space-y-3">
          <div className="flex items-center gap-2">
            <FaPhone className="text-green-600" />
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={student.mobile}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-gray-700 text-sm">{user.mobile}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={student.address}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-gray-700 text-sm">
                {user.address || "Please update your address"}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={student.dob}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-gray-700">
                {user.dob
                  ? new Date(user.dob).toLocaleDateString("en-GB") // Formats to DD/MM/YYYY
                  : "Not Provided"}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <FaBook className="text-purple-500 mt-1" />
            <p className="text-gray-700 text-sm">Class: {user.studentClass}</p>
          </div>

          <p className="text-gray-700 text-sm">
            Subjects: {user.subjects.join(", ")}
          </p>

          <div>
            {isEditing ? (
              <textarea
                name="bio"
                value={student.bio}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-gray-600 italic">
                "{user.bio || "No bio available yet!!!"}"
              </p>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        {isEditing ? (
          <button
            onClick={handleSave}
            className="mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
          >
            <FaSave /> Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition w-full"
          >
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
