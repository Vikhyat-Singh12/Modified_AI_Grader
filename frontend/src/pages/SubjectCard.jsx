import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubjectCard = ({ submission, assignment,id }) => {
    const navigate = useNavigate();
    return (
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4">
        <div
          className="relative h-[380px] w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between 
                           border border-gray-200 transition-all transform hover:scale-105 hover:shadow-2xl hover:brightness-110 duration-300"
        >
          {/* Title */}
          <h3
            className="text-xl font-extrabold text-transparent bg-clip-text 
               bg-gradient-to-r from-[#6A0DAD] to-[#41C9E2] 
               drop-shadow-md tracking-wide uppercase"
          >
            {assignment.title}
          </h3>

          {/* Marks */}
          <p className="text-gray-700">
            <strong>Total Marks:</strong> {assignment.totalMarks}
          </p>
          <p className="text-green-600 font-semibold">
            <strong>Marks Obtained:</strong> {submission.aiMarks}
          </p>

          {/* Buttons */}
          <div className="flex flex-row gap-3 mt-3">
            {/* Assignment Button */}
            <div className="relative group">
              <a
                href={assignment.assignmentFile}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-[#eda909] 
            text-white rounded-lg shadow-lg hover:bg-[#D4A017] 
            hover:scale-110 transition-all duration-300"
              >
                <span className="text-2xl">📄</span>
              </a>

              {/* Tooltip */}
              <div
                className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
        bg-black text-white text-xs font-semibold px-3 py-1 rounded-md opacity-0 
        group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              >
                Assignment
              </div>
            </div>

            {/* Submission Button */}
            <div className="relative group">
              <a
                href={submission.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center 
           bg-[#eda909] text-white rounded-lg shadow-lg 
           hover:bg-[#D4A017] hover:scale-110 transition-all duration-300"
              >
                <span className="text-2xl">📝</span>
              </a>

              {/* Tooltip */}
              <div
                className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
        bg-black text-white text-xs font-semibold px-3 py-1 rounded-md opacity-0 
        group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              >
                Submission
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="mt-3">
            <p className="text-gray-800 font-medium">
              🏷 Feedback: {submission.aiShortFeedback}
            </p>

            {/* View Full Feedback Button */}
            <div
              onClick={() => navigate(`/subjects/${id}/${submission._id}`)}
              className="mt-2 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white px-3 py-2 rounded-lg shadow-md hover:from-[#4F46E5] hover:to-[#2563EB] transition-all duration-300 inline-block text-center w-auto hover:cursor-pointer hover:scale-110"
            >
              Full Feedback
            </div>
          </div>
        </div>
      </div>
    );
};

export default SubjectCard;