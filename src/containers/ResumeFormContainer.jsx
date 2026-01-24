import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { getCompletedInternships } from "../services/internships.api";
import { getProjects, getProjectFiles } from "../services/projectApi";
import { getCertificates } from "../services/certificateApi";
import { getUserSkills } from "../services/skillApi";

function ResumeFormContainer() {
  const user = useSelector((state) => state.auth.user);
  // console.log(user.email)
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    github: "",
    linkedin: "",
    education: {
      level: "college", // school | college
      institution: "",
      board: "",
      degree: "",
      field_of_study: "",
      start_year: "",
      end_year: "",
    },

    projects: [
      {
        title: "",
        description: "",
        github_url: "",
        start_date: "",
        end_date: "",
        files: [], // uploaded files (read-only from backend)
      },
    ],

    internships: [
      {
        company: "",
        role: "",
        internship_type: "",
        start_date: "",
        end_date: "",
        description: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        issue_date: "",
        skills: "",
        category: "",
        file_url: "",
      },
    ],

    awards: [{ name: "", description: "" }],
    skills: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;

    getCompletedInternships(user.id).then((res) => {
      setFormData((prev) => ({
        ...prev,
        internships: res.data.map((i) => ({
          company: i.company || "",
          role: i.role || "",
          description: i.description || "",
          internship_type: i.internship_type || "",

          // ✅ convert to YYYY-MM-DD
          start_date:
            i.start_date?.length === 7
              ? `${i.start_date}-01`
              : i.start_date || "",

          end_date:
            i.end_date?.length === 7 ? `${i.end_date}-01` : i.end_date || "",
        })),
      }));
    });
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    getProjects(user.id).then(async (res) => {
      const projectsWithFiles = await Promise.all(
        res.data.map(async (project) => {
          const filesRes = await getProjectFiles(project.id);

          return {
            title: project.title || "",
            description: project.description || "",
            github_url: project.github_url || "",
            start_date: project.start_date || "",
            end_date: project.end_date || "",
            files: filesRes.data || [],
          };
        }),
      );

      setFormData((prev) => ({
        ...prev,
        projects: projectsWithFiles.length ? projectsWithFiles : prev.projects,
      }));
    });
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    getCertificates(user.id).then((res) => {
      setFormData((prev) => ({
        ...prev,
        certifications:
          res.data.length > 0
            ? res.data.map((cert) => ({
                name: cert.title || "",
                issuer: cert.issuer || "",
                date: cert.issue_date || "",
                skills: cert.skills?.join(", ") || "",
                category: cert.category || "",
                file_url: cert.file_url || "",
              }))
            : prev.certifications,
      }));
    });
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    getUserSkills(user.id)
      .then((res) => {
        const skillsString = res.data.map((skill) => skill.skill).join(", ");
        setFormData((prev) => ({
          ...prev,
          skills: skillsString,
        }));
      })
      .catch((error) => {
        console.error("Error fetching user skills:", error);
      });
  }, [user?.id]);

  // Handle input for simple fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProjectFileChange = (e, index) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        files,
      };
      return { ...prev, projects: updatedProjects };
    });
  };

  // Handle input for education object
  const handleEducationChange = (e) => {
    setFormData({
      ...formData,
      education: { ...formData.education, [e.target.name]: e.target.value },
    });
  };

  const handleEducationLevelChange = (e) => {
    const level = e.target.value;

    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        level,
        board: level === "school" ? prev.education.board : "",
        degree: level === "college" ? prev.education.degree : "",
        field_of_study:
          level === "college" ? prev.education.field_of_study : "",
      },
    }));
  };

  // Handle input for nested arrays (projects, internships, certifications, awards)
  const handleNestedChange = (e, index, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  // Handle adding new items to arrays
  const handleAdd = (type) => {
    let newItem;
    switch (type) {
      case "projects":
        newItem = {
          title: "",
          description: "",
          github_url: "",
          start_date: "",
          end_date: "",
          files: [],
        };
        break;

      case "internships":
        newItem = {
          company: "",
          role: "",
          internship_type: "",
          start_date: "",
          end_date: "",
          description: "",
        };
        break;
      case "certifications":
        newItem = {
          title: "",
          issuer: "",
          issue_date: "",
          skills: "",
          category: "",
        };
        break;
      case "awards":
        newItem = { name: "", description: "" };
        break;
      default:
        return;
    }
    setFormData({ ...formData, [type]: [...formData[type], newItem] });
  };

  // Handle submit (save to backend and navigate to preview)
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     try {
  //       const token = localStorage.getItem("token");
  //       console.log("Retrieved token:", token);

  //       if (!token) {
  //         alert("No token found. Please log in.");
  //         return;
  //       }

  //       // Optional: Basic client-side check (not foolproof, but helpful for debugging)
  //       const payload = JSON.parse(atob(token.split('.')[1]));  // Decode payload
  //       const currentTime = Math.floor(Date.now() / 1000);
  //       if (payload.exp < currentTime) {
  //         alert("Token expired. Please log in again.");
  //         return;
  //       }
  //       if (payload.iat > currentTime) {
  //         console.warn("Token issued in future—server clock issue likely.");
  //       }

  //       const formattedData = {
  //   ...formData,
  //   skills: formData.skills
  //     .split(",")
  //     .map((s) => s.trim())
  //     .filter((s) => s.length > 0),   // remove empty values
  // };

  // const response = await axios.post(
  //   "https://www.scratchprod.in/resume-generator-backend/api/resumes",
  //   formattedData,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  //       // const response = await axios.post(
  //       //   "https://www.scratchprod.in/resume-generator-backend/api/resumes",
  //       //   formData,
  //       //   {
  //       //     headers: {
  //       //       Authorization: `Bearer ${token}`,
  //       //       "Content-Type": "multipart/form-data",
  //       //     },
  //       //   }
  //       // );

  //       console.log("Saved successfully:", response.data);
  //       const newResumeId = response.data?.data?.id;
  //       if (newResumeId) {
  //         navigate("/preview", { state: { resumeId: newResumeId } });
  //       } else {
  //         console.error("Resume ID not found in response");
  //         alert("Resume saved but could not retrieve the ID.");
  //       }
  //     } catch (error) {
  //       console.error("Error details:", {
  //         status: error.response?.status,
  //         message: error.response?.data?.message || error.message,
  //         fullResponse: error.response?.data,
  //       });
  //       alert("Something went wrong while saving the resume.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       alert("No token found. Please log in.");
  //       return;
  //     }

  //     const payload = JSON.parse(atob(token.split(".")[1]));
  //     const currentTime = Math.floor(Date.now() / 1000);

  //     if (payload.exp < currentTime) {
  //       alert("Token expired. Please log in again.");
  //       return;
  //     }

  //     // Convert skills string → array
  //     const formattedData = {
  //       ...formData,
  //       skills: formData.skills
  //         .split(",")
  //         .map((s) => s.trim())
  //         .filter((s) => s.length > 0),
  //     };

  //     const response = await axios.post(
  //       "https://www.scratchprod.in/resume-generator-backend/api/resumes",
  //       formattedData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response.data?.id)

  //     const newResumeId = response.data?.id;
  //     console.log(newResumeId)
  //     if (newResumeId) {
  //       navigate("/preview", { state: { resumeId: newResumeId } });
  //     } else {
  //       alert("Resume saved but could not retrieve ID.");
  //     }
  //   } catch (error) {
  //     console.error("Error saving resume:", error);
  //     alert("Something went wrong while saving the resume.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        alert("Please log in first.");
        return;
      }

      const formattedData = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const response = await axios.post(
        "https://www.scratchprod.in/resume-generator-backend/api/resumes",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const newResumeId = response.data?.id;

      if (newResumeId) {
        navigate("/preview", { state: { resumeId: newResumeId } });
      } else {
        alert("Resume saved but ID not returned.");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Something went wrong while saving the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mx: "auto", mt: -2, px: 0, overflowX: "hidden" }}>
      <Typography variant="h6" mb={1}>
        Basic Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "545px" } }}>
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "545px" } }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "545px" } }}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "545px" } }}>
            <TextField
              label="GitHub Link"
              name="github"
              value={formData.github}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "1105px" } }}>
            <TextField
              label="LinkedIn URL"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Education */}
        {/* Education */}
        <Typography variant="h6" mb={1}>
          Education
        </Typography>

        <Grid container spacing={2} sx={{ width: "100%" }}>
          {/* Education Level */}
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "545px" } }}>
            <TextField
              select
              label="Education Level"
              name="level"
              value={formData.education.level}
              onChange={handleEducationLevelChange}
              fullWidth
            >
              <MenuItem value="school">School</MenuItem>
              <MenuItem value="college">College</MenuItem>
            </TextField>
          </Grid>

          {/* Institution */}
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "545px" } }}>
            <TextField
              label="Institution"
              name="institution"
              value={formData.education.institution}
              onChange={handleEducationChange}
              fullWidth
              required
            />
          </Grid>

          {/* SCHOOL FIELDS */}
          {formData.education.level === "school" && (
            <Grid item xs={12} sx={{ width: { xs: "100%", md: "1105px" } }}>
              <TextField
                label="Board"
                name="board"
                value={formData.education.board}
                onChange={handleEducationChange}
                fullWidth
                required
              />
            </Grid>
          )}

          {/* COLLEGE FIELDS */}
          {formData.education.level === "college" && (
            <>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ width: { xs: "100%", md: "545px" } }}
              >
                <TextField
                  label="Degree"
                  name="degree"
                  value={formData.education.degree}
                  onChange={handleEducationChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{ width: { xs: "100%", md: "545px" } }}
              >
                <TextField
                  label="Field of Study"
                  name="field_of_study"
                  value={formData.education.field_of_study}
                  onChange={handleEducationChange}
                  fullWidth
                />
              </Grid>
            </>
          )}

          {/* YEARS */}
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "545px" } }}>
            <TextField
              label="Start Year"
              name="start_year"
              value={formData.education.start_year}
              onChange={handleEducationChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "545px" } }}>
            <TextField
              label="End Year"
              name="end_year"
              value={formData.education.end_year}
              onChange={handleEducationChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Skills */}
        <Typography variant="h6" mb={1}>
          Skills
        </Typography>
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid item xs={12} sx={{ width: { xs: "100%", md: "1105px" } }}>
            <TextField
              label="Skills (comma-separated)"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
              placeholder="e.g., JavaScript, React, Node.js"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Projects */}
        <Typography variant="h6" mb={1}>
          Projects
        </Typography>
        {formData.projects.map((project, index) => (
          <Grid container spacing={2} mb={3} key={index}>
            {/* Project Title - 50% */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="Project Title"
                name="title"
                value={project.title}
                onChange={(e) => handleNestedChange(e, index, "projects")}
                fullWidth
              />
            </Grid>

            {/* GitHub Link - 50% */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="GitHub Link"
                name="github_url"
                value={project.github_url}
                onChange={(e) => handleNestedChange(e, index, "projects")}
                fullWidth
              />
            </Grid>

            {/* Start Date */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="Start Date"
                name="start_date"
                type="date"
                value={project.start_date}
                onChange={(e) => handleNestedChange(e, index, "projects")}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* End Date */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="End Date"
                name="end_date"
                type="date"
                value={project.end_date}
                onChange={(e) => handleNestedChange(e, index, "projects")}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Description - FULL WIDTH */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "1105px" } }}
            >
              <TextField
                label="Project Description"
                name="description"
                value={project.description}
                onChange={(e) => handleNestedChange(e, index, "projects")}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>

            {/* Upload Button */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  px: 3,
                  py: 2,
                  borderRadius: 2,
                  borderLeft: "4px solid #1976d2",
                }}
              >
                Upload Project Files
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => handleProjectFileChange(e, index)}
                />
              </Button>
            </Grid>

            {/* Uploaded Files - ATTRACTIVE */}
            {project.files?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="body2" mb={1}>
                  Uploaded Files
                </Typography>

                <Box display="flex" gap={1} flexWrap="wrap">
                  {project.files.map((file, i) => (
                    <Button
                      key={i}
                      size="small"
                      variant="outlined"
                      href={file.file_url}
                      target="_blank"
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                      }}
                    >
                      {file.file_name}
                    </Button>
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        ))}

        <Button
          variant="outlined"
          onClick={() => handleAdd("projects")}
          sx={{
            px: 2,
            py: 2,
            fontSize: "1rem",
            borderRadius: 2,
            mb: 3,
            borderLeft: "4px solid #1976d2", // example left border color
            // Keep border and background consistent on focus and active
            "&:focus": {
              outline: "none",
              backgroundColor: "transparent",
              borderLeft: "4px solid #1976d2",
            },
            "&:active": {
              backgroundColor: "transparent",
              borderLeft: "4px solid #1976d2",
            },
          }}
        >
          + Add Project
        </Button>

        <Divider sx={{ my: 3 }} />

        {/* Internships */}
        <Typography variant="h6" mb={1}>
          Internships
        </Typography>
        {formData.internships.map((internship, index) => (
          <Grid container spacing={2} mb={2} key={index}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="Company"
                name="company"
                value={internship.company}
                onChange={(e) => handleNestedChange(e, index, "internships")}
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="Role"
                name="role"
                value={internship.role}
                onChange={(e) => handleNestedChange(e, index, "internships")}
                fullWidth
              />
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <TextField
                label="Internship Type"
                name="internship_type"
                value={internship.internship_type}
                onChange={(e) => handleNestedChange(e, index, "internships")}
                fullWidth
                placeholder="e.g., Remote / Onsite / Paid / Unpaid"
              />
            </Grid> */}

            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="Start Date"
                name="start_date"
                type="date"
                value={internship.start_date}
                onChange={(e) => handleNestedChange(e, index, "internships")}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="End Date"
                name="end_date"
                type="date"
                value={internship.end_date}
                onChange={(e) => handleNestedChange(e, index, "internships")}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ width: { xs: "100%", md: "1105px" } }}
            >
              <TextField
                label="Description"
                name="description"
                value={internship.description}
                onChange={(e) => handleNestedChange(e, index, "internships")}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}
        <Button
          variant="outlined"
          onClick={() => handleAdd("internships")}
          sx={{
            px: 2,
            py: 2,
            fontSize: "1rem",
            borderRadius: 2,
            mb: 3,
            borderLeft: "4px solid #1976d2", // example left border color
            // Keep border and background consistent on focus and active
            "&:focus": {
              outline: "none",
              backgroundColor: "transparent",
              borderLeft: "4px solid #1976d2",
            },
            "&:active": {
              backgroundColor: "transparent",
              borderLeft: "4px solid #1976d2",
            },
          }}
        >
          + Add Internship
        </Button>

        <Divider sx={{ my: 3 }} />

        {/* Certifications */}
        <Typography variant="h6" mb={1}>
          Certifications
        </Typography>
        {formData.certifications.map((cert, index) => (
          <Grid container spacing={2} mb={2} key={index}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="Certification Tile"
                name="title"
                value={cert.name}
                onChange={(e) => handleNestedChange(e, index, "certifications")}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="Issuer"
                name="issuer"
                value={cert.issuer}
                onChange={(e) => handleNestedChange(e, index, "certifications")}
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="Date"
                name="date"
                type="date"
                value={cert.date}
                onChange={(e) => handleNestedChange(e, index, "certifications")}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="Skills (comma-separated)"
                name="skills"
                value={cert.skills}
                onChange={(e) => handleNestedChange(e, index, "certifications")}
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ width: { xs: "100%", md: "1105px" } }}
            >
              <TextField
                label="Category"
                name="category"
                value={cert.category}
                onChange={(e) => handleNestedChange(e, index, "certifications")}
                fullWidth
              />
            </Grid>
            {/* Upload Certificate File */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  px: 3,
                  py: 2,
                  borderRadius: 2,
                  borderLeft: "4px solid #1976d2",
                }}
              >
                Upload Certificate File
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    setFormData((prev) => {
                      const updated = [...prev.certifications];
                      updated[index] = {
                        ...updated[index],
                        file, // store file locally
                      };
                      return { ...prev, certifications: updated };
                    });
                  }}
                />
              </Button>
            </Grid>

            {/* Already Uploaded Certificate Link */}
            {/* Uploaded Certificates - ATTRACTIVE */}
            {cert.file_url && (
              <Grid item xs={12}>
                <Typography variant="body2" mb={1}>
                  Uploaded Certificate
                </Typography>

                <Box display="flex" gap={1} flexWrap="wrap">
                  <Button
                    size="small"
                    variant="outlined"
                    href={cert.file_url}
                    target="_blank"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      color: "text.primary", // ✅ NOT blue
                      borderColor: "grey.400", // subtle border
                      "&:hover": {
                        backgroundColor: "grey.100",
                        borderColor: "grey.600",
                      },
                    }}
                  >
                    {cert.name || "View Certificate"}
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        ))}

        <Button
          variant="outlined"
          onClick={() => handleAdd("internships")}
          sx={{
            px: 2,
            py: 2,
            fontSize: "1rem",
            borderRadius: 2,
            mb: 3,
            borderLeft: "4px solid #1976d2", // example left border color
            // Keep border and background consistent on focus and active
            "&:focus": {
              outline: "none",
              backgroundColor: "transparent",
              borderLeft: "4px solid #1976d2",
            },
            "&:active": {
              backgroundColor: "transparent",
              borderLeft: "4px solid #1976d2",
            },
          }}
        >
          + Add Certificate
        </Button>

        <Divider sx={{ my: 3 }} />

        {/* Awards */}
        <Typography variant="h6" mb={1}>
          Awards
        </Typography>
        {formData.awards.map((award, index) => (
          <Grid container spacing={2} mb={2} key={index}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="Award Name"
                name="name"
                value={award.name}
                onChange={(e) => handleNestedChange(e, index, "awards")}
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ width: { xs: "100%", md: "545px" } }}
            >
              <TextField
                label="Description"
                name="description"
                value={award.description}
                onChange={(e) => handleNestedChange(e, index, "awards")}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}
        <Button
          variant="outlined"
          onClick={() => handleAdd("awards")}
          sx={{
            px: 2,
            py: 2,
            fontSize: "1rem",
            borderRadius: 2,
            mb: 3,
            borderLeft: "4px solid #1976d2",
            "&:focus": {
              outline: "none",
              backgroundColor: "transparent",
              borderLeft: "4px solid #1976d2",
            },
            "&:active": {
              backgroundColor: "transparent",
              borderLeft: "4px solid #1976d2",
            },
          }}
        >
          + Add Award
        </Button>

        <Box mt={2} display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              py: 2,
              borderRadius: 2,
              fontSize: "1rem",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Generate Resume"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ResumeFormContainer;
