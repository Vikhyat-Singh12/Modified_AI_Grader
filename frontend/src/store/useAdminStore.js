import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAdminStore = create((set, get) => ({
  pendingUsers: [],
  teachers: [],
  students: [],

  getpendingUser: async () => {
    try {
      const response = await axios.get("/admin-dashboard/");
      set({ pendingUsers: response.data.users || [] });
    } catch (error) {
      console.log("Error in getpendingUser", error);
    }
  },

  getTeachers: async () => {
    try {
      const response = await axios.get("/admin-dashboard/teachers");
      set({ teachers: response.data.users || [] });
    } catch (error) {
      console.log("Error in getTeachers", error);
    }
  },

  getStudents: async () => {
    try {
      const response = await axios.get("/admin-dashboard/students");
      set({ students: response.data.users || [] });
    } catch (error) {
      console.log("Error in getStudents", error);
    }
  },

  verifyUser: async (userId, assignedClasses) => {
    try {
      await axios.put("/admin-dashboard/verify", { userId, assignedClasses });
    } catch (error) {
      console.log("Error in verifyUser", error);
      toast.error(error.response?.data?.message || "An error in verifyUser");
    }
  },

  rejectUser: async (userId) => {
    try {
      await axios.delete(`/admin-dashboard/delete/${userId}`);
      toast.success("User rejected successfully");
    } catch (error) {
      console.log("Error in rejectUser", error);
      toast.error(error.response?.data?.message || "An error in rejectUser");
    }
  },
}));
