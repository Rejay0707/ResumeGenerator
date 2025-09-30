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


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import useAuth from "./containers/AuthContainer"; // New: Redux auth hook (adjust path if needed)
// import HomePage from "./pages/HomePage";
// import ResumeBuilderPage from "./pages/ResumeBuilderPage";
// import PreviewPage from "./pages/PreviewPage";

// import DashboardLayout from "./layouts/DashboardLayout";
// import Dashboard from "./pages/admin/Dashboard";
// import Parents from "./pages/admin/Parents";
// import Teachers from "./pages/admin/Teachers";
// import Students from "./pages/admin/Students";
// import Recruiters from "./pages/admin/Recruiters";
// import LoginPage from "./pages/LoginPage"; // Your login page

// // Updated ProtectedRoute: Uses Redux user state (real-time auth check)
// function ProtectedRoute({ children }) {
//   const { user } = useAuth(); // Hook: Gets current user from Redux (available via Provider in main.jsx)

//   // Check if authenticated as admin (extend for other roles if needed)
//   if (!user || user.role !== "admin") {
//     return <Navigate to="/login" replace />; // Redirect to login if not admin
//   }
//   return children; // Render child routes if authenticated
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes (unchanged: No auth required) */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/resume-builder" element={<ResumeBuilderPage />} />
//         <Route path="/preview" element={<PreviewPage />} />
//         <Route path="/login" element={<LoginPage />} />

//         {/* Admin Panel Routes (Protected with Redux auth) */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Dashboard />} /> {/* /admin → Dashboard */}
//           <Route path="dashboard" element={<Dashboard />} /> {/* /admin/dashboard */}
//           <Route path="parents" element={<Parents />} />
//           <Route path="teachers" element={<Teachers />} />
//           <Route path="students" element={<Students />} />
//           <Route path="recruiters" element={<Recruiters />} />
//         </Route>

//         {/* Redirect unknown routes to home (unchanged) */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;