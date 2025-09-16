// import React from "react";
// import { Box, Typography, Paper, Button } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import SkillTag from "../components/SkillTag";

// function PreviewPage() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Data passed from form page
//   const { resumeText, skills } = location.state || {};

//   if (!resumeText) {
//     return (
//       <Box textAlign="center" mt={5}>
//         <Typography variant="h6">No resume to display.</Typography>
//         <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
//           Go Back
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",       // vertical center
//         justifyContent: "center",   // horizontal center
//         minHeight: "100vh",         // full viewport height
//         width: "100vw",             // full viewport width
//         backgroundColor: "#5d6981ff",
//         px: 0,
//         overflowX: "hidden"
//       }}
//     >
//       <Paper
//         sx={{
//           p: 4,
//           maxWidth: 800,
//           width: "100%",
//           margin: "auto",           // center horizontally inside flex container
//           boxSizing: "border-box",  // ensure padding doesn't break width
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Generated Resume
//         </Typography>

//         <Typography
//           component="pre"
//           sx={{
//             whiteSpace: "pre-wrap",
//             fontFamily: "Roboto, sans-serif",
//             mb: 3,
//           }}
//         >
//           {resumeText}
//         </Typography>

//         <Typography variant="h6" gutterBottom>
//           Extracted Skills
//         </Typography>
//         <SkillTag skills={skills} />

//         <Button
//           variant="contained"
//           sx={{ mt: 4 }}
//           onClick={() => navigate(-1)}
//         >
//           Back to Form
//         </Button>
//       </Paper>
//     </Box>
//   );
// }

// export default PreviewPage;

import React from "react";
import { Box, Paper, Typography, Button, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SkillTag from "../components/SkillTag";

function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { resumeText, skills } = location.state || {};

  if (!resumeText) {
    return (
      <Box textAlign="center"  mt={5}>
        <Typography variant="h6">No resume to display.</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  // Parse resumeText to extract sections (simple parsing based on your mock data format)
  // This is a basic example; you can improve parsing logic as needed.
  const parseResume = (text) => {
    const lines = text.split("\n").map((line) => line.trim());
    const sections = {
      name: "",
      education: "",
      projects: [],
      internships: [],
      skills: [],
    };

    let currentSection = null;

    lines.forEach((line) => {
      if (line.startsWith("John Doe")) {
        sections.name = line;
      } else if (line.toLowerCase().startsWith("education")) {
        currentSection = "education";
      } else if (line.toLowerCase().startsWith("projects")) {
        currentSection = "projects";
      } else if (line.toLowerCase().startsWith("internships")) {
        currentSection = "internships";
      } else if (line.toLowerCase().startsWith("skills")) {
        currentSection = "skills";
      } else if (currentSection === "education" && line) {
        sections.education = line;
      } else if (currentSection === "projects" && line.startsWith("-")) {
        // Example: "- Portfolio Website: Built a personal portfolio website using React and Tailwind CSS"
        const projectLine = line.slice(1).trim();
        const [title, ...descParts] = projectLine.split(":");
        sections.projects.push({
          title: title.trim(),
          description: descParts.join(":").trim(),
        });
      } else if (currentSection === "internships" && line.startsWith("-")) {
        // Example: "- Tech Solutions: Frontend Developer Intern, Worked on UI development using React"
        const internshipLine = line.slice(1).trim();
        const [company, ...rest] = internshipLine.split(":");
        const [role, ...descParts] = rest.join(":").split(",");
        sections.internships.push({
          company: company.trim(),
          role: role ? role.trim() : "",
          description: descParts.join(",").trim(),
        });
      } else if (currentSection === "skills" && line) {
        // Skills line might be comma separated
        sections.skills = line.split(",").map((s) => s.trim());
      }
    });

    return sections;
  };

  const sections = parseResume(resumeText);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#5d6981ff",
        px: 2,
        py: 4,
        overflowX: "hidden",
        alignItems: "center",  // center all children horizontally
      }}
    >
      <Paper
        sx={{
          p: 5,
          maxWidth: 750,
          width: '100%',
          boxSizing: "border-box",
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
          // marginLeft:'auto',
          justifyContent:'center',
          alignContent:'center'
        }}
        elevation={6}
      >
        {/* Name */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {sections.name || "John Doe"}
        </Typography>

        {/* Education */}
        <Box mb={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Education
          </Typography>
          <Typography variant="body1" sx={{ ml: 2 }}>
            {sections.education || "B.Tech in Computer Science"}
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Projects */}
        <Box mb={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Projects
          </Typography>
          {sections.projects.length === 0 && (
            <Typography variant="body2" sx={{ ml: 2, fontStyle: "italic" }}>
              No projects listed.
            </Typography>
          )}
          {sections.projects.map((project, idx) => (
            <Box
              key={idx}
              sx={{
                borderLeft: "4px solid #1976d2",
                pl: 2,
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {project.title}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {project.description}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Internships */}
        <Box mb={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Internships
          </Typography>
          {sections.internships.length === 0 && (
            <Typography variant="body2" sx={{ ml: 2, fontStyle: "italic" }}>
              No internships listed.
            </Typography>
          )}
          {sections.internships.map((internship, idx) => (
            <Box
              key={idx}
              sx={{
                borderLeft: "4px solid #388e3c",
                pl: 2,
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {internship.company}
              </Typography>
              <Typography variant="subtitle1" fontStyle="italic" color="text.secondary">
                {internship.role}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {internship.description}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Skills */}
        <Box mb={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Skills
          </Typography>
          <SkillTag skills={skills.length ? skills : sections.skills} />
        </Box>

        {/* Back Button */}
        <Box textAlign="center" mt={5}>
          <Button variant="contained" onClick={() => navigate(-1)} size="large">
            Back to Form
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default PreviewPage;


