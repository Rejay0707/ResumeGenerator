import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, TextField, Button } from "@mui/material";

const EducationSection = ({ setEducation }) => {

  const [educationData, setEducationData] = useState({
    degree: "",
    cgpa: "",
    college: "",
    percentage: "",
  });

  const [schoolEntries, setSchoolEntries] = useState([
    { school: "", standard: "", percentage: "" },
  ]);

  // 🔹 Update Main Education
  const handleEduChange = (field, value) => {
    const updated = { ...educationData, [field]: value };
    setEducationData(updated);

    // send updated education to parent
    setEducation([
      {
        degree: updated.degree,
        cgpa: updated.cgpa,
        college: updated.college,
        percentage: updated.percentage,
      },
      ...schoolEntries, // also append school records
    ]);
  };

  // 🔹 Update school entry dynamically
  const handleSchoolChange = (index, field, value) => {
    let updated = [...schoolEntries];
    updated[index][field] = value;
    setSchoolEntries(updated);

    // push both main and school entries upward
    setEducation([
      {
        degree: educationData.degree,
        cgpa: educationData.cgpa,
        college: educationData.college,
        percentage: educationData.percentage,
      },
      ...updated,
    ]);
  };

  // 🔹 Add new school entry
  const addSchool = () => {
    setSchoolEntries([
      ...schoolEntries,
      { school: "", standard: "", percentage: "" },
    ]);
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Education Details
        </Typography>

        {/* Main Degree Section */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Degree / Qualification"
              value={educationData.degree}
              onChange={(e) => handleEduChange("degree", e.target.value)}
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
              label="CGPA"
              value={educationData.cgpa}
              onChange={(e) => handleEduChange("cgpa", e.target.value)}
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
              label="College / University"
              value={educationData.college}
              onChange={(e) => handleEduChange("college", e.target.value)}
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
              label="Total Percentage"
              value={educationData.percentage}
              onChange={(e) => handleEduChange("percentage", e.target.value)}
              sx={{
                background: "white",
                borderRadius: "8px",
                "& .MuiInputBase-root": { minHeight: "45px" },
              }}
            />
          </Grid>
        </Grid>

        {/* Divider */}
        <Typography fontWeight="bold" mt={3}>
          Additional Schooling
        </Typography>

        {/* Dynamic School Inputs */}
        {schoolEntries.map((entry, index) => (
          <Grid container spacing={2} mt={1} key={index}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="School Name"
                value={entry.school}
                onChange={(e) => handleSchoolChange(index, "school", e.target.value)}
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
                label="Standard (10th / 12th / Diploma)"
                value={entry.standard}
                onChange={(e) => handleSchoolChange(index, "standard", e.target.value)}
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
                label="Total Percentage"
                value={entry.percentage}
                onChange={(e) => handleSchoolChange(index, "percentage", e.target.value)}
                sx={{
                  background: "white",
                  borderRadius: "8px",
                  "& .MuiInputBase-root": { minHeight: "45px" },
                }}
              />
            </Grid>
          </Grid>
        ))}

        <Button
          variant="outlined"
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: "none",
          }}
          onClick={addSchool}
        >
          + Add Another School
        </Button>
      </CardContent>
    </Card>
  );
};

export default EducationSection;
