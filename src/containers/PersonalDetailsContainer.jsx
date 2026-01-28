// PersonalDetailsContainer.jsx
import { useEffect, useState } from "react";
import { getPersonalDetails, savePersonalDetails } from "../services/personalDetailsApi";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import { Box, Typography, Paper, Button } from "@mui/material"; // Added Button and other MUI imports

export default function PersonalDetailsContainer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    github_url: "",
    linkedin_url: "",
  });

  const [isEditing, setIsEditing] = useState(false); // New state to toggle between view and edit modes

  useEffect(() => {
    if (!userId) return;
    getPersonalDetails(userId).then((res) => {
      if (res.data) {
        setForm(res.data);
        setIsEditing(false); // If data exists, start in view mode
      } else {
        setIsEditing(true); // If no data, start in edit mode
      }
    });
  }, [userId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await savePersonalDetails({ ...form, user_id: userId });
    alert("Personal details saved");
    setIsEditing(false); // After saving, switch back to view mode
  };

  const handleEdit = () => {
    setIsEditing(true); // Edit: Keep existing data in form
  };

  const handleAdd = () => {
    // Add: Reset form to empty and switch to edit mode
    setForm({
      full_name: "",
      email: "",
      phone: "",
      github_url: "",
      linkedin_url: "",
    });
    setIsEditing(true);
  };

  if (isEditing) {
    // Render the form with Cancel and Save buttons (no Saved Details card)
    return (
      <Box>
        <PersonalDetailsForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit} // Passed but not used (button is commented in form)
        />
        <Box display="flex" gap={2} mt={2}>
          <Button variant="outlined" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    );
  }

  // Render card view with details and buttons
  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Saved Details
        </Typography>
        <Typography><strong>Full Name:</strong> {form.full_name || "Not provided"}</Typography>
        <Typography><strong>Email:</strong> {form.email || "Not provided"}</Typography>
        <Typography><strong>Phone:</strong> {form.phone || "Not provided"}</Typography>
        <Typography><strong>GitHub URL:</strong> {form.github_url || "Not provided"}</Typography>
        <Typography><strong>LinkedIn URL:</strong> {form.linkedin_url || "Not provided"}</Typography>
      </Paper>
      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" onClick={handleAdd}>
          Add
        </Button>
      </Box>
    </Box>
  );
}