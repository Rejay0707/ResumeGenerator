import React from "react";
import { Box, Chip, Typography, CircularProgress } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function AISkillSuggestions({ skills, loading, onSelect }) {
  if (loading) {
    return (
      <Box mt={4} display="flex" alignItems="center" gap={1}>
        <CircularProgress size={24} />
        <Typography variant="body2" color="text.secondary">
          Fetching AI suggestions...
        </Typography>
      </Box>
    );
  }

  if (skills.length === 0) {
    return null; // Don't show section if no suggestions
  }

  return (
    <Box mt={4}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <AutoAwesomeIcon sx={{ color: "#9c27b0", fontSize: 20 }} />
        <Typography variant="h6" color="black">
          AI Skill Suggestions
        </Typography>
        <Typography variant="caption" color="text.secondary">
          (Click to add)
        </Typography>
      </Box>

      <Box display="flex" gap={1} flexWrap="wrap">
        {skills.map((item, index) => (
          <Chip
            key={`${item.name}-${index}`}
            label={item.name}
            variant="outlined"
            onClick={() => onSelect(item)}
            icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
            sx={{
              borderColor: "#9c27b0",
              color: "#9c27b0",
              "& .MuiChip-icon": { color: "#9c27b0" },
              "&:hover": {
                bgcolor: "rgba(156, 39, 176, 0.1)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}