import React from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useTeacherStore } from "../store/useTeacherStore";
import { useAuthStore } from "../store/useAuthStore";


function ViewStudentProfile() {
  const { studentId } = useParams();
  const {particularStudentSubmission, particularStudent, assignments: eachAssignments} = useTeacherStore();
  const {user} = useAuthStore();
  const student = particularStudent[studentId] || [];
  const assignments = particularStudentSubmission[studentId] || [];

  const completedAssignments = assignments.filter(
    (a) => a.status === true
  );


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
           backgroundColor: "rgba(54, 162, 235, 0.6)",
         },
       ],
     };



  return (
    <div className="container mx-auto p-6">
      {/* Profile Section */}

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="flex items-center bg-white p-6 rounded-lg shadow-md mb-6">
          <img
            src={student.profilePicture}
            alt="Profile"
            className="w-28 h-28 rounded-lg border-2 border-gray-300 object-cover"
          />
          <div className="ml-4">
            <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
            <p className="text-lg text-gray-600">{student.studentClass}</p>
            <p className="text-lg text-gray-500">
              Subject: {user.specializedSubject}
            </p>
          </div>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold">Average Score</h3>
          <p className="text-3xl font-bold">{averageScore.toFixed(1)}%</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold">Completed Assignments</h3>
          <p className="text-3xl font-bold">{completedAssignments.length}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold">Pending Assignments</h3>
          <p className="text-3xl font-bold">
            {eachAssignments.length - completedAssignments.length}
          </p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Performance Trends
        </h3>
        <Bar data={chartData} />
      </div>

      {/* Assignment Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Assignments</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Score</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Feedback</th>
              <th className="border p-2">View Submission</th>
            </tr>
          </thead>
          <tbody>
            {eachAssignments.length > 0 ? (
              eachAssignments.map((assignment, index) => {
                const submission = assignments.find(
                  (sub) => sub.assignmentId === assignment._id
                );

                return (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{assignment.title}</td>
                    <td className="border p-2">
                      {submission && submission.status
                        ? submission.aiMarks
                        : "--"}
                    </td>
                    <td className="border p-2">{assignment.totalMarks}</td>
                    <td className="border p-2">
                      {submission && submission.status ? (
                        <span className="text-green-600 font-bold">
                          ✅ Completed
                        </span>
                      ) : (
                        <span className="text-yellow-600 font-bold">
                          ⏳ Pending
                        </span>
                      )}
                    </td>
                    <td className="border p-2">
                      {submission && submission.status ? (
                        <span className="text-gray-600">
                          {submission.aiShortFeedback}
                        </span>
                      ) : (
                        "Not yet graded"
                      )}
                    </td>
                    <td className="border p-2">
                      {submission && submission.status && submission.fileUrl ? (
                        <a
                          href={submission.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          📂 View
                        </a>
                      ) : (
                        "No Submission"
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No assignments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStudentProfile;
