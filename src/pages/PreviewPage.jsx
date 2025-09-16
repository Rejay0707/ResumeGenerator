import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SkillTag from "../components/SkillTag";

function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data passed from form page
  const { resumeText, skills } = location.state || {};

  if (!resumeText) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">No resume to display.</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",       // vertical center
        justifyContent: "center",   // horizontal center
        minHeight: "100vh",         // full viewport height
        width: "100vw",             // full viewport width
        backgroundColor: "#5d6981ff",
        px: 0,
        overflowX: "hidden"
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 800,
          width: "100%",
          margin: "auto",           // center horizontally inside flex container
          boxSizing: "border-box",  // ensure padding doesn't break width
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Generated Resume
        </Typography>

        <Typography
          component="pre"
          sx={{
            whiteSpace: "pre-wrap",
            fontFamily: "Roboto, sans-serif",
            mb: 3,
          }}
        >
          {resumeText}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Extracted Skills
        </Typography>
        <SkillTag skills={skills} />

        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => navigate(-1)}
        >
          Back to Form
        </Button>
      </Paper>
    </Box>
  );
}

export default PreviewPage;