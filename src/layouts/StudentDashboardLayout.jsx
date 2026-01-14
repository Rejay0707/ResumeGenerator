import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/student/StudentSidebar";

export default function StudentDashboardLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",        // 🔑 lock layout height
        overflow: "hidden",    // 🔑 prevent body scrolling
        backgroundColor: "#f7f7f7",
      }}
    >
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",      // 🔑 same height as viewport
          overflowY: "auto",    // ✅ ONLY this scrolls
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
