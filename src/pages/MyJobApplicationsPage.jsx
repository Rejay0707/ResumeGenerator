import React from "react";
import { Box, Typography, Grid, CircularProgress, Paper } from "@mui/material";

import useApplications from "../containers/ApplicationContainer";
import ApplicationCard from "../components/ApplicationCard";

export default function MyApplicationsPage() {
  const { applications, loading } = useApplications();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        My Job Applications
      </Typography>

      {applications.length === 0 ? (
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No job applications yet
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            Browse jobs and apply to track your applications here.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={6}>
          {applications.map((app, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <ApplicationCard application={app} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
