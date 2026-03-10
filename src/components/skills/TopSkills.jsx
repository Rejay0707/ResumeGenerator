// components/skills/TopSkills.jsx
import React from "react";
import { Box, Typography, LinearProgress, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const getLevelValue = (level) => {
  switch (level) {
    case "Advanced": return 100;
    case "Intermediate": return 66;
    default: return 33;
  }
};

export default function TopSkills({ skills }) {
  // Get top 5 skills based on level
  const topSkills = [...skills]
    .sort((a, b) => getLevelValue(b.level) - getLevelValue(a.level))
    .slice(0, 5);

  if (skills.length === 0) {
    return null;
  }

  return (
    <Box mb={3} p={2} sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <StarIcon color="warning" />
        <Typography variant="h6" color="black">
          Top Skills
        </Typography>
      </Box>

      {topSkills.map((item, index) => (
        <Box key={item.id} mb={2}>
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography variant="body2" fontWeight="bold">
              {index + 1}. {item.skill}
            </Typography>
            <Chip 
              label={item.level} 
              size="small" 
              color={
                item.level === "Advanced" ? "success" : 
                item.level === "Intermediate" ? "warning" : "default"
              }
            />
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={getLevelValue(item.level)} 
            sx={{ height: 8, borderRadius: 4 }}
            color={
              item.level === "Advanced" ? "success" : 
              item.level === "Intermediate" ? "warning" : "primary"
            }
          />
        </Box>
      ))}
    </Box>
  );
}