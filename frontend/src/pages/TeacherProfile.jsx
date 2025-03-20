import React, { useCallback, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import download from "../assets/download.png";
import {
  FaEdit,
  FaSave,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaChalkboardTeacher,
  FaBirthdayCake,
} from "react-icons/fa";

function TeacherProfile() {
  const { user, updateProfile } = useAuthStore();

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTeacher, setUpdatedTeacher] = useState(user);

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedTeacher({ ...updatedTeacher, [e.target.name]: e.target.value });
  };

  // Save changes
 const handleSave = async () => {
   try {
     const updatedUser = await updateProfile({
       mobile: updatedTeacher.mobile,
       bio: updatedTeacher.bio,
       dob: updatedTeacher.dob,
       address: updatedTeacher.address,
     });

     setUpdatedTeacher(updatedUser);
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

        {/* Teacher Info */}
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-600 flex items-center justify-center gap-2">
          <FaEnvelope className="text-gray-500" /> {user.email}
        </p>
        <span className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full mt-2">
          Teacher
        </span>

        {/* Editable Fields */}
        <div className="mt-4 text-left space-y-4">
          {/* Phone */}
          <div className="flex items-center gap-2">
            <FaPhone className="text-green-600" />
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={updatedTeacher.mobile}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <p className="text-gray-700">{user.mobile}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-red-500 mt-1" />
            {isEditing ? (
              <textarea
                name="address"
                value={updatedTeacher.address}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <p className="text-gray-700">
                {user?.address || "No Address Saved"}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex items-center gap-2">
            <FaBirthdayCake className="text-yellow-500" />
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={updatedTeacher.dob}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <p className="text-gray-700">
                {user.dob
                  ? new Date(user.dob).toLocaleDateString("en-GB") // Formats to DD/MM/YYYY
                  : "Not Provided"}
              </p>
            )}
          </div>

          {/* Specialization */}
          <div className="flex items-center gap-2">
            <FaChalkboardTeacher className="text-blue-500" />
            <p className="text-gray-700">
              Specialization: {user.specializedSubject}
            </p>
          </div>

          {/* Experience */}
          <p className="text-gray-700">Experience: {user.experience}</p>

          {/* Bio */}
          <div>
            <label className="text-gray-700 font-medium">Bio:</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={updatedTeacher.bio}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full mt-1 focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <p className="text-gray-600 italic mt-1">
                "{user.bio || "No bio available yet pls provide one"}"
              </p>
            )}
          </div>
        </div>

        {/* Edit / Save Button */}
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

export default TeacherProfile;
