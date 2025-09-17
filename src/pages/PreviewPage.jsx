

import React, { useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SkillTag from "../components/SkillTag";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import BuildIcon from "@mui/icons-material/Build";
import DownloadIcon from "@mui/icons-material/Download"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { resumeText, skills } = location.state || {};

  const [loading, setLoading] = useState(false);
  const resumeRef = useRef(null);

  if (!resumeText) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">No resume to display.</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

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
        const projectLine = line.slice(1).trim();
        const [title, ...descParts] = projectLine.split(":");
        sections.projects.push({
          title: title.trim(),
          description: descParts.join(":").trim(),
        });
      } else if (currentSection === "internships" && line.startsWith("-")) {
        const internshipLine = line.slice(1).trim();
        const [company, ...rest] = internshipLine.split(":");
        const [role, ...descParts] = rest.join(":").split(",");
        sections.internships.push({
          company: company.trim(),
          role: role ? role.trim() : "",
          description: descParts.join(",").trim(),
        });
      } else if (currentSection === "skills" && line) {
        sections.skills = line.split(",").map((s) => s.trim());
      }
    });

    return sections;
  };

  const sections = parseResume(resumeText);

const handleDownload = async () => {
  if (!resumeRef.current) return;

  setLoading(true);
  try {
    const element = resumeRef.current;

    // Capture resume as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#465666ff",
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");

    // Canvas dimensions
    const imgWidth = 595.28; // A4 width in pt
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF with custom height (same as content)
    const pdf = new jsPDF("p", "pt", [imgWidth, imgHeight]);

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    pdf.save("resume.pdf");
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    alert("Failed to download resume. Please try again.");
  } finally {
    setLoading(false);
  }
};




  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        maxWidth: "100%",
        backgroundColor: "#edeff3ff",
        boxSizing: "border-box",
        px: { xs: 1, sm: 4 },
        overflowX: "hidden",
        flexDirection: "column",
        py: 4,
      }}
    >
      {/* Back to Form button at top right */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: { xs: 8, sm: 16 }, // move arrow a bit more right on xs screens
          zIndex: 10,
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => navigate(-1)}
        aria-label="Back to form"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate(-1);
          }
        }}
      >
        <Typography
          variant="h4"
          component="span"
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
          ←
        </Typography>
      </Box>
      <Paper
        ref={resumeRef}
        sx={{
          p: { xs: 3, sm: 5 },
          maxWidth: { xs: "100%", sm: 750 },
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "#465666ff",
          borderRadius: 3,
          boxShadow: 3,
          overflowX: "hidden",
          color: "white",
          userSelect: "text",
          marginTop:'40px',
          pl: { xs: 6, sm: 5 },
        }}
        elevation={6}
      >
        {/* Download button at top right */}
  <Button
    variant="contained"
    color="primary"
    onClick={handleDownload}
    disabled={loading}
    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
    sx={{
      position: "absolute",
      top: { xs: 12, sm: 16 },
      right: { xs: 12, sm: 16 },
      zIndex: 10,
      fontWeight: "bold",
      textTransform: "none",
      fontSize: { xs: "0.8rem", sm: "1rem" },
      padding: { xs: "6px 12px", sm: "8px 16px" },
      minWidth: "auto",
      whiteSpace: "nowrap",
    }}
  >
    {loading ? "Generating..." : "Download PDF"}
  </Button>
        {/* Name */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {sections.name || "John Doe"}
        </Typography>

        {/* Education */}
        <Box mb={4}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <SchoolIcon sx={{ mr: 1, color: "#1976d2" }} />
            <Typography variant="h5" fontWeight="bold">
              Education
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ ml: 4 }}>
            {sections.education || "B.Tech in Computer Science"}
          </Typography>
        </Box>

        <Divider sx={{ mb: 4, borderColor: "rgba(255,255,255,0.3)" }} />

        {/* Projects */}
        <Box mb={4}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <FolderOpenIcon sx={{ mr: 1, color: "#1976d2" }} />
            <Typography variant="h5" fontWeight="bold">
              Projects
            </Typography>
          </Box>
          {sections.projects.length === 0 && (
            <Typography variant="body2" sx={{ ml: 4, fontStyle: "italic" }}>
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
                ml: 4,
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

        <Divider sx={{ mb: 4, borderColor: "rgba(255,255,255,0.3)" }} />

        {/* Internships */}
        <Box mb={4}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <WorkIcon sx={{ mr: 1, color: "#388e3c" }} />
            <Typography variant="h5" fontWeight="bold">
              Internships
            </Typography>
          </Box>
          {sections.internships.length === 0 && (
            <Typography variant="body2" sx={{ ml: 4, fontStyle: "italic" }}>
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
                ml: 4,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {internship.company}
              </Typography>
              <Typography
                variant="subtitle1"
                fontStyle="italic"
                color="text.secondary"
              >
                {internship.role}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {internship.description}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 4, borderColor: "rgba(255,255,255,0.3)" }} />

        {/* Skills */}
        <Box mb={4}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <BuildIcon sx={{ mr: 1, color: "#6a1b9a" }} />
            <Typography variant="h5" fontWeight="bold">
              Skills
            </Typography>
          </Box>
          <Box sx={{ ml: 4 }}>
            <SkillTag skills={skills.length ? skills : sections.skills} />
          </Box>
        </Box>
      </Paper>

      {/* Buttons */}
      {/* <Box
        textAlign="center"
        mt={4}
        display="flex"
        gap={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        <Button
          variant="outlined"
          onClick={handleDownload}
          size="large"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? "Generating PDF..." : "Download Resume"}
        </Button>
      </Box> */}
    </Box>
  );
}

export default PreviewPage;
