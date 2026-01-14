import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Slider,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function SkillDialog({ open, onClose, data }) {
  const [form, setForm] = useState({ name: "", level: 50 });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add / Edit Skill</DialogTitle>

      <DialogContent>
        <TextField
          label="Skill Name"
          name="name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          fullWidth
          margin="dense"
        />

        <Slider
          value={form.level}
          onChange={(e, v) =>
            setForm({ ...form, level: v })
          }
          valueLabelDisplay="auto"
          min={0}
          max={100}
          sx={{ mt: 3 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
