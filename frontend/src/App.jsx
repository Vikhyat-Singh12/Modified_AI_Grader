// helllo tum yaha pe run nahi kar paogi??   tumhe download karana padega

import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";

// Import layout components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

// Import pages
import Home from "./pages/Home";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FeedbackAnalytics from "./pages/FeedbackAnalytics";
import AdminPanel from "./pages/AdminPanel";
import HelpSupport from "./pages/HelpSupport";
import TeacherProfile from "./pages/TeacherProfile";
import StudentProfile from "./pages/StudentProfile";
import Subjects from "./pages/Subjects";
import SubjectDetails from "./pages/SubjectDetails";
import CreateAssignment from "./pages/CreateAssignment";
import ViewSubmissions from "./pages/ViewSubmission";
import ViewStudentProfile from "./pages/ViewStudentProfile";
import ViewFeedback from "./pages/ViewFeedback";
import StudentsPage from "./pages/StudentsPage";
import TeachersPage from "./pages/TeachersPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AdminProfile from "./pages/AdminProfile";
import NotFound from "./pages/NotFound";



function App() {
  const { user, checkAuth, updateProfile } = useAuthStore();
  const role = user?.role;

  useEffect(() => {
    checkAuth();
  }, [checkAuth,updateProfile]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-4 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route
            path="/admin-dashboard"
            element={
              role === "admin" ? <AdminPanel /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/students"
            element={
              role === "admin" ? <StudentsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/teachers"
            element={
              role === "admin" ? <TeachersPage /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={
              user ? (
                role === "admin" ? (
                  <AdminProfile />
                ) : role === "teacher" ? (
                  <TeacherProfile />
                ) : (
                  <StudentProfile />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/teacher-dashboard"
            element={
              role === "teacher" ? (
                <TeacherDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/teacher-dashboard/create-assignment"
            element={
              role === "teacher" ? (
                <CreateAssignment />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path={`/teacher-dashboard/:assignmentId`}
            element={
              role === "teacher" ? (
                <ViewSubmissions />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path={`/teacher-dashboard/student-profile/:studentId`}
            element={
              role === "teacher" ? (
                <ViewStudentProfile />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/student-dashboard"
            element={
              role === "student" ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/subjects"
            element={
              role === "student" ? <Subjects /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/subjects/:id"
            element={
              role === "student" ? <SubjectDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/subjects/:id/:submissionId"
            element={
              role === "student" ? <ViewFeedback /> : <Navigate to="/login" />
            }
          />

          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/feedback-analytics" element={<FeedbackAnalytics />} />

          {/* Page Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
