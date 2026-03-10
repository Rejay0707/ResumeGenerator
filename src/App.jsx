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
import AdminInternshipsContainer from "./containers/AdminInternshipsContainer";
import InternshipApprovalPage from "./pages/admin/InternshipApprovalPage";
import AdminModerationPage from "./pages/admin/AdminModerationPage";
import AdminInternshipManagement from "./pages/admin/AdminInternshipManagement";
import AdminCollegeSettings from "./pages/admin/AdminCollegeSettings";
import AdminResumeVerification from "./pages/admin/AdminResumeVerification";
import AdminJobModeration from "./pages/admin/AdminJobModeration";
import SkillAnalytics from "./pages/admin/SkillAnalytics";

import StudentDashboardLayout from "./layouts/StudentDashboardLayout";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import PersonalDetailsPage from "./pages/PersonalDetailsPage";
import EducationPage from "./pages/EducationPage";
import InternshipTrackerContainer from "./containers/InternshipTrackerContainer";
import ProjectsPage from "./pages/ProjectsPage";
import StudentCertificatesPage from "./pages/StudentCertificatesPage";
import SkillsPage from "./pages/SkillsPage";
import NotificationsPage from "./pages/NotificationsPage";
import InternshipListContainer from "./containers/InternshipListContainer";
import MyApplicationsContainer from "./containers/MyApplicationsContainer";
import JobsPage from "./pages/JobsPage";
import MyJobApplicationPage from "./pages/MyJobApplicationsPage";

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
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
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
  // if (role === "student") return <Navigate to="/home" replace />;
  if (role === "student") return <Navigate to="/student/dashboard" replace />;

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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* Root Route */}
        <Route path="/" element={<RoleRedirect />} />
        {/* ---------------- STUDENT DASHBOARD ---------------- */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboardPage />} />

          <Route path="personalDetails" element={<PersonalDetailsPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="internships" element={<InternshipTrackerContainer />} />
          {/* ✅ NEW INTERNSHIP PORTAL */}
          <Route
            path="browse-internships"
            element={<InternshipListContainer />}
          />
          <Route path="my-applications" element={<MyApplicationsContainer />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="job-applications" element={<MyJobApplicationPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="certificates" element={<StudentCertificatesPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="resume" element={<ResumeBuilderPage />} />
        </Route>
        {/* ---------------- STUDENT PAGES (OUTSIDE DASHBOARD) ---------------- */}
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
        {/* ---------------- ADMIN ROUTES ---------------- */}
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
          <Route path="internships" element={<AdminInternshipsContainer />} />
          <Route
            path="internshipApproval"
            element={<InternshipApprovalPage />}
          ></Route>
          <Route path="moderation" element={<AdminModerationPage />} />
          <Route
            path="internship-management"
            element={<AdminInternshipManagement />}
          />
          <Route path="/admin/skills-analytics" element={<SkillAnalytics />} />
          <Route path="job-approvals" element={<AdminJobModeration />} />
          <Route
            path="resume-verification"
            element={<AdminResumeVerification />}
          />
          <Route path="/admin/settings" element={<AdminCollegeSettings />} />
        </Route>
        {/* {Job seekers dashboard */}
        <Route
          path="/jobseeker/dashboard"
          element={
            <ProtectedRoute roles={["jobseeker"]}>
              <JobseekerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/generate-resume" element={<GenerateResume />} />
        {/* ---------------- TEACHER ROUTES ---------------- */}
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
        {/* ---------------- PARENT ROUTES ---------------- */}
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
