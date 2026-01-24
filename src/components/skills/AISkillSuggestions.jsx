

import React from "react";
import { Box, Chip, Typography, CircularProgress } from "@mui/material";

export default function AISkillSuggestions({ skills, loading, onSelect }) {
  return (
    <Box mt={4}>
      <Typography variant="h6" mb={1} color="black">
        AI Skill Suggestions
      </Typography>

      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Box display="flex" gap={1} flexWrap="wrap">
          {skills.map((item, index) => (
            <Chip
              key={`${item.name}-${index}`}
              label={item.name}
              variant="outlined"
              onClick={() => onSelect(item)}  // Changed: Use onSelect to prefill form instead of directly adding
            />
          ))}
        </Box>
      )}
    </Box>
  );
}