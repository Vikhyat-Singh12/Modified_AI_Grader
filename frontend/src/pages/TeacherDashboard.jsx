import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useTeacherStore } from "../store/useTeacherStore";
import { Plus } from "lucide-react";
import studentDashboardBg from "../assets/stu/student_dashboard.png";
import download from "../assets/download.png";

function TeacherDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    getStudentandAssignment,
    students: studentsData,
    assignments: assignmentsData,
    submissionOfPartocularAssignment,
    getSubmissionofParticularAssignment,
    particularStudentSubmission,
    getParticularStudentSubmission,
  } = useTeacherStore();

  const classes = user.assignedClasses.sort((a, b) => a - b) || [];
  const [selectedClass, setSelectedClass] = useState(classes[0]);

  useEffect(() => {
    getStudentandAssignment({ selectedClass });
  }, [selectedClass]);

  useEffect(() => {
    if (assignmentsData.length > 0) {
      assignmentsData.forEach(async (assignment) => {
        await getSubmissionofParticularAssignment({
          assignmentId: assignment._id,
        });
      });
    }

    if (studentsData.length > 0) {
      studentsData.forEach(async (student) => {
        await getParticularStudentSubmission({
          studentId: student._id,
          studentClass: student.studentClass,
        });
      });
    }
  }, [assignmentsData, studentsData]);

  return (
    <div className="min-h-screen flex justify-center items-center p-6 relative">
      <div className="absolute inset-0 -z-10 w-full h-full">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${studentDashboardBg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "600px",
          }}
        ></div>
        <div className="w-full h-full bg-white opacity-80 absolute inset-0"></div>
      </div>

      <div className="w-full max-w-7xl  bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-blue-800 text-center">
          Teacher Dashboard
        </h2>

        <div className="flex justify-between items-center mb-6 border-b-2 pb-2">
          {/* Classes Selection (Underlined) */}
          <div className="flex gap-6 overflow-x-auto">
            {classes.map((cls, index) => (
              <span
                key={index}
                onClick={() => setSelectedClass(cls)}
                className={`cursor-pointer pb-1 text-lg ${
                  cls === selectedClass
                    ? "border-b-2 border-blue-600 font-semibold text-blue-800"
                    : "text-gray-600"
                }`}
              >
                Class {cls}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-evenly flex-col sm:flex-row">
          <div className="flex justify-center gap-6 mb-6">
            {[
              {
                label: "Students",
                value: studentsData?.length || 0,
                icon: "👥",
              },
              {
                label: "Assignments",
                value: assignmentsData?.length || 0,
                icon: "📝",
              },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-5xl">{stat.icon}</span>
                <span className="text-lg font-semibold">
                  {stat.label}: {stat.value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center ">
            <img
              src={user?.profilePicture || download}
              alt="Teacher Pic"
              className="w-32 h-32 rounded-md mx-4"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mt-4">
                {user?.name}
              </h3>
              <h3 className="font-semibold">Experience: {user?.experience}</h3>
              <h3 className="font-semibold">{user?.specializedSubject}</h3>
            </div>
          </div>
        </div>

        <div className="flex justify-between my-4 flex-col sm:flex-row items-center">
          <h3 className="text-2xl font-bold text-gray-800 mt-6">
            Previous Assignments
          </h3>
          <br />
          <button
            onClick={() => navigate("/teacher-dashboard/create-assignment")}
            className="flex items-center gap-2 bg-yellow-400 text-white px-5 py-1 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300"
          >
            <Plus /> <span>Create New Assignment</span>
          </button>
        </div>

        {assignmentsData?.length ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse rounded-lg mt-4">
              <thead className="bg-gradient-to-r from-blue-600 to-gray-700 text-white">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-left">Completion</th>
                  <th className="p-3 text-center">View Assignment</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignmentsData.map((assignment) => {
                  const completedSubmissions =
                    submissionOfPartocularAssignment[assignment._id]?.length ||
                    0;
                  const totalStudents = studentsData.length || 1; // Avoid division by zero
                  const completionPercentage = (
                    (completedSubmissions / totalStudents) *
                    100
                  ).toFixed(1);

                  return (
                    <tr key={assignment._id} className="text-gray-800">
                      <td className="border p-3 font-bold">
                        {assignment.title}
                      </td>
                      <td className="border p-3">
                        {new Date(assignment.deadline).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "2-digit",
                          }
                        )}
                      </td>
                      <td className="border p-3">
                        <div className="relative w-32 h-4 bg-gray-200 rounded-full">
                          <div
                            className="absolute top-0 left-0 h-4 bg-green-500 rounded-full"
                            style={{ width: `${completionPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold  text-gray-700 ml-2">
                          {completedSubmissions}/{totalStudents} (
                          {completionPercentage}%)
                        </span>
                      </td>
                      <td className="border p-3 text-center">
                        <a
                          href={assignment.assignmentFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 md:px-4 md:py-1 rounded-md shadow-md transition-all text-xs md:text-sm"
                        >
                          📂 View
                        </a>
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                          onClick={() =>
                            navigate(`/teacher-dashboard/${assignment._id}`)
                          }
                        >
                          View Submissions
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No assignments available for this class.
          </p>
        )}

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
          Students in Class {selectedClass}
        </h3>
        <div className="w-full overflow-x-auto">
          {studentsData?.length > 0 ? (
            <table className="w-full border-collapse rounded-lg">
              <thead className="bg-gradient-to-r from-blue-600 to-gray-700 text-white">
                <tr>
                  <th className="p-3 text-left">Profile</th>
                  <th className="p-3 text-left">Student Name</th>
                  <th className="p-3 text-left">Progress</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentsData?.map((student) => {
                  const assignmentSubmit =
                    particularStudentSubmission[student._id]?.length || 0;
                  const percentage = (
                    (assignmentSubmit / assignmentsData?.length) *
                    100
                  ).toFixed(2);

                  return (
                    <tr
                      key={student._id}
                      className="odd:bg-gray-100 hover:bg-gray-200"
                    >
                      <td className=" p-3">
                        <img
                          className="w-12 h-12 rounded-full"
                          src={student.profilePicture || download}
                          alt="profilePic"
                        />
                      </td>
                      <td className="p-3 font-bold text-gray-900">
                        {student.name}
                      </td>
                      <td className="p-3">
                        {assignmentSubmit}/{assignmentsData.length} (
                        {percentage}
                        %)
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() =>
                            navigate(
                              `/teacher-dashboard/student-profile/${student._id}`
                            )
                          }
                          className="bg-sky-400 text-white px-3 py-1 rounded hover:bg-sky-600 relative group"
                        >
                          🔍
                          <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                            View Student Profile
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">
              No students enrolled in this class.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
