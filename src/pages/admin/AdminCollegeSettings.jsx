import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollegeSettings, updateCollegeSettings } from "../../features/adminSlice";

import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

export default function AdminCollegeSettings() {
  const dispatch = useDispatch();

  const collegeId = useSelector((state) => state.auth.collegeId);
  const settings = useSelector((state) => state.admin.settings);

  const [form, setForm] = useState({
    require_certificate_approval: false,
    require_project_approval: false,
    require_portfolio_approval: false,
    require_internship_approval: false,
  });

  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    if (collegeId) {
      dispatch(fetchCollegeSettings(collegeId));
    }
  }, [collegeId]);

  useEffect(() => {
    if (settings) {
      setForm(settings);
    }
  }, [settings]);

  const handleChange = (key) => (event) => {
    setForm({
      ...form,
      [key]: event.target.checked,
    });
  };

  const handleSave = async () => {
    await dispatch(
      updateCollegeSettings({
        college_id: collegeId,
        ...form,
      }),
    );

    setSnackbar(true);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        College Approval Settings
      </Typography>

      <Box mt={2}>
        <FormControlLabel
          control={
            <Switch
              checked={form.require_certificate_approval}
              onChange={handleChange("require_certificate_approval")}
            />
          }
          label="Certificate Approval Required"
        />

        <FormControlLabel
          control={
            <Switch
              checked={form.require_project_approval}
              onChange={handleChange("require_project_approval")}
            />
          }
          label="Project Approval Required"
        />

        <FormControlLabel
          control={
            <Switch
              checked={form.require_portfolio_approval}
              onChange={handleChange("require_portfolio_approval")}
            />
          }
          label="Portfolio Approval Required"
        />

        <FormControlLabel
          control={
            <Switch
              checked={form.require_internship_approval}
              onChange={handleChange("require_internship_approval")}
            />
          }
          label="Internship Approval Required"
        />
      </Box>

      <Box mt={3}>
        <Button variant="contained" onClick={handleSave}>
          Save Settings
        </Button>
      </Box>

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
      >
        <Alert severity="success" variant="filled">
          College settings updated successfully
        </Alert>
      </Snackbar>
    </Paper>
  );
}
