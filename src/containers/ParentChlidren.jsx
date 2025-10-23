import React from "react";
import { Typography, Paper, Box } from "@mui/material";

export default function ParentChildren() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Children
      </Typography>
      <Box>
        <Typography>Name: Riya Sobis (Class 10A)</Typography>
        <Typography>Name: Arjun Sobis (Class 7B)</Typography>
      </Box>
    </Paper>
  );
}
