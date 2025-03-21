import {create} from 'zustand'
import axios from '../lib/axios'
import toast from 'react-hot-toast';


export const useStudentStore = create((set, get) => ({
    assignments: [],
    submittedAssignments:[],
    isSubmitting: false,
    assignedTeacher:[],

    submitAssignment: async (data) => {
       try {
         set({ isSubmitting: true });
         await axios.post("/student-dashboard/submit-assignment", data, {
           headers: {
             "Content-Type": "multipart/form-data",
           },
         });
         toast.success("Assignment submitted successfully and AI Graded Successfully");
         set({ isSubmitting: false });
       } catch (error) {
         toast.error(error.response?.data?.message || "An error in submitting Answer");
         console.log("Error in submitAssignment", error);
       }
    },


    getAllAssgnmentAndSubmittedAssignment: async ({subject}) => {
        try {
            const response = await axios.get("/student-dashboard/",{params:{subject}});
            set({ assignments: response.data.assignments || [], submittedAssignments: response.data.submittedAssignments || [] });
        } catch (error) {
            console.log("Error in getAllassgnmentandSubmittedAssignment", error);
        }
    },

    getAssignedTeacher : async ({subject}) => {
      try {
        const response = await axios.get("/student-dashboard/assignedTeacher",{params:{subject}});
        set({ assignedTeacher: response.data.assignedTeacher || [] });
        
      } catch (error) {
        console.log("Error in getAssignedTeacher", error);
      }
    }
}))