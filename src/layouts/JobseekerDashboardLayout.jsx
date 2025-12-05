import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import axios from "axios";

import PersonalInfoForm from "../components/PersonalInfoForm";
import EducationSection from "../components/EducationSection";
import ExperienceDetails from "../components/ExperienceDetails";
import ProjectDetails from "../components/ProjectDetails";
import SkillDetails from "../components/SkillDetails";

const JobSeekerDashboard = () => {
  // ========= Global Form States =========
  const [personal, setPersonal] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  // ========= Show Generate Resume Button state =========
  const [showGenerate, setShowGenerate] = useState(false);

  // ========= Logout ==========
  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  // ========= Helper: simple validation ==========
  const validateBeforeSend = () => {
    const missing = [];
    if (!personal?.name) missing.push("name");
    if (!personal?.email) missing.push("email");
    if (!personal?.phone) missing.push("phone");

    return missing;
  };

  // ========= SAVE API CALL =========
  const handleSave = async () => {
    try {
      const missing = validateBeforeSend();
      if (missing.length > 0) {
        alert(`Please fill required fields: ${missing.join(", ")}`);
        return;
      }

      const payload = {
        name: personal.name,
        phone: personal.phone,
        address: personal.address ?? null,
        email: personal.email,
        education: education ?? [],
        experience: experience ?? [],
        projects: projects ?? [],
        skills: skills ?? [],
      };

      console.log("Sending to API:", payload);

      const res = await axios.post(
        "https://www.scratchprod.in/resume-generator-backend/api/jobseekers",
        payload
      );

      if (res?.data?.status) {
        alert("Saved Successfully!");

        // ⭐ store backend resume id from response
        const resumeId = res?.data?.data?.id;
        if (resumeId) {
          localStorage.setItem("resumeId", resumeId);
          console.log("Resume ID saved:", resumeId);
        }

        setShowGenerate(true);
      } else {
        alert(res?.data?.message || "Save completed with warnings.");
      }
    } catch (error) {
      const backend = error?.response?.data;
      console.error("Save failed:", error);

      if (backend?.errors) {
        alert(
          "Validation error:\n" +
            Object.entries(backend.errors)
              .map(([k, v]) => `${k}: ${v.join(", ")}`)
              .join("\n")
        );
      } else if (backend?.message) {
        alert(backend.message);
      } else {
        alert("Save failed — check console for details.");
      }
    }
  };

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#9292e2ff" }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "160px", sm: "240px" },
          backgroundColor: "#2E3B55",
          color: "white",
          padding: { xs: "10px", sm: "20px" },
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" mb={4}>
            Job Portal
          </Typography>

          <Typography sx={{ mb: 2, cursor: "pointer" }}>Dashboard</Typography>
          <Typography sx={{ mb: 2, cursor: "pointer" }}>
            Personal Info
          </Typography>
          <Typography sx={{ mb: 2, cursor: "pointer" }}>Education</Typography>
          <Typography sx={{ mb: 2, cursor: "pointer" }}>Experience</Typography>
          <Typography sx={{ mb: 2, cursor: "pointer" }}>Projects</Typography>
          <Typography sx={{ mb: 2, cursor: "pointer" }}>Skills</Typography>

          {/* Navigate to resume page */}
          <Typography
            sx={{ mb: 2, cursor: "pointer" }}
            onClick={() => (window.location.href = "/generate-resume")}
          >
            Generate Resume
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{ textTransform: "none" }}
        >
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          ml: { xs: "160px", sm: "240px" },
          p: { xs: 2, sm: 3 },
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Jobseeker Dashboard
        </Typography>

        <Typography variant="subtitle1" mb={4}>
          Welcome! Please enter your details to generate your resume
        </Typography>

        {/* Pass setters to child forms */}
        <PersonalInfoForm setPersonal={setPersonal} />
        <EducationSection setEducation={setEducation} />
        <ExperienceDetails setExperience={setExperience} />
        <ProjectDetails setProjects={setProjects} />
        <SkillDetails setSkills={setSkills} />

        {/* SAVE BUTTON */}
        <Button
          variant="contained"
          sx={{ borderRadius: 2, mt: 3 }}
          onClick={handleSave}
        >
          Save & Continue
        </Button>

        {/* 🔥 Generate Resume — same style, with gap */}
        {showGenerate && (
          <Button
            variant="contained"
            sx={{ borderRadius: 2, mt: 3, ml: 2 }} // spacing + same color
            onClick={() => (window.location.href = "/generate-resume")}
          >
            Generate Resume
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default JobSeekerDashboard;
