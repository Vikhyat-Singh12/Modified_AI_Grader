import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import download from "../assets/download.png";
import {
  FaEdit,
  FaSave,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaIdBadge,
  FaBirthdayCake,
} from "react-icons/fa";

function AdminProfile() {
  const { user, updateProfile } = useAuthStore();
  const [admin, setAdmin] = useState({ ...user }); // Clone user object
  const [isEditing, setIsEditing] = useState(false);

 const handleChange = (e) => {
   const { name, value } = e.target;

   if (name === "dob") {
     const formattedDate = new Date(value).toISOString().split("T")[0]; // Ensure YYYY-MM-DD
     setAdmin({ ...admin, dob: formattedDate });
   } else {
     setAdmin({ ...admin, [name]: value });
   }
 };

 // Save changes
 const handleSave = async () => {
   try {
     const updatedUser = await updateProfile({
       mobile: admin.mobile,
       bio: admin.bio,
       dob: admin.dob,
       address: admin.address,
     });

     // Ensure the dob is in the correct format before setting it in the state
     const formattedUser = {
       ...updatedUser,
       dob: updatedUser.dob
         ? new Date(updatedUser.dob).toISOString().split("T")[0]
         : "",
     };

     setAdmin(formattedUser);
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

        {/* Admin Info */}
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-600 flex items-center justify-center gap-2">
          <FaEnvelope className="text-gray-500" /> {user.email}
        </p>
        <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full mt-2">
          Admin
        </span>

        {/* Editable Fields */}
        <div className="mt-4 text-left space-y-4">
          {/* Phone */}
          <div className="flex items-center gap-2">
            <FaPhone className="text-green-600" />
            {isEditing ? (
              <input
                type="tel"
                name="mobile"
                value={admin.mobile}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <p className="text-gray-700">{user.mobile || "Not Provided"}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-red-500 mt-1" />
            {isEditing ? (
              <textarea
                name="address"
                value={admin.address}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <p className="text-gray-700">{user.address || "Not Provided"}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex items-center gap-2">
            <FaBirthdayCake className="text-yellow-500" />
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={admin.dob}
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

          {/* Admin ID */}
          <div className="flex items-center gap-2">
            <FaIdBadge className="text-blue-500" />
            <p className="text-gray-700">Admin ID: {user.adminId || "N/A"}</p>
          </div>

          {/* Bio */}
          <div>
            <label className="text-gray-700 font-medium">Bio:</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={admin.bio}
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

export default AdminProfile;
