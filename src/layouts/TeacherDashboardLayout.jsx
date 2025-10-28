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
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto", // Scroll only main content
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <TeacherTopbar />
        </Box>
        <Box sx={{ flex: 1, p: 3, backgroundColor: "#f7f7f7" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
