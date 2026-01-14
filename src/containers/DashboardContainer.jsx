import { Box, Typography, Grid } from "@mui/material";
import { useState } from "react";
import StatsGrid from "../components/dashboard/StatsGrid";
import RecentActivity from "../components/dashboard/RecentActivity";

const dashboardMock = {
  stats: {
    resumes: 3,
    internships: 2,
    certificates: 4,
    skills: 12,
  },
  activity: [
    { id: 1, text: "Resume downloaded", date: "Today" },
    { id: 2, text: "Roadmap generated", date: "Yesterday" },
    { id: 3, text: "Internship completed", date: "2 days ago" },
    { id: 4, text: "Certificate added", date: "3 days ago" },
  ],
};

export default function DashboardContainer() {
  const [data] = useState(dashboardMock);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Student Dashboard
      </Typography>

      <StatsGrid stats={data.stats} />

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={6}>
          <RecentActivity activity={data.activity} />
        </Grid>
      </Grid>
    </Box>
  );
}
