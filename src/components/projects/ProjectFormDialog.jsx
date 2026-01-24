import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";

const emptyForm = {
  title: "",
  description: "",
  technologies: "",
  role: "",
  start_date: "",
  end_date: "",
  outcomes: "",
  github_url: "",
};

export default function ProjectFormDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState(emptyForm);

  /* ---------- PREFILL / RESET ---------- */
  useEffect(() => {
    if (open && initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        role: initialData.role || "",
        start_date: initialData.start_date || "",
        end_date: initialData.end_date || "",
        outcomes: initialData.outcomes || "",
        github_url: initialData.github_url || "",
        technologies: initialData.technologies?.join(", ") || "",
      });
    }

    if (open && !initialData) {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  /* ---------- SUBMIT ---------- */
  const handleSubmit = () => {
    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      role: form.role.trim(),
      start_date: form.start_date,
      end_date: form.end_date,
      outcomes: form.outcomes.trim(),
      github_url: form.github_url.trim(),
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    setForm(emptyForm);
    onClose();
  };

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {initialData ? "Edit Project" : "Add Project"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            fullWidth
          />

          <TextField
            label="Role"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            fullWidth
          />

          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.start_date}
            onChange={(e) =>
              setForm({ ...form, start_date: e.target.value })
            }
            fullWidth
          />

          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.end_date}
            onChange={(e) =>
              setForm({ ...form, end_date: e.target.value })
            }
            fullWidth
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            fullWidth
          />

          <TextField
            label="Outcomes / Achievements"
            value={form.outcomes}
            onChange={(e) =>
              setForm({ ...form, outcomes: e.target.value })
            }
            fullWidth
          />

          <TextField
            label="Technologies (comma separated)"
            value={form.technologies}
            onChange={(e) =>
              setForm({ ...form, technologies: e.target.value })
            }
            fullWidth
          />

          <TextField
            label="GitHub URL"
            value={form.github_url}
            onChange={(e) =>
              setForm({ ...form, github_url: e.target.value })
            }
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
