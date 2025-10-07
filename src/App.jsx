import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import PreviewPage from "./pages/PreviewPage";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Parents from "./pages/admin/Parents";
import Teachers from "./pages/admin/Teachers";
import Students from "./pages/admin/Students";
import Recruiters from "./pages/admin/Recruiters";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Check authentication
// const isAuthenticated = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return !!user; // returns true if a user exists
// };

// Role-based route guard
function ProtectedRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Normalize role to lowercase
  const userRole = user.role?.toLowerCase();

  if (roles && !roles.map((r) => r.toLowerCase()).includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Student + Admin can access HomePage */}
        <Route
          path="/"
          element={
            <ProtectedRoute roles={["student", "admin"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        <Route path="/preview" element={<PreviewPage />} />

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
          <Route path="recruiters" element={<Recruiters />} />
        </Route>

        {/* Fallback: redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
