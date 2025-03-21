import React from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { useTeacherStore } from "../store/useTeacherStore";
import { useAuthStore } from "../store/useAuthStore";
import download from "../assets/download.png";
import dashboardImage from "../assets/teacherdashboard.svg";
import "chart.js/auto";

function StudentDashboard() {
  const { studentId } = useParams();

  const {
    particularStudentSubmission,
    particularStudent,
    assignments: eachAssignments,
  } = useTeacherStore();
  const { user } = useAuthStore();
  const student = particularStudent[studentId] || [];
  const assignments = particularStudentSubmission[studentId] || [];

  const completedAssignments = assignments.filter((a) => a.status === true);

  const averageScore =
    completedAssignments.length > 0
      ? completedAssignments.reduce((sum, a) => sum + a.aiMarks, 0) /
        completedAssignments.length
      : 0;

  const groupedAssignments = eachAssignments.reduce((acc, assignment) => {
    const submission = assignments.find(
      (sub) => sub.assignmentId === assignment._id
    );

    if (!acc[assignment.title]) {
      acc[assignment.title] = {
        totalScore: 0,
        count: 0,
        total: assignment.totalMarks,
      };
    }

    if (submission && submission.status === true) {
      acc[assignment.title].totalScore += submission.aiMarks;
      acc[assignment.title].count += 1;
    }

    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(groupedAssignments),
    datasets: [
      {
        label: "Average Score",
        data: Object.keys(groupedAssignments).map((title) =>
          groupedAssignments[title].count > 0
            ? groupedAssignments[title].totalScore /
              groupedAssignments[title].count
            : 0
        ),
        backgroundColor: "rgba(255, 140, 0, 0.8)",
        borderColor: "rgba(255, 69, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center mb-6">
        <img
          src={student.profilePicture || download}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="ml-6">
          <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-lg text-gray-600">Class: {student.studentClass}</p>
          <p className="text-gray-600">Subject: {user.specializedSubject}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-r from-[#A7C7E7] to-[#89AFCF] text-white p-6 rounded-lg text-center shadow-md">
          <h3 className="text-xl font-semibold">Total Assignments</h3>
          <p className="text-3xl font-bold">{eachAssignments.length}</p>
        </div>
        <div className="bg-gradient-to-r from-[#8DAEC7] to-[#6E92AD] text-white p-6 rounded-lg text-center shadow-md">
          <h3 className="text-xl font-semibold">Submitted</h3>
          <p className="text-3xl font-bold">{completedAssignments.length}</p>
        </div>
        <div className="bg-gradient-to-r from-[#728DAA] to-[#526D87] text-white p-6 rounded-lg text-center shadow-md">
          <h3 className="text-xl font-semibold">Pending Assignments</h3>
          <p className="text-3xl font-bold">
            {eachAssignments.length - completedAssignments.length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-[#5A7D9A] to-[#3A5D7A] text-white p-6 rounded-lg text-center shadow-md">
          <h3 className="text-xl font-semibold">Average Score</h3>
          <p className="text-3xl font-bold">{averageScore.toFixed(2)}%</p>
        </div>
      </div>

      <div className="p-6 ">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Performance Trends
        </h3>
        <div className="flex items-center">
          <div className="h-[300px] w-full sm:w-3/4">
            <Bar data={chartData} />
          </div>
          <div className="hidden sm:w-1/4 sm:flex justify-center">
            <img src={dashboardImage} alt="Dashboard" className="w-80 h-auto" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Previous Assignments
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-[#0AA1DD] to-[#2155CD] text-white">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">View Submission</th>
              </tr>
            </thead>
            <tbody>
              {eachAssignments.length > 0 ? (
                eachAssignments.map((assignment, index) => {
                  const submission = assignments.find(
                    (sub) => sub.assignmentId === assignment._id
                  );

                  return (
                    <tr
                      key={index}
                      className={`text-gray-800 ${
                        assignment.status === "Submitted"
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >
                      <td className="p-3 font-semibold">{assignment.title}</td>
                      <td className="p-3">
                        {submission && submission.status
                          ? submission.aiMarks
                          : "--"}
                      </td>
                      <td className="p-3">{assignment.totalMarks}</td>
                      <td className="p-3 font-bold">
                        {submission && submission.status ? (
                          <span className="text-green-600">✔ Submitted</span>
                        ) : (
                          <span className="text-red-600">✖ Pending</span>
                        )}
                      </td>
                      <td className="p-3">
                        {submission &&
                        submission.status &&
                        submission.fileUrl ? (
                          <a
                            href={submission.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#008DDA] hover:bg-[#0AA1DD] text-white px-3 py-1 rounded-lg shadow-md transition-all"
                          >
                            📄 View
                          </a>
                        ) : (
                          <span className="text-gray-500">Not Available</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    No assignments found
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

export default StudentDashboard;
