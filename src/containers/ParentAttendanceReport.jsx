import React from "react";
import { Typography, Paper } from "@mui/material";

export default function ParentAttendanceReport() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Attendance Report
      </Typography>
      <Typography>Track your child's attendance record.</Typography>
    </Paper>
  );
}
