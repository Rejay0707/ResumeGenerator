import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import ParentSidebar from "../components/ParentSidebar";
import ParentTopbar from "../components/ParentTopbar";

export default function ParentDashboardContainer() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <ParentSidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ParentTopbar />
        <Box sx={{ flex: 1, p: 3, backgroundColor: "#f7f7f7" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
