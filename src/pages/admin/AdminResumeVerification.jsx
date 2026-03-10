import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import ResumeDetailsDialog from "../../components/ResumeDetailsDialog";
import {
  getPendingResumes,
  verifyResume,
  rejectResume,
} from "../../services/resumeApi";

export default function AdminResumeVerification() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [open, setOpen] = useState(false);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const admin = JSON.parse(localStorage.getItem("user"));

  const fetchResumes = async () => {
    try {
      const data = await getPendingResumes();
      setResumes(data || []);
    } catch (error) {
      console.error("Failed to fetch resumes", error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleView = (resume) => {
    setSelectedResume(resume);
    setOpen(true);
  };

  const handleApprove = async (id) => {
    try {
      const res = await verifyResume(id, admin.id);

      setSnack({
        open: true,
        message: res.message || "Resume approved successfully",
        severity: "success",
      });

      fetchResumes();
      setOpen(false);
    } catch (error) {
      setSnack({
        open: true,
        message: "Failed to approve resume",
        severity: "error",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await rejectResume(id, admin.id, "Rejected by admin");

      setSnack({
        open: true,
        message: res.message || "Resume rejected successfully",
        severity: "success",
      });

      fetchResumes();
      setOpen(false);
    } catch (error) {
      setSnack({
        open: true,
        message: "Failed to reject resume",
        severity: "error",
      });
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        Resume Verification
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Resume ID</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>PDF Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {resumes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No pending resumes
                </TableCell>
              </TableRow>
            ) : (
              resumes.map((resume) => (
                <TableRow key={resume.id}>
                  <TableCell>{resume.id}</TableCell>
                  <TableCell>{resume.student_id || "N/A"}</TableCell>
                  <TableCell>
                    {resume.pdf_url ? "Available" : "No PDF"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleView(resume)}
                    >
                      View Resume
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      <ResumeDetailsDialog
        open={open}
        resume={selectedResume}
        onClose={() => setOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
}
