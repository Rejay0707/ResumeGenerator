import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";

const TeacherProfile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Typography>No teacher logged in.</Typography>;
  }

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          👩‍🏫 Teacher Profile
        </Typography>

        <Typography><strong>Name:</strong> {user.name}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>ID:</strong> {user.id}</Typography>
        {user.class_sec && (
          <Typography><strong>Class:</strong> {user.class_sec}</Typography>
        )}
        {user.subject && (
          <Typography><strong>Subject:</strong> {user.subject}</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default TeacherProfile;
