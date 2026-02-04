import { Box, Chip, Typography, LinearProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function SectionStatus({
  title,
  completedCount,
  totalCount,
}) {
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const isCompleted = percentage === 100;
  const color = isCompleted ? "success.main" : "warning.main";

  return (
    <Box
      mb={1.5}
      p={1.5}
      borderRadius={1}
      sx={{
        backgroundColor: isCompleted ? "#e8f5e9" : "#fff8e1",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          {isCompleted ? (
            <CheckCircleIcon sx={{ color }} fontSize="small" />
          ) : (
            <ErrorOutlineIcon sx={{ color }} fontSize="small" />
          )}

          <Typography fontWeight={600} sx={{ color }}>
            {title}
          </Typography>
        </Box>

        <Chip
          label={`${percentage}%`}
          color={isCompleted ? "success" : "warning"}
          size="small"
        />
      </Box>

      {/* Progress */}
      <Box mt={1}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{ height: 6, borderRadius: 5 }}
        />
        <Typography variant="caption" color="text.secondary">
          {completedCount} completed · {totalCount - completedCount} remaining
        </Typography>
      </Box>
    </Box>
  );
}
