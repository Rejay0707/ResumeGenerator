import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

export default function ResumeDetailsDialog({
  open,
  onClose,
  resume,
  onApprove,
  onReject,
}) {
  if (!resume) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Resume Preview</DialogTitle>

      <DialogContent dividers>
        <Typography mb={2}>
          Student ID: {resume.student_id || "N/A"}
        </Typography>

        {resume.pdf_url ? (
          <Box
            sx={{
              width: "100%",
              height: "600px",
              border: "1px solid #ccc",
            }}
          >
            <iframe
              src={resume.pdf_url}
              title="Resume PDF"
              width="100%"
              height="100%"
            />
          </Box>
        ) : (
          <Typography color="error">
            No PDF uploaded for this resume
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="success"
          onClick={() => onApprove(resume.id)}
        >
          Approve
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => onReject(resume.id)}
        >
          Reject
        </Button>

        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}