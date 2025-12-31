import React, { useState, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../features/authSlice";
import PersonalInfoForm from "../components/PersonalInfoForm";
import EducationSection from "../components/EducationSection";
import ExperienceDetails from "../components/ExperienceDetails";
import ProjectDetails from "../components/ProjectDetails";
import SkillDetails from "../components/SkillDetails";

const JobSeekerDashboard = () => {
  // ========= Global Form States =========
  const dispatch = useDispatch();
  const [personal, setPersonal] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  // const [showGenerate, setShowGenerate] = useState(false);

  // ========= SECTION REFS (ADDED) =========
  const personalRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);

  // ========= Logout ==========
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  // ========= Scroll Helper (ADDED) =========
  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ========= Validation ==========
  const validateBeforeSend = () => {
    const missing = [];
    if (!personal?.name) missing.push("name");
    if (!personal?.email) missing.push("email");
    if (!personal?.phone) missing.push("phone");
    return missing;
  };

  // ========= SAVE API =========
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

      const res = await axios.post(
        "https://www.scratchprod.in/resume-generator-backend/api/jobseekers",
        payload
      );

      if (res?.data?.status) {
        alert("Saved Successfully!");

        const resumeId = res?.data?.data?.id;
        if (resumeId) {
          localStorage.setItem("resumeId", resumeId);
        }

        window.location.href = "/generate-resume";
      }
    } catch (error) {
      alert("Save failed — check console");
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        maxHeight: "100vh",
        overflowY: "auto",
        backgroundColor: "#9292e2ff",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "160px", sm: "240px" },
          backgroundColor: "#2E3B55",
          color: "white",
          padding: { xs: "10px", sm: "20px" },

          height: "100dvh",
          maxHeight: "100vh",
          overflowY: "auto",

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

          <Typography
            sx={{ mb: 2, cursor: "pointer" }}
            onClick={() => scrollTo(personalRef)}
          >
            Personal Info
          </Typography>
          <Typography
            sx={{ mb: 2, cursor: "pointer" }}
            onClick={() => scrollTo(educationRef)}
          >
            Education
          </Typography>
          <Typography
            sx={{ mb: 2, cursor: "pointer" }}
            onClick={() => scrollTo(experienceRef)}
          >
            Experience
          </Typography>
          <Typography
            sx={{ mb: 2, cursor: "pointer" }}
            onClick={() => scrollTo(projectsRef)}
          >
            Projects
          </Typography>
          <Typography
            sx={{ mb: 2, cursor: "pointer" }}
            onClick={() => scrollTo(skillsRef)}
          >
            Skills
          </Typography>

          {/* <Typography
            sx={{ mb: 2, cursor: "pointer" }}
            onClick={() => (window.location.href = "/generate-resume")}
          >
            Generate Resume
          </Typography> */}
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

        <Box ref={personalRef}>
          <PersonalInfoForm setPersonal={setPersonal} />
        </Box>

        <Box ref={educationRef}>
          <EducationSection setEducation={setEducation} />
        </Box>

        <Box ref={experienceRef}>
          <ExperienceDetails setExperience={setExperience} />
        </Box>

        <Box ref={projectsRef}>
          <ProjectDetails setProjects={setProjects} />
        </Box>

        <Box ref={skillsRef}>
          <SkillDetails setSkills={setSkills} />
        </Box>

        <Button
          variant="contained"
          sx={{ borderRadius: 2, mt: 3 }}
          onClick={handleSave}
        >
          Save & Continue
        </Button>
      </Box>
    </Box>
  );
};

export default JobSeekerDashboard;
