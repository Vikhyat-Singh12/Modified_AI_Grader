import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye } from "lucide-react";
import { useTeacherStore } from "../store/useTeacherStore";

function ViewTestSubmissions() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const {
    students,
    tests,
    submissionOfParticularTest,
    getSubmissionofParticularTest,
  } = useTeacherStore();

  const test = tests.find((test) => test._id === testId);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    setSubmissions(submissionOfParticularTest[testId] || []);
  }, [submissionOfParticularTest, testId]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800">
          📘 Submissions for {test?.title || "Test"}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Test Info */}
      <div className="bg-gradient-to-r from-white via-gray-50 to-white p-6 rounded-xl shadow-lg border mb-8">
        <h3 className="text-2xl font-bold text-blue-700 mb-3">📄 Test Details</h3>
        <p className="mb-1 text-lg">
          <strong>🗓 Due Date:</strong>{" "}
          {test?.deadline
            ? new Date(test.deadline).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "2-digit",
              })
            : "N/A"}
        </p>
        <p className="text-lg">
          <strong>📥 Total Submissions:</strong>{" "}
          <span className="text-green-600 font-bold">{submissions.length}</span>{" "}
          /<span className="text-gray-800"> {students.length}</span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6 border">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">👨‍🎓 Student Test Submissions</h3>
        <table className="w-full text-sm text-left border border-gray-300">
          <thead className="bg-blue-100 sticky top-0 z-10">
            <tr>
              <th className="p-4 border text-center">👤 Profile</th>
              <th className="p-4 border text-center">Student Name</th>
              <th className="p-4 border text-center">Status</th>
              <th className="p-4 border text-center">Submission Time</th>
              <th className="p-4 border text-center">View Answer</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const submission = submissions.find(
                (submission) => submission.studentId === student._id
              );

              return (
                <tr
                  key={index}
                  className={`transition-all duration-200 hover:bg-gray-50 ${
                    submission?.status ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <td className="p-4 border text-center">
                    <img
                      className="w-12 h-12 mx-auto rounded-full object-cover shadow"
                      src={student.profilePicture}
                      alt="profile"
                    />
                  </td>
                  <td className="p-4 border text-center font-semibold text-gray-800">
                    {student.name}
                  </td>
                  <td
                    className={`p-4 border text-center font-semibold ${
                      submission?.status ? "text-green-700" : "text-red-600"
                    }`}
                  >
                    {submission?.status ? "✅ Submitted" : "❌ Pending"}
                  </td>
                  <td className="p-4 border text-center text-sm text-gray-600">
                    {submission?.submissionDateTime
                      ? new Date(submission.submissionDateTime).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="p-4 border text-center">
                    {submission?.status ? (
                      <div
                        onClick={() =>
                          navigate(
                            `/subjects/test/${test.subject}/${submission._id}`
                          )
                        }
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        Review Test
                      </div>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewTestSubmissions;
