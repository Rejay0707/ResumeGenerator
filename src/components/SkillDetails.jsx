import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const SkillDetails = ({ setSkills }) => {
  const [skills, setLocalSkills] = useState([{ name: "", level: "" }]);

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // Update parent whenever skills change
  useEffect(() => {
    setSkills(skills);
  }, [skills, setSkills]);

  const addSkill = () => {
    setLocalSkills([...skills, { name: "", level: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setLocalSkills(updatedSkills);
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Skills
        </Typography>

        {skills.map((skill, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Skill Name (React, Java, UI Design...)"
                value={skill.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                sx={{
                  background: "white",
                  borderRadius: "8px",
                  "& .MuiInputBase-root": { minHeight: "45px" },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Skill Level"
                value={skill.level}
                onChange={(e) => handleChange(index, "level", e.target.value)}
                sx={{
                  background: "white",
                  borderRadius: "8px",
                  "& .MuiInputBase-root": { minHeight: "45px" },
                }}
              >
                {levels.map((lvl) => (
                  <MenuItem key={lvl} value={lvl}>
                    {lvl}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        ))}

        <Button
          variant="outlined"
          sx={{ borderRadius: 2, textTransform: "none" }}
          onClick={addSkill}
        >
          + Add Another Skill
        </Button>
      </CardContent>
    </Card>
  );
};

export default SkillDetails;
