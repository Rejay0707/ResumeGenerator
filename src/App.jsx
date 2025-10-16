import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import PreviewPage from "./pages/PreviewPage";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Parents from "./pages/admin/Parents";
import Teachers from "./pages/admin/Teachers";
import Students from "./pages/admin/Students";

import TeacherDashboardLayout from "./layouts/TeacherDashboardLayout";
import TeacherHome from "./containers/TeacherHome";
import TeacherAttendance from "./containers/TeacherAttendance";
import TeacherClasses from "./containers/TeacherClasses";
import TeacherSubjects from "./containers/TeacherSubjects";
import TeacherStudents from "./containers/TeacherStudents";
import TeacherProfile from "./containers/TeacherProfile";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// --------------------------
// ✅ Role Redirect Component
// --------------------------
function RoleRedirect() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" replace />;

  const role = user.role?.toLowerCase();

  if (role === "superadmin") return <Navigate to="https://www.scratchprod.in/resume-generator-backend/" replace />;
  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (role === "student") return <Navigate to="/home" replace />;
  if (role === "teacher") return <Navigate to="/teacher/dashboard/home" replace />;
  if (role === "parent") return <Navigate to="/parent/dashboard" replace />;

  return <Navigate to="/login" replace />;
}

// --------------------------
// ✅ Protected Route Component
// --------------------------
function ProtectedRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toLowerCase();

  if (roles && !roles.map((r) => r.toLowerCase()).includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// --------------------------
// ✅ Main App Component
// --------------------------
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Root Route - auto redirect based on user role */}
        <Route path="/" element={<RoleRedirect />} />

        {/* Student accessible pages */}
        <Route
          path="/home"
          element={
            <ProtectedRoute roles={["student", "admin"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume-builder"
          element={
            <ProtectedRoute roles={["student", "admin"]}>
              <ResumeBuilderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview"
          element={
            <ProtectedRoute roles={["student", "admin"]}>
              <PreviewPage />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="parents" element={<Parents />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="students" element={<Students />} />
        </Route>

        {/* Teacher Dashboard routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <TeacherDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<TeacherHome />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="classes" element={<TeacherClasses />} />
          <Route path="subjects" element={<TeacherSubjects />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="profile" element={<TeacherProfile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

