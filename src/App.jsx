// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import ResumeBuilderPage from "./pages/ResumeBuilderPage";
// import PreviewPage from "./pages/PreviewPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Landing Page */}
//         <Route path="/" element={<HomePage />} />

//         {/* Resume Builder Form */}
//         <Route path="/resume-builder" element={<ResumeBuilderPage />} />

//         {/* Resume Preview */}
//         <Route path="/preview" element={<PreviewPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

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

// Simple mock auth check (replace with your real auth logic)
const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin";
};

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Panel Routes (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
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

        {/* Redirect unknown routes to home or login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;