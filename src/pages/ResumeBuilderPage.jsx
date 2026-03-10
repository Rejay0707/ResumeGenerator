
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import ResumeFormContainer from "../containers/ResumeFormContainer";

function ResumeBuilderPage() {
  return (
    // ROOT: owns the viewport
    <Box
      sx={{
        // height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#f4f6f8",
        overflow: "hidden", // CRITICAL
        px: 2,
        py: 4,
      }}
    >
      {/* SCROLL CONTAINER */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          overflowY: "auto", // CRITICAL
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            backgroundColor: "#ffffff",
          }}
        >
          <Box textAlign="left" mb={3}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#4A148C" }}
            >
              AI Resume Builder
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter your details and generate a smart resume with AI
            </Typography>
          </Box>

          <ResumeFormContainer />
        </Paper>
      </Box>
    </Box>
  );
}

export default ResumeBuilderPage;
