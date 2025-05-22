import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";


export const useTeacherStore = create((set, get) => ({
    students: [],
    assignments: [],
    tests:[],
    isCreattingAssignment: false,
    isCreattingTest: false,
    submissionOfPartocularAssignment: {},
    submissionOfParticularTest: {},
    particularStudentSubmission: {},
    particularStudent: {},

    createAssignment: async (data) => {
        set({ isCreattingAssignment: true });
        try {
            await axios.post("/teacher-dashboard/create-assignment", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            });           
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            console.log("Error in createAssignment", error);
        }finally{
            set({ isCreattingAssignment: false });
        }
    },

    createTest: async (data) => {
        set({ isCreattingTest: true });
        try{
            await axios.post("/teacher-dashboard/create-test", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Test created successfully!");
        }catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            console.log("Error in createTest", error);
        }
        finally{
            set({ isCreattingTest: false });
        }
    },

    getStudentandAssignment: async ({selectedClass}) => {
        try {
            const response = await axios.get("/teacher-dashboard/",{params:{selectedClass}});
            set({ students: response.data.students || [], assignments: response.data.assignments || [], tests: response.data.tests || [] });
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

    getSubmissionofParticularTest: async ({ testId }) => {
        try {
            const response = await axios.get("/teacher-dashboard/particulartest", { params: { testId } });
            set((state) => ({
                submissionOfParticularTest: {
                    ...state.submissionOfParticularTest,
                    [testId]: response.data.submitTest || [],
                },
            }));
        } catch (error) {
            console.log("Error in getSubmissionofParticularTest", error);
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

    getOptions: async ({ question }) => {
        try {
            const res = await axios.get("/chatbot/optiongenerator", { params: { question } });
            return res.data; 
        } catch (error) {
            console.log("Error in getOptions", error);
            toast.error(error.response?.data?.message || "Error generating options");
        }
    },

    getQuestion_options: async({topic,difficulty}) => {
        try {
            const res = await axios.get("/chatbot/question_option", { params: { topic, difficulty } });
            return res.data.data; 
        } catch (error) {
            console.log("Error in getQuestion_options", error);
            toast.error(error.response?.data?.message || "Error generating question");
        }
    }
}));