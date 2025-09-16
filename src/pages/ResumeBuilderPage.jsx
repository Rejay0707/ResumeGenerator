import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import ResumeFormContainer from "../containers/ResumeFormContainer";

function ResumeBuilderPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#111213ff", // light blue background
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          width: "100%",
          maxWidth: "700px",
          margin: "auto",
          backgroundColor: "#ffffff", // white card
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
  );
}

export default ResumeBuilderPage;




