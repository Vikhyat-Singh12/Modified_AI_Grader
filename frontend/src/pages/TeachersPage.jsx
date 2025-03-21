import React, { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore";
import download from "../assets/download.png";


function Teachers() {
  const { teachers, getTeachers, rejectUser } = useAdminStore();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    getTeachers();
  }, []);

  const allClasses = [
    ...new Set(teachers.flatMap((t) => t.assignedClasses)),
  ].sort((a, b) => a - b);
  const allSubjects = [...new Set(teachers.map((t) => t.specializedSubject))];

  useEffect(() => {
    const users = teachers.filter((teacher) => {
      return (
        (selectedClass === "" ||
          teacher.assignedClasses.includes(Number(selectedClass))) &&
        (selectedSubject === "" ||
          teacher.specializedSubject === selectedSubject)
      );
    });
    setFilteredTeachers(users);
  }, [teachers, selectedClass, selectedSubject]);

  const handleRejectUser = async (userId) => {
    await rejectUser(userId);
    setFilteredTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher._id !== userId)
    );
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-[#2155CD] to-[#41C9E2] p-4 rounded-lg text-center shadow-md mb-8">
          Teachers List
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border-b border-gray-300 p-2 w-full md:w-64 focus:outline-none focus:border-blue-500"
          >
            <option value="">Filter by Class</option>
            {allClasses.map((className, index) => (
              <option
                key={index}
                value={className}
              >{`Class ${className}`}</option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border-b border-gray-300 p-2 w-full md:w-64 focus:outline-none focus:border-blue-500"
          >
            <option value="">Filter by Subject</option>
            {allSubjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 text-left">Profile</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Assigned Classes</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher, index) => (
                <tr
                  key={teacher._id}
                  className={`hover:bg-gray-100 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b border-gray-200`}
                >
                  <td className="p-4 align-middle">
                    <img
                      src={teacher.profilePicture || download}
                      alt={teacher.name}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="p-4 align-middle font-semibold">
                    {teacher.name}
                  </td>
                  <td className="p-4 align-middle">
                    {teacher.specializedSubject}
                  </td>
                  <td className="p-4 align-middle">
                    {teacher.assignedClasses.join(", ")}
                  </td>
                  <td className="p-4 align-middle text-blue-500">
                    {teacher.email}
                  </td>
                  <td className="p-4 align-middle">{teacher.mobile}</td>
                  <td className="p-4 align-middle">
                    <button
                      onClick={() => handleRejectUser(teacher._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teachers;
