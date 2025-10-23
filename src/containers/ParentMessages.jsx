import React from "react";
import { Typography, Paper } from "@mui/material";

export default function ParentMessages() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Messages
      </Typography>
      <Typography>Communicate with teachers and the school administration.</Typography>
    </Paper>
  );
}
