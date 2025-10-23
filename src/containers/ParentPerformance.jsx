import React from "react";
import { Typography, Paper } from "@mui/material";

export default function ParentPerformance() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Performance Report
      </Typography>
      <Typography>View academic progress and results of your children.</Typography>
    </Paper>
  );
}
