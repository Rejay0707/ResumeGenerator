import React from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import useJobs from "../containers/JobContainer";
import JobCard from "../components/JobCard";

export default function JobsPage() {
  const { jobs, loading, handleApply, applyingJobId, appliedJobs } = useJobs();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Available Jobs
      </Typography>

      <Grid container spacing={6}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <JobCard
              job={job}
              onApply={handleApply}
              applyingJobId={applyingJobId}
              appliedJobs={appliedJobs}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}