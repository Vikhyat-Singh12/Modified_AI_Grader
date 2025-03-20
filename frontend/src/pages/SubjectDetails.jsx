import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";
import SubjectCard from "./SubjectCard"; 

import MathBg from "../assets/bg/maths_bg.png";
import ScienceBg from "../assets/bg/science_bg.jpg";
import HistoryBg from "../assets/bg/history_bg.jpg";
import EnglishBg from "../assets/bg/english_bg.jpg";

function SubjectDetails() {
  const { id } = useParams();
  const { assignments, submittedAssignments, getAllAssgnmentAndSubmittedAssignment } = useStudentStore();
    
  useEffect(() => {
      getAllAssgnmentAndSubmittedAssignment({ subject: id });
  },[id]);

  const subjects = {
    Mathematics: { name: "Mathematics", image: MathBg },
    Science: { name: "Science", image: ScienceBg },
    History: { name: "History", image: HistoryBg },
    English: { name: "English", image: EnglishBg },
    Computer: { name: "Computer", image: EnglishBg },
    Geography: { name: "Geography", image: EnglishBg },
  };

  const subject = subjects[id];



  return (
    <div className="w-full min-h-screen relative">
      {subject && (
        <div className="absolute inset-0 -z-10 w-full h-full">
          {/* Background with Doodle Effect */}
          <div
            className="w-full min-h-full"
            style={{
              backgroundImage: `url(${subject.image})`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
              backgroundPosition: "top left",
            }}
          ></div>

          {/* Opacity Effect */}
          <div className="absolute inset-0 bg-white opacity-90"></div>
        </div>
      )}

      {/* Subject Header */}
      {subject  ? (
        <>
          <h2 className="relative w-full text-2xl sm:text-3xl md:text-4xl font-extrabold text-white bg-gradient-to-r from-[#2155CD] to-[#41C9E2] px-4 py-3 text-center shadow-md rounded-lg">
            {subject.name}
          </h2>

          {/* Assignment Cards Container */}
          <div className="relative flex flex-wrap justify-center gap-4 mt-6 px-4">
            {submittedAssignments?.length === 0 && (
              <p className="text-center text-red-600 font-semibold text-4xl mt-10">
                No assignments submitted yet.
              </p>
            )}
            {submittedAssignments?.map((submission) => {

              const assignment = assignments.find((a) => a._id === submission.assignmentId);
              return (
                <SubjectCard key={submission._id} submission={submission} assignment={assignment} id={id} />
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 font-semibold text-xl mt-10">
          Subject not found.
        </p>
      )}
    </div>
  );
}

export default SubjectDetails;