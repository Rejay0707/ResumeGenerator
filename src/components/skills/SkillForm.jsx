
import React from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";

export default function SkillForm({ formData, setFormData, onAdd }) {
  // Debugging: Log formData on every render to see if it's updating
  console.log("SkillForm rendering with formData:", formData);

  const handleSubmit = () => {
    // Safety check: Ensure formData and formData.name exist
    if (!formData || !formData.name) {
      console.error("formData is invalid or undefined:", formData);
      return;
    }

    const trimmedName = formData.name.trim();
    if (!trimmedName) return;

    onAdd({
      ...formData,
      name: trimmedName,
    });

    // Reset form after adding
    setFormData({ name: "", level: "Beginner" });
  };

  return (
    <Box display="flex" gap={2} mb={3}>
      <TextField
        label="Skill"
        value={formData?.name || ""}  // Safe access with fallback
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        fullWidth
      />
      <TextField
        select
        label="Level"
        value={formData?.level || "Beginner"}  // Safe access with fallback
        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
        sx={{ width: 160 }}
      >
        <MenuItem value="Beginner">Beginner</MenuItem>
        <MenuItem value="Intermediate">Intermediate</MenuItem>
        <MenuItem value="Advanced">Advanced</MenuItem>
      </TextField>

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!formData?.name?.trim()}  // Safe access
      >
        Add
      </Button>
    </Box>
  );
}
