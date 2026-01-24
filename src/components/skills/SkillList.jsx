import React from "react";
import { Box, Chip } from "@mui/material";

export default function SkillList({ skills, onDelete }) {
  return (
    <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
      {skills.map((item, index) => (
        
        <Chip
          key={`${item.name}-${index}`}
          label={`${item.name} (${item.level})`}
          onDelete={() => onDelete(item.id)}
          color="primary"
        />
      ))}
      console.log(skills.item)
    </Box>
  );
}
