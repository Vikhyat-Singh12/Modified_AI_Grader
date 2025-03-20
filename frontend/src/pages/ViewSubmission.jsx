import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTeacherStore } from "../store/useTeacherStore";

function ViewSubmissions() {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const {
    submissionOfPartocularAssignment,
    students,
    assignments,
    updateSubmission,
  } = useTeacherStore();

  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    setSubmissions(submissionOfPartocularAssignment[assignmentId] || []);
  }, [submissionOfPartocularAssignment, assignmentId]);

  const [editableSubmission, setEditableSubmission] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [marks, setMarks] = useState("");

  const toggleEdit = (submission) => {
    if (editableSubmission === submission.studentId) {
      const updatedSubmission = {
        ...submission,
        aiMarks: Number(marks),
        aiShortFeedback: feedback,
      };

      updateSubmission({
        aiMarks: Number(marks),
        aiShortFeedback: feedback,
        editSubmittedAssignmentId: submission._id,
      });

      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((s) =>
          s._id === submission._id ? updatedSubmission : s
        )
      );

      setEditableSubmission(null);
    } else {
      setEditableSubmission(submission.studentId);
      setFeedback(submission.aiShortFeedback || "");
      setMarks(submission.aiMarks ? String(submission.aiMarks) : ""); 
    }
  };


  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Submissions for {assignment.title}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">
          Assignment Details
        </h3>
        <p>
          <strong>Due Date:</strong>{" "}
          {new Date(assignment.deadline).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "2-digit",
          })}
        </p>
        <p>
          <strong>Total Submissions:</strong>{" "}
          <span className="text-green-600 font-bold">{submissions.length}</span>{" "}
          /<span className="text-gray-800"> {students.length}</span>
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Student Submissions
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3 text-center">Profile</th>
              <th className="border p-3 text-center">Student Name</th>
              <th className="border p-3 text-center">Status</th>
              <th className="border p-3 text-center">Submission Time</th>
              <th className="border p-3 text-center">AI Feedback</th>
              <th className="border p-3 text-center">Marks</th>
              <th className="border p-3 text-center">View Answer</th>
              <th className="border p-3 text-center">Edit</th>
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
                  className={`text-gray-800 ${
                    submission?.status ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <td className="border p-3">
                    <img
                      className="w-12 h-12 mx-auto rounded-full"
                      src={student.profilePicture}
                      alt="profilePic"
                    />
                  </td>
                  <td className="border p-3 font-semibold">{student.name}</td>
                  <td
                    className={`border p-3 font-semibold ${
                      submission?.status ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {submission?.status ? "Submitted" : "Pending"}
                  </td>
                  <td className="border p-3">
                    {submission?.submissionDateTime
                      ? new Date(submission.submissionDateTime).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="border p-3">
                    {editableSubmission === student._id ? (
                      <input
                        type="text"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="border p-2 w-full"
                      />
                    ) : (
                      submission?.aiShortFeedback || "Pending AI Evaluation"
                    )}
                  </td>
                  <td className="border p-3 font-bold">
                    {editableSubmission === student._id ? (
                      <input
                        type="number"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        className="border p-2 w-full"
                      />
                    ) : typeof submission?.aiMarks === "number" ? (
                      submission.aiMarks
                    ) : (
                      "Not Graded"
                    )}
                  </td>
                  <td className="border p-3 text-center">
                    {submission?.fileUrl ? (
                      <a
                        href={submission.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md transition-all"
                      >
                        📄 View
                      </a>
                    ) : (
                      <span className="text-gray-500">Not Available</span>
                    )}
                  </td>
                  <td className="border p-3 text-center">
                    <button
                      onClick={() => toggleEdit(submission)}
                      className={`px-3 py-1 rounded-lg shadow-md transition-all ${
                        editableSubmission === student._id
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-600 hover:bg-gray-700 text-white"
                      }`}
                    >
                      {editableSubmission === student._id ? "Save" : "Edit"}
                    </button>
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

export default ViewSubmissions;
