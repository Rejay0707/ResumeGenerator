import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import PreviewPage from "./pages/PreviewPage";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Parents from "./pages/admin/Parents";
import Teachers from "./pages/admin/Teachers";
import Students from "./pages/admin/Students";
import DepartmentsPage from "./pages/admin/DepartmentsPage";
import SubjectsPage from "./pages/admin/SubjectsPage";
import TimetablePage from "./pages/admin/TimeTablePage";

import TeacherDashboardLayout from "./layouts/TeacherDashboardLayout";
import TeacherHome from "./containers/TeacherHome";
import TeacherAttendance from "./containers/TeacherAttendance";
import TeacherClasses from "./containers/TeacherClasses";
import TeacherSubjects from "./containers/TeacherSubjects";
import TeacherStudents from "./containers/TeacherStudents";
import TeacherProfile from "./containers/TeacherProfile";

import ParentDashboardContainer from "./layouts/ParentDashboardLayout";
import ParentHome from "./containers/ParentHome";
import ParentChildren from "./containers/ParentChlidren";
import ParentPerformance from "./containers/ParentPerformance";
import ParentAttendanceReport from "./containers/ParentAttendanceReport";

import ParentProfile from "./containers/ParentProfile";

import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import JobseekerDashboard from "./layouts/JobseekerDashboardLayout";
import GenerateResume from "./pages/GenerateResume";
import RoadmapPage from "./pages/RoadmapPage";

// --------------------------
// ✅ Role Redirect Component
// --------------------------
function RoleRedirect() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" replace />;

  const role = user.role?.toLowerCase();

  if (role === "superadmin")
    return (
      <Navigate
        to="https://www.scratchprod.in/resume-generator-backend/"
        replace
      />
    );
  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (role === "student") return <Navigate to="/home" replace />;
  if (role === "teacher")
    return <Navigate to="/teacher/dashboard/home" replace />;
  if (role === "parent")
    return <Navigate to="/parent/dashboard/home" replace />;

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
    <Router >
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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

        <Route path="/roadmap" element={<RoadmapPage />} />

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
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="subjects" element={<SubjectsPage />} />
          <Route path="timetable" element={<TimetablePage />} />
        </Route>

        {/* Job seekers dashboard */}
        <Route
          path="/jobseeker/dashboard"
          element={
            <ProtectedRoute roles={["jobseeker"]}>
              <JobseekerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/generate-resume" element={<GenerateResume />} />

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

        {/* Parent Dashboard routes */}
        <Route
          path="/parent/dashboard"
          element={
            <ProtectedRoute roles={["parent"]}>
              <ParentDashboardContainer />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<ParentHome />} />
          <Route path="children" element={<ParentChildren />} />
          <Route path="performance" element={<ParentPerformance />} />
          <Route
            path="attendance-report"
            element={<ParentAttendanceReport />}
          />
          <Route path="profile" element={<ParentProfile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
