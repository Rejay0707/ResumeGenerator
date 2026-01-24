import { Box, TextField, Button } from "@mui/material";

export default function PersonalDetailsForm({ form, onChange, onSubmit }) {
  return (
    <Box component="form" display="flex" flexDirection="column" gap={2}>
      <TextField label="Full Name" name="full_name" value={form.full_name} onChange={onChange} fullWidth />
      <TextField label="Email" name="email" value={form.email} onChange={onChange} fullWidth />
      <TextField label="Phone" name="phone" value={form.phone} onChange={onChange} fullWidth />
      <TextField label="GitHub URL" name="github_url" value={form.github_url} onChange={onChange} fullWidth />
      <TextField label="LinkedIn URL" name="linkedin_url" value={form.linkedin_url} onChange={onChange} fullWidth />

      <Button variant="contained" onClick={onSubmit}>
        Save Personal Details
      </Button>
    </Box>
  );
}
