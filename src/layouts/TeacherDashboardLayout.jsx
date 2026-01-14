import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import TeacherSidebar from "../components/TeacherSidebar";
import TeacherTopbar from "../components/TeacherTopbar";

export default function TeacherDashboardContainer() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f7f7f7", // Prevents black empty space
      }}
    >
      {/* Sidebar — now fixed, so no need to include in flex flow */}
      <TeacherSidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <Box sx={{ position: "sticky", top: 0, zIndex: 1100 }}>
          <TeacherTopbar />
        </Box>

        {/* Spacer equal to header height */}
        <Box sx={{ height: 64 }} />

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
