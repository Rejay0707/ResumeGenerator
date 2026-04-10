import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

export default function TeacherTopbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Box
      sx={{
        height: 64,
        background: "linear-gradient(to right, #4F46E5 0%, #6366F1 50%, #4F46E5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: 3,
        boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Typography sx={{ mr: 2 }}>{user.name || "Teacher"}</Typography>
      <Avatar>{user.name?.charAt(0).toUpperCase() || "T"}</Avatar>
    </Box>
  );
}
