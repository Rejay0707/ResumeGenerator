import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, TextField, Button } from "@mui/material";

const ProjectDetails = ({ setProjects }) => {
  const [projectEntries, setProjectEntries] = useState([
    { title: "", techStack: "", link: "", description: "" },
  ]);

  // Update parent whenever projectEntries change
  useEffect(() => {
    setProjects(projectEntries);
  }, [projectEntries, setProjects]);

  const addProject = () => {
    setProjectEntries([
      ...projectEntries,
      { title: "", techStack: "", link: "", description: "" },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedProjects = [...projectEntries];
    updatedProjects[index][field] = value;
    setProjectEntries(updatedProjects);
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Projects
        </Typography>

        {projectEntries.map((project, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Title"
                value={project.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
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
                label="Tech Stack Used (React, Node, etc.)"
                value={project.techStack}
                onChange={(e) => handleChange(index, "techStack", e.target.value)}
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
                label="Project Link (GitHub / Deploy URL)"
                value={project.link}
                onChange={(e) => handleChange(index, "link", e.target.value)}
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
                label="Project Description"
                value={project.description}
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
          onClick={addProject}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          + Add Another Project
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectDetails;
