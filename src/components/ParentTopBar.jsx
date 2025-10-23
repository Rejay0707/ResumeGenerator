import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

export default function ParentTopbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Box
      sx={{
        height: 64,
        bgcolor: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: 3,
        boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Typography sx={{ mr: 2 }}>{user.name || "Parent"}</Typography>
      <Avatar>{user.name?.charAt(0).toUpperCase() || "P"}</Avatar>
    </Box>
  );
}
