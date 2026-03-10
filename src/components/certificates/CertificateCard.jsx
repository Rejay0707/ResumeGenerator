import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Paper,
  Typography,
  IconButton,
  Chip,
  Link,
} from "@mui/material";

import StatusChip from "../internship/StatusChip";

export default function CertificateCard({ certificate, onDelete, onEdit }) {

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: certificate.title,
    issuer: certificate.issuer,
    issue_date: certificate.issue_date,
    category: certificate.category,
  });

  const [file, setFile] = useState(null);

  // ✅ lock editing if approved
  const isApproved = certificate.approval_status === "approved";
  console.log(isApproved)
  console.log(certificate.approve_status);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>

      {/* ---------- EDIT DIALOG ---------- */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Edit Certificate</DialogTitle>

        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <TextField
            label="Issuer"
            fullWidth
            margin="dense"
            value={form.issuer}
            onChange={(e) => setForm({ ...form, issuer: e.target.value })}
          />

          <TextField
            label="Issue Date"
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={form.issue_date}
            onChange={(e) =>
              setForm({ ...form, issue_date: e.target.value })
            }
          />

          <TextField
            label="Category"
            fullWidth
            margin="dense"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <Button component="label" sx={{ mt: 2 }}>
            Replace File (optional)
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={() => {
              onEdit(certificate.id, form, file);
              setOpen(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* ---------- HEADER ---------- */}
      <Box display="flex" justifyContent="space-between" alignItems="center">

        <Typography fontWeight="bold">{certificate.title}</Typography>

        <Box display="flex" gap={1} alignItems="center">

          {/* Status */}
          <StatusChip status={certificate.approval_status} />

          {/* Edit */}
          <IconButton
            onClick={() => setOpen(true)}
            size="small"
            disabled={isApproved}
          >
            <EditIcon />
          </IconButton>

          {/* Delete */}
          <IconButton
            onClick={() => onDelete(certificate.id)}
            size="small"
            disabled={isApproved}
          >
            <DeleteIcon />
          </IconButton>

        </Box>

      </Box>

      {/* ---------- DETAILS ---------- */}

      <Typography variant="body2">
        Issuer: {certificate.issuer}
      </Typography>

      <Typography variant="body2">
        Category: {certificate.category}
      </Typography>

      <Typography variant="body2">
        Issue Date: {certificate.issue_date}
      </Typography>

      {/* Skills */}
      <Box mt={1} display="flex" gap={1} flexWrap="wrap">
        {certificate.skills?.map((skill, idx) => (
          <Chip key={idx} label={skill} size="small" />
        ))}
      </Box>

      {/* File */}
      <Box mt={1}>
        <Link
          href={certificate.file_url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ fontWeight: 500 }}
        >
          View Certificate
        </Link>
      </Box>

    </Paper>
  );
}