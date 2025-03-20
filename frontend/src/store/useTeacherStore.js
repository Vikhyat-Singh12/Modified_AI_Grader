import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";


export const useTeacherStore = create((set, get) => ({
    students: [],
    assignments: [],
    submissionOfPartocularAssignment: {},
    particularStudentSubmission: {},
    particularStudent: {},

    createAssignment: async (data) => {
        try {
        await axios.post("/teacher-dashboard/create-assignment", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            });           
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            console.log("Error in createAssignment", error);
        }
    },

    getStudentandAssignment: async ({selectedClass}) => {
        try {
            const response = await axios.get("/teacher-dashboard/",{params:{selectedClass}});
            set({ students: response.data.students || [], assignments: response.data.assignments || [] });
        } catch (error) {
            console.log("Error in getStudentandAssignment", error);
        }
    },

    getSubmissionofParticularAssignment: async ({ assignmentId }) => {
        try {
            const response = await axios.get("/teacher-dashboard/particularassignment", { params: { assignmentId } });
            set((state) => ({
                submissionOfPartocularAssignment: {
                    ...state.submissionOfPartocularAssignment,
                    [assignmentId]: response.data.submitassignment || [],
                },
            }));
        } catch (error) {
            console.log("Error in getSubmissionofParticularAssignment", error);
        }
    },


    getParticularStudentSubmission: async ({studentId, studentClass}) => {
        try {
            const response = await axios.get("/teacher-dashboard/studentsassignment", { params: { studentId, studentClass } });
            set((state) => ({
                particularStudentSubmission: {
                    ...state.particularStudentSubmission,
                    [studentId]: response.data.submitassignment || [],
                },
                particularStudent: {
                    ...state.particularStudent,
                    [studentId]: response.data.student || [],
                },
            }))
            
        } catch (error) {
            console.log("Error in getParticularStudentSubmission", error);
        }
    },

    updateSubmission: async ({ aiMarks, aiShortFeedback, editSubmittedAssignmentId }) => {
    try {
        await axios.put("/teacher-dashboard/updateSubmission", null, {
        params: { aiMarks, aiShortFeedback, editSubmittedAssignmentId },
        });
        toast.success("Submission updated successfully!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Error updating submission");
        console.log("Error in updateSubmission", error);
    }
    },
}));