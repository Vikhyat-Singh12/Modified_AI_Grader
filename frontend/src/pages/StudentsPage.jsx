import React, { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore";

function Students() {
  const { students, getStudents, rejectUser } = useAdminStore();
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  const classes = [...new Set(students.map((user) => user.studentClass))].sort((a, b) => a - b);

  const selectedClassStudent = filteredStudents.filter(
    (student) => student.studentClass === Number(selectedClass)
  );

  const handleRejectUser = async (userId) => {
    await rejectUser(userId);
    setFilteredStudents((prevStudents) =>
      prevStudents.filter((student) => student._id !== userId)
    );
  };

  
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        Students List
      </h2>

      {/* Class Selection Dropdown */}
      <div className="mb-6 flex justify-center">
        <select
          className="border p-3 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">-- Select Class --</option>
          {classes.map((className, index) => (
            <option key={index} value={className}>
              {`Class ${className}`}
            </option>
          ))}
        </select>
      </div>

      {/* Students Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border p-3">Profile</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Subjects</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Mobile</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedClass ? (
              selectedClassStudent.length > 0 ? (
                selectedClassStudent.map((student) => (
                  <tr key={student._id} className="text-center border-b">
                    <td className="border p-3">
                      <img
                        src={student.profilePicture}
                        alt={student.name}
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    </td>
                    <td className="border p-3 font-semibold">{student.name}</td>
                    <td className="border p-3">
                      {student.subjects.join(", ")}
                    </td>
                    <td className="border p-3">{student.email}</td>
                    <td className="border p-3">{student.mobile}</td>
                    <td className="border p-3">
                      <button
                        onClick={() => handleRejectUser(student._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No students found for this class.
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  Please select a class to view students.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
