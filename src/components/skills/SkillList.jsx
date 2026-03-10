// import React from "react";
// import { Box, Chip } from "@mui/material";

// export default function SkillList({ skills, onDelete }) {
//   return (
//     <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
//       {skills.map((item, index) => (
        
//         <Chip
//           key={`${item.name}-${index}`}
//           label={`${item.name} (${item.level})`}
//           onDelete={() => onDelete(item.id)}
//           color="primary"
//         />
//       ))}
//       {/* console.log(skills.item) */}
//     </Box>
//   );
// }

import React from "react";
import { Box, Chip } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; // AI
import SchoolIcon from "@mui/icons-material/School"; // Certificate
import PersonIcon from "@mui/icons-material/Person"; // Manual

// Helper function to get source colors and icons
const getSourceConfig = (source) => {
  switch (source) {
    case "ai":
      return { color: "#9c27b0", icon: <AutoAwesomeIcon sx={{ fontSize: 18 }} /> };
    case "certificate":
      return { color: "#2e7d32", icon: <SchoolIcon sx={{ fontSize: 18 }} /> };
    default:
      return { color: "#1976d2", icon: <PersonIcon sx={{ fontSize: 18 }} /> };
  }
};

export default function SkillList({ skills, onDelete, onEdit }) {
  return (
    <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
      {skills.map((item) => {
        const sourceConfig = getSourceConfig(item.source);
        
        return (
          <Chip
            key={item.id}
            icon={sourceConfig.icon}
            label={`${item.skill} (${item.level})`}
            onDelete={() => onDelete(item.id)}
            onClick={() => onEdit && onEdit(item)} // Click to edit
            variant="outlined"
            sx={{ 
              borderColor: sourceConfig.color,
              color: sourceConfig.color,
              '& .MuiChip-icon': { color: sourceConfig.color }
            }}
            title={`Source: ${item.source || 'manual'}`}
          />
        );
      })}
    </Box>
  );
}
