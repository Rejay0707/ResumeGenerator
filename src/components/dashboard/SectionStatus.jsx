// import { Box, Chip, Typography, LinearProgress } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// export default function SectionStatus({ title, completedCount, totalCount }) {
//   const percentage =
//     totalCount > 0
//       ? Math.min(Math.round((completedCount / totalCount) * 100), 100)
//       : 0;

//   const isCompleted = percentage === 100;
//   const color = isCompleted ? "success.main" : "warning.main";

//   const safeCompleted = Math.min(completedCount, totalCount);
//   const remaining = Math.max(totalCount - completedCount, 0);

//   return (
//     <Box
//       mb={1.5}
//       p={1.5}
//       borderRadius={1}
//       sx={{
//         backgroundColor: isCompleted ? "#e8f5e9" : "#fff8e1",
//       }}
//     >
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box display="flex" alignItems="center" gap={1}>
//           {isCompleted ? (
//             <CheckCircleIcon sx={{ color }} fontSize="small" />
//           ) : (
//             <ErrorOutlineIcon sx={{ color }} fontSize="small" />
//           )}

//           <Typography fontWeight={600} sx={{ color }}>
//             {title}
//           </Typography>
//         </Box>

//         <Chip
//           label={`${percentage}%`}
//           color={isCompleted ? "success" : "warning"}
//           size="small"
//         />
//       </Box>

//       {/* Progress */}
//       <Box mt={1}>
//         <LinearProgress
//           variant="determinate"
//           value={percentage}
//           sx={{ height: 6, borderRadius: 5 }}
//         />
//         <Typography variant="caption" color="text.secondary">
//           {safeCompleted} completed · {remaining} remaining
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

import { Box, Typography, LinearProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import FolderIcon from "@mui/icons-material/Folder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkIcon from "@mui/icons-material/Work";

const getIcon = (title) => {
  switch (title) {
    case "Personal Details":
      return <PersonIcon />;
    case "Education":
      return <SchoolIcon />;
    case "Skills":
      return <StarIcon />;
    case "Projects":
      return <FolderIcon />;
    case "Certificates":
      return <EmojiEventsIcon />;
    case "Internships":
      return <WorkIcon />;
    default:
      return <PersonIcon />;
  }
};

const getSubtitle = (title) => {
  switch (title) {
    case "Personal Details":
      return "Basic information and contact details";
    case "Education":
      return "Your academic background";
    case "Skills":
      return "Technical and soft skills";
    case "Projects":
      return "Your work and achievements";
    case "Certificates":
      return "Your certifications and courses";
    case "Internships":
      return "Your internship experience";
    default:
      return "";
  }
};

export default function SectionStatus({
  title,
  completedCount,
  totalCount,
}) {
  const percentage =
    totalCount > 0
      ? Math.min(Math.round((completedCount / totalCount) * 100), 100)
      : 0;

  const isCompleted = percentage === 100;

  return (
    <Box
      mb={2}
      p={2}
      borderRadius={3}
      sx={{
        background: "#fff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        flexWrap="wrap" // 🔥 prevents breaking
      >
        {/* LEFT SIDE */}
        <Box display="flex" alignItems="center" gap={2} flex={1} minWidth={220}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#EEF2FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6366F1",
            }}
          >
            {getIcon(title)}
          </Box>

          <Box>
            <Typography fontWeight={600}>{title}</Typography>
            <Typography fontSize={12} color="text.secondary">
              {getSubtitle(title)}
            </Typography>
          </Box>
        </Box>

        {/* CENTER PROGRESS */}
        <Box flex={2} minWidth={200}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 8,
              borderRadius: 5,
              background: "#E5E7EB",
              "& .MuiLinearProgress-bar": {
                background: isCompleted ? "#22C55E" : "#6366F1",
              },
            }}
          />
        </Box>

        {/* RIGHT SIDE */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          flexShrink={0}
        >
          <Box
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: 12,
              fontWeight: 600,
              background: isCompleted ? "#DCFCE7" : "#FEF3C7",
              color: isCompleted ? "#16A34A" : "#D97706",
              whiteSpace: "nowrap", // 🔥 prevents breaking
            }}
          >
            {isCompleted
              ? "Completed"
              : `${completedCount}/${totalCount}`}
          </Box>

          {isCompleted ? (
            <CheckCircleIcon sx={{ color: "#22C55E" }} />
          ) : (
            <AccessTimeIcon sx={{ color: "#F59E0B" }} />
          )}
        </Box>
      </Box>
    </Box>
  );
}