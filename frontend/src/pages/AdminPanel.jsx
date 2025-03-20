import React, { useState, useEffect, useRef } from "react";
import ApprovalModal from "./ApprovalModal";
import { CheckCircle, Eye } from "lucide-react";
import { useAdminStore } from "../store/useAdminStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import download from "../assets/download.png";



const ClassSelector = ({ user, selectedClasses, setSelectedClasses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const classes = [9, 10, 11, 12];

  // Handle Click Outside to Close Dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[50%] px-4 py-2 text-lg font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-300 transition-all"
      >
        {selectedClasses[user._id]?.length > 0
          ? `Selected: ${selectedClasses[user._id].join(", ")}`
          : "Select Classes"}
      </button>

      {isOpen && (
        <div className="absolute left-0 w-56 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50 animate-fade-in">
          {classes.map((className) => (
            <label
              key={className}
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-all"
            >
              <input
                type="checkbox"
                value={className}
                checked={
                  selectedClasses[user._id]?.includes(className) || false
                }
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setSelectedClasses((prev) => ({
                    ...prev,
                    [user._id]: isChecked
                      ? [...(prev[user._id] || []), className]
                      : prev[user._id]?.filter((c) => c !== className),
                  }));
                }}
                className="w-5 h-5 text-blue-500"
              />
              <span className="text-lg font-medium">Class {className}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};


function AdminPanel() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState({});
  const [filteredPendingUsers, setFilteredPendingUsers] = useState([]);
  const {user} = useAuthStore();

  const {
    getpendingUser,
    verifyUser,
    rejectUser,
    getTeachers,
    getStudents,
    pendingUsers,
    teachers,
    students,
  } = useAdminStore();

  useEffect(() => {
    getpendingUser();
    getTeachers();
    getStudents();
  }, []);

  useEffect(() => {
    setFilteredPendingUsers(pendingUsers);
  }, [pendingUsers]);

  const classes = [9, 10, 11, 12];

  // Open the modal with user details
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Assign class before approving teacher
  const handleClassChange = async (userId, value) => {
    setSelectedClasses((prev) => ({
      ...prev,
      [userId]: value,
    }));
  };

  // Approve User Function
  const handleApprove = async () => {
    if (!selectedUser) return;

    if (selectedUser.role === "teacher") {
      const assignedClasses = selectedClasses[selectedUser._id];

      if (!assignedClasses || assignedClasses.length === 0) {
        toast.error(
          "Please select at least one class before approving the teacher."
        );
        return;
      }
      verifyUser(selectedUser._id, assignedClasses);
    } else {
      verifyUser(selectedUser._id);
    }

    setFilteredPendingUsers((prevPendingUsers) =>
      prevPendingUsers.filter((user) => user._id !== selectedUser._id)
    );

    toast.success(`${selectedUser.name} has been approved successfully!`);
    closeModal();
  };

  // Reject User Function
  const handleReject = async () => {
    if (!selectedUser) return;
    rejectUser(selectedUser._id);

    setFilteredPendingUsers((prevPendingUsers) =>
      prevPendingUsers.filter((user) => user._id !== selectedUser._id)
    );
    closeModal();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
        {/* Left Section - Title with Icon */}
        <h2 className="text-5xl font-bold text-gray-900 flex items-center gap-2">
          <lottie-player
            className="w-36 h-36"
            id="firstLottie"
            autoplay
            loop
            mode="normal"
            src="https://lottie.host/e90c4666-1a9e-4154-85a8-a8c29696b1ab/mIphzMK96K.json"
            background="transparent"
          ></lottie-player>

          <span className=" inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:from-indigo-300  hover:via-purple-300 hover:to-pink-300 transition-all duration-500 text-5xl">
            Admin Panel
          </span>
        </h2>

        {/* Right Section - Image */}

        <img
          src={user.profilePicture}
          alt="Admin Panel"
          className="w-28 h-36 object-cover rounded-md border-2 border-gray-500 "
        />
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 my-6">
        <div
          className="bg-blue-500 text-white p-1 rounded-lg shadow-lg flex flex-col items-center"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/abstract-vector-blue-mesh-background-chaotically-connected-points-polygons-flying-space-flying-debris-futuristic-technology-style-card-lines-points-circles-planes-futuristic-design_1217-654.jpg?uid=R188590608&ga=GA1.1.687125877.1740208879&semt=ais_hybrid')",
          }}
        >
          <lottie-player
            className="w-48 h-36"
            id="firstLottie"
            autoplay
            loop
            mode="normal"
            src="https://lottie.host/6bac5947-8fb8-40be-bdf9-044bd5db8c4a/YVn2LbPgEn.json"
            background="transparent"
          ></lottie-player>

          <h3 className="text-2xl font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">
            {(teachers?.length || 0) + (students?.length || 0)}
          </p>
        </div>

        <div
          className="bg-green-500 text-white p-1 rounded-lg shadow-lg flex flex-col items-center"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/office-desk-table-with-pencils-supplies-cup_155003-10186.jpg?uid=R188590608&ga=GA1.1.687125877.1740208879&semt=ais_hybrid')",
          }}
        >
          <lottie-player
            className="w- h-36"
            id="firstLottie"
            autoplay
            loop
            mode="normal"
            src="https://lottie.host/b0dbf9ec-f135-4c5c-9b9b-9ed41c7f10ab/wMUjNVnvEl.json"
            background="transparent"
          ></lottie-player>

          <h3 className="text-2xl font-semibold">Teachers</h3>
          <p className="text-3xl font-bold">{teachers.length}</p>
        </div>

        <div
          className="bg-purple-500 text-white p-1 rounded-lg shadow-lg flex flex-col items-center"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-vector/green-texture-schoolchildren_7993-173.jpg?uid=R188590608&ga=GA1.1.687125877.1740208879&semt=ais_hybrid')",
          }}
        >
          <lottie-player
            className="w-36 h-36"
            id="firstLottie"
            autoplay
            loop
            mode="normal"
            src="https://lottie.host/0c878e65-1566-4b2a-ab42-e94516a48d14/ZchulHlP2I.json"
            background="transparent"
          ></lottie-player>

          <h3 className="text-2xl font-semibold">Students</h3>
          <p className="text-3xl font-bold">{students.length}</p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">New Forms Recieved</h3>
          <p className="text-3xl font-bold mt-2">
            {filteredPendingUsers.length}
          </p>
        </div>
      </div>

      {/* Pending User Approvals */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-lg mb-6 overflow-x-auto">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" /> Pending Approvals
        </h3>

        <div className="w-full overflow-x-auto">
          <table className="w-full   text-center ">
            <thead>
              <tr className="bg-gradient-to-r from-[#0AA1DD] to-[#2155CD] text-2xl text-white">
                <th className="p-2">Profile</th>
                <th className="p-2">Name</th>
                <th className="p-2">Role</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Class</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPendingUsers.length > 0 ? (
                filteredPendingUsers.map((user) => (
                  <tr key={user.id} className=" ">
                    <td>
                      <img
                        src={user.profilePicture || download}
                        alt="Profile"
                        className="w-15 h-16 rounded-full mx-auto"
                      />
                    </td>

                    <td className="text-xl p-2">{user.name}</td>
                    {user.role === "student" ? (
                      <td className=" text-xl p-2">Student</td>
                    ) : (
                      <td className=" text-xl p-2">Teacher</td>
                    )}

                    <td className="p-2 text-xl">
                      {user.role === "teacher"
                        ? user.specializedSubject
                        : user.subjects.join(", ")}
                    </td>
                    <td className="text-xl p-2">
                      {user.role === "teacher" ? (
                        <ClassSelector
                          user={user}
                          selectedClasses={selectedClasses}
                          setSelectedClasses={setSelectedClasses}
                        />
                      ) : (
                        `Class ${user.studentClass}`
                      )}
                    </td>
                    <td className=" p-4 flex justify-center gap-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 text-2xl"
                        onClick={() => openModal(user)}
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No pending approvals.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval Modal */}
      {selectedUser && (
        <ApprovalModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          user={selectedUser}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

export default AdminPanel;
