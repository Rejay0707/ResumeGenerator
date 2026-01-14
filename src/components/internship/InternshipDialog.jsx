import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function InternshipDialog({
  open,
  onClose,
  data,
  readOnly,
  onSave,
}) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    internship_type: "",
    start_date: "",
    end_date: "",
    applied_date: "",
    status: "applied",
    description: "",
    mentor_feedback: "",
    student_learnings: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        company: data.company || "",
        role: data.role || "",
        internship_type: data.internship_type || "",
        start_date: data.start_date || "",
        end_date: data.end_date || "",
        applied_date: data.applied_date || "",
        status: data.status || "applied",
        description: data.description || "",
        mentor_feedback: data.mentor_feedback || "",
        student_learnings: data.student_learnings || "",
      });
    }
  }, [data]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    console.log("SAVE CLICKED, PAYLOAD:", form);
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {readOnly ? "View Internship" : "Add / Edit Internship"}
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Company"
          name="company"
          value={form.company}
          onChange={handleChange}
          fullWidth
          margin="dense"
          disabled={readOnly}
        />

        <TextField
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          fullWidth
          margin="dense"
          disabled={readOnly}
        />

        <TextField
          label="Internship Type"
          name="internship_type"
          value={form.internship_type}
          onChange={handleChange}
          fullWidth
          margin="dense"
          disabled={readOnly}
        />

        <TextField
          label="Start Date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          fullWidth
          margin="dense"
          disabled={readOnly}
        />

        <TextField
          label="End Date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          fullWidth
          margin="dense"
          disabled={readOnly}
        />

        

        <TextField
          label="Applied Date"
          name="applied_date"
          value={form.applied_date}
          onChange={handleChange}
          fullWidth
          margin="dense"
          disabled={readOnly}
        />

        <TextField
          label="Mentor Feedback"
          name="mentor_feedback"
          value={form.mentor_feedback}
          onChange={handleChange}
          fullWidth
          margin="dense"
          multiline
          rows={2}
          disabled={readOnly}
        />

        <TextField
          label="Student Learnings"
          name="student_learnings"
          value={form.student_learnings}
          onChange={handleChange}
          fullWidth
          margin="dense"
          multiline
          rows={2}
          disabled={readOnly}
        />

        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="dense"
          disabled={readOnly}
        />

        <TextField
          select
          name="status"
          label="Status"
          value={form.status}
          onChange={handleChange}
          fullWidth
          margin="dense"
          disabled={false}
        >
          <MenuItem value="ongoing">Ongoing</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {!readOnly && (
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
