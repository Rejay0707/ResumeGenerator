import React from "react";
import { Chip, Box } from "@mui/material";

function SkillTag({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
      {skills.map((skill, index) => (
        <Chip
          key={index}
          label={skill}
          color="primary"
          variant="outlined"
        />
      ))}
    </Box>
  );
}

export default SkillTag;
