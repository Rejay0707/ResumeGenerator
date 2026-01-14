import { Box, Typography } from "@mui/material";

export default function StudentDashboardHome() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={2} color="black">
        Welcome back 👋
      </Typography>

      <Typography color="text.secondary">
        Track your internships, certificates, skills, and build your resume.
      </Typography>
    </Box>
  );
}
