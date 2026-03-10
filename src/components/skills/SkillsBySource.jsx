// components/skills/SkillsBySource.jsx
import React from "react";
import { Box, Typography, Chip, Divider } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";

const sourceConfig = {
  manual: { label: "Manually Added", icon: <PersonIcon />, color: "#1976d2" },
  ai: { label: "AI Suggested", icon: <AutoAwesomeIcon />, color: "#9c27b0" },
  certificate: { label: "From Certificates", icon: <SchoolIcon />, color: "#2e7d32" },
};

export default function SkillsBySource({ skills }) {
  // Group skills by source
  const grouped = skills.reduce((acc, skill) => {
    const source = skill.source || "manual";
    if (!acc[source]) acc[source] = [];
    acc[source].push(skill);
    return acc;
  }, {});

  return (
    <Box mb={3}>
      <Typography variant="h6" mb={2} color="black">
        Skills by Source
      </Typography>

      {Object.entries(grouped).map(([source, sourceSkills]) => (
        <Box key={source} mb={2}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Box sx={{ color: sourceConfig[source]?.color }}>
              {sourceConfig[source]?.icon}
            </Box>
            <Typography variant="subtitle2" fontWeight="bold">
              {sourceConfig[source]?.label} ({sourceSkills.length})
            </Typography>
          </Box>
          
          <Box display="flex" gap={1} flexWrap="wrap">
            {sourceSkills.map((item) => (
              <Chip
                key={item.id}
                label={`${item.skill} (${item.level})`}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
          
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
}