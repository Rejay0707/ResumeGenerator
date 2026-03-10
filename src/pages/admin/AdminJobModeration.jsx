import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  getPendingJobs,
  approveJob,
  rejectJob,
} from "../../services/adminJobApi";

export default function AdminJobModeration() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setSeverity(type);
    setOpenSnackbar(true);
  };

  const fetchJobs = async () => {
    try {
      const data = await getPendingJobs();
      setJobs(data || []);
    } catch (error) {
      showMessage("Failed to fetch pending jobs", "error");
      console.error(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveJob(id);
      showMessage("Job approved successfully");
      fetchJobs();
    } catch (error) {
      showMessage("Failed to approve job", "error");
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectJob(id);
      showMessage("Job rejected successfully");
      fetchJobs();
    } catch (error) {
      showMessage("Failed to reject job", "error");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Pending Jobs
      </Typography>

      {/* NO JOBS MESSAGE */}

      {jobs.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            No pending jobs for approval
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} key={job.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{job.title}</Typography>

                <Typography>Company: {job.company_name || "N/A"}</Typography>

                <Typography>Location: {job.location}</Typography>

                <Typography>Type: {job.job_type}</Typography>

                <Typography>Description: {job.description}</Typography>

                <Box mt={2} display="flex" gap={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApprove(job.id)}
                  >
                    Approve
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleReject(job.id)}
                  >
                    Reject
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* SNACKBAR MESSAGE */}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity={severity}
          onClose={() => setOpenSnackbar(false)}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
