import React, { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore";
import download from "../assets/download.png"

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

  const classes = [...new Set(students.map((user) => user.studentClass))].sort(
    (a, b) => a - b
  );

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
    <div className="min-h-screen flex justify-center p-4 relative">
      <div className="container mx-auto p-4 md:p-8 bg-gray-100 shadow-lg rounded-lg w-full">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-green-700 mb-6 md:mb-8">
          Students List
        </h2>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {classes.map((className) => (
            <button
              key={className}
              onClick={() => setSelectedClass(className)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedClass === className
                  ? "bg-green-700 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Class {className}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg min-w-[600px]">
            <thead className="bg-gradient-to-r from-green-600 to-gray-700 text-white">
              <tr>
                <th className="border p-3 md:p-4">Profile</th>
                <th className="border p-3 md:p-4">Name</th>
                <th className="border p-3 md:p-4">Subjects</th>
                <th className="border p-3 md:p-4">Email</th>
                <th className="border p-3 md:p-4">Mobile</th>
                <th className="border p-3 md:p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {selectedClass ? (
                selectedClassStudent.length > 0 ? (
                  selectedClassStudent.map((student, index) => (
                    <tr
                      key={student._id}
                      className={`text-center border-b transition ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    >
                      <td className="border p-3 md:p-4">
                        <img
                          src={student.profilePicture || download}
                          alt={student.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full mx-auto"
                        />
                      </td>
                      <td className="border p-3 md:p-4 font-bold">
                        {student.name}
                      </td>
                      <td className="border p-3 md:p-4">
                        {student.subjects.join(", ")}
                      </td>
                      <td className="border p-3 md:p-4">{student.email}</td>
                      <td className="border p-3 md:p-4">{student.mobile}</td>
                      <td className="border p-3 md:p-4">
                        <button
                          onClick={() => handleRejectUser(student._id)}
                          className="bg-gray-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-900 transition shadow-md w-full md:w-auto"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-6 text-gray-500 text-lg"
                    >
                      No students found for this class.
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-500 text-lg"
                  >
                    Please select a class to view students.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;
