import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

export default function EducationForm({
  open,
  onClose,
  form,
  onChange,
  onSave,
}) {

  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{form.id ? "Edit Education" : "Add Education"}</DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <TextField
          select
          label="Education Level"
          name="level"
          value={form.level}
          onChange={onChange}
          fullWidth
          margin="dense"
        >
          <MenuItem value="school">School</MenuItem>
          <MenuItem value="college">College</MenuItem>
        </TextField>

        <TextField
          label="Institution"
          name="institution"
          value={form.institution}
          onChange={onChange}
          fullWidth
          margin="dense"
        />
        {form.level === "school" && (
          <TextField
            label="Board"
            name="board"
            value={form.board}
            onChange={onChange}
            fullWidth
            margin="dense"
          />
        )}

        {form.level === "college" && (
          <>
            <TextField
              label="Degree"
              name="degree"
              value={form.degree}
              onChange={onChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Field of Study"
              name="field_of_study"
              value={form.field_of_study}
              onChange={onChange}
              fullWidth
              margin="dense"
            />
          </>
        )}

        <TextField
          label="Grade / Percentage"
          name="grade"
          value={form.grade}
          onChange={onChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Start Year"
          name="start_year"
          value={form.start_year}
          onChange={onChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="End Year"
          name="end_year"
          value={form.end_year}
          onChange={onChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
