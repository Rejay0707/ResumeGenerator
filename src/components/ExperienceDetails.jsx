import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, TextField, Button } from "@mui/material";

const ExperienceDetails = ({ setExperience }) => {
  const [experienceEntries, setLocalExperience] = useState([
    { company: "", role: "", duration: "", description: "" },
  ]);

  useEffect(() => {
    setExperience(experienceEntries);
  }, [experienceEntries, setExperience]);

  const addExperience = () => {
    setLocalExperience([
      ...experienceEntries,
      { company: "", role: "", duration: "", description: "" },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...experienceEntries];
    updated[index][field] = value;
    setLocalExperience(updated);
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Experience Details
        </Typography>

        {experienceEntries.map((exp, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={exp.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                sx={{
                  background: "white",
                  borderRadius: "8px",
                  "& .MuiInputBase-root": { minHeight: "45px" },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title / Role"
                value={exp.role}
                onChange={(e) => handleChange(index, "role", e.target.value)}
                sx={{
                  background: "white",
                  borderRadius: "8px",
                  "& .MuiInputBase-root": { minHeight: "45px" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Experience Duration (e.g., 2021 - 2023)"
                value={exp.duration}
                onChange={(e) => handleChange(index, "duration", e.target.value)}
                sx={{
                  background: "white",
                  borderRadius: "8px",
                  "& .MuiInputBase-root": { minHeight: "45px" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Work Description"
                value={exp.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                sx={{
                  background: "white",
                  borderRadius: "8px",
                }}
              />
            </Grid>
          </Grid>
        ))}

        <Button
          variant="outlined"
          onClick={addExperience}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          + Add Another Experience
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExperienceDetails;
