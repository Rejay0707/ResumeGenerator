
import React from "react";
import { Box, Paper } from "@mui/material";

function ResumePreview({ resumeText }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "#7c9945ff",
        mt: 0,          // <-- adds margin top and bottom (vertical spacing)
      }}
    >
      <Box component="pre" sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
        {resumeText}
      </Box>
    </Paper>
  );
}

export default ResumePreview;