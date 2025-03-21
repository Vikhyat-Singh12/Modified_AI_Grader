import {create} from 'zustand';
import axios from '../lib/axios'
import {toast} from 'react-hot-toast'

export const useAuthStore = create((set, get) => ({
  user: null,
  isSigningUp: false,

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const response = await axios.post("/auth/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set({ isSigningUp: false });
      return toast.success(response.data.message);
    } catch (error) {
      return toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  login: async ({email, password}) => {
    try {
      const response = await axios.post("/auth/login", {email, password});
      set({ user: response.data.user });
      return toast.success(response.data.message);
    } catch (error) {
      return toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  logout: async () => {
    try {
      const response = await axios.post("/auth/logout");
      set({ user: null });
      return toast.success(response.data.message);
    } catch (error) {
      return toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  updateProfile: async ({mobile, bio, dob, address}) => {
    try {
      const response = await axios.put("/auth/update-profile", {mobile, bio, dob, address});
      set({ user: response.data });
      return toast.success("Profile updated successfully");
    } catch (error) {
      return toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  checkAuth: async () => {
    try {
        const response = await axios.get("/auth/me");
        set({ user: response.data });
        
    } catch (error) {
      // return toast.error(error.response?.data?.message || "An error occurred");
    }
  }
}));