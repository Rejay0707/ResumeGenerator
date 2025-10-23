import React from "react";
import { Typography, Paper } from "@mui/material";

export default function ParentProfile() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>
      <Typography>Name: Rejay Sobis</Typography>
      <Typography>Email: rejay@example.com</Typography>
      <Typography>Phone: +91 98765 43210</Typography>
    </Paper>
  );
}
