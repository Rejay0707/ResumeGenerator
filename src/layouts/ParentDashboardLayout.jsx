import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import ParentSidebar from "../components/ParentSidebar";
import ParentTopbar from "../components/ParentTopbar";

export default function ParentDashboardContainer() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", height: "auto" }}>
      {/* Sidebar */}
      <ParentSidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f7f7f7",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ position: "sticky", top: 0, zIndex: 1 }}>
          <ParentTopbar />
        </Box>
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Content grows naturally */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
