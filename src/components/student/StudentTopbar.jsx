import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

export default function StudentTopbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Box
      sx={{
        height: 64,
        minHeight: 64, // ⭐ prevents shrinking
        flexShrink: 0, // ⭐ critical fix
        background: "linear-gradient(to right, #4F46E5, #6366F1, #4F46E5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: 3,
        color: "white",
        boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Typography sx={{ mr: 2, fontWeight: 500 }}>
        {user.name || "Student"}
      </Typography>

      <Avatar sx={{ bgcolor: "#312e81" }}>
        {user.name?.charAt(0).toUpperCase() || "S"}
      </Avatar>
    </Box>
  );
}
