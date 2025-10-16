import React from "react";
import { Outlet, } from "react-router-dom";
import { Box } from "@mui/material";
import TeacherSidebar from "../components/TeacherSidebar";
import TeacherTopbar from "../components/TeacherTopbar";

export default function TeacherDashboardContainer() {

return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <TeacherSidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TeacherTopbar />
        <Box sx={{ flex: 1, p: 3, backgroundColor: "#f7f7f7" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
