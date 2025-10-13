// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Grid,
//   Divider,
//   CircularProgress,
//   Paper,
// } from "@mui/material";
// import { generateResumePrompt } from "../utils/openai.js";
// import ResumePreview from "../components/ResumePreview.jsx";
// import SkillTag from "../components/SkillTag.jsx";
// import { useNavigate } from "react-router-dom";

// function ResumeFormContainer() {
//   const [formData, setFormData] = useState({
//     name: "",
//     education: "",
//     projects: [{ title: "", description: "" }],
//     internships: [{ company: "", role: "", description: "" }],
//   });

//   const [resume] = useState("");
//   const [skills] = useState([]);
//   const [loading] = useState(false);
//   const navigate = useNavigate();

//   // Handle form input
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleNestedChange = (e, index, type) => {
//     const updatedArray = [...formData[type]];
//     updatedArray[index][e.target.name] = e.target.value;
//     setFormData({ ...formData, [type]: updatedArray });
//   };

//   const handleAdd = (type) => {
//     const newItem =
//       type === "projects"
//         ? { title: "", description: "" }
//         : { company: "", role: "", description: "" };
//     setFormData({ ...formData, [type]: [...formData[type], newItem] });
//   };

//   // Extract skills from AI output
//   //   const handleGenerateSkills = (aiOutput) => {
//   //     const skillLine = aiOutput.match(/Skills[:|-]\s*(.*)/i);
//   //     if (skillLine && skillLine[1]) {
//   //       const extracted = skillLine[1].split(",").map((s) => s.trim());
//   //       setSkills(extracted);
//   //     }
//   //   };

//   // Submit form and generate resume
//   //   const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   // try {
//   //   const aiOutput = await generateResumePrompt(formData);
//   //   console.log(aiOutput)

//   //   // extract skills
//   //   const extractedSkills = [];
//   //   const skillLine = aiOutput.match(/Skills[:|-]\s*(.*)/i);
//   //   if (skillLine && skillLine[1]) {
//   //     skillLine[1].split(",").forEach((s) => extractedSkills.push(s.trim()));
//   //   }

//   //   // navigate to preview page
//   //   navigate("/preview", {
//   //     state: { resumeText: aiOutput, skills: extractedSkills },
//   //   });

//   // } catch (error) {
//   //   console.error("AI Error:", error);
//   //   alert("Something went wrong while generating the resume. Please try again.");
//   // }
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     try {
//       // Mock AI output for testing
//       const aiOutput = `John Doe
// Education: B.Tech
// Projects:
// - Portfolio Website: Built a personal portfolio website using React and Tailwind CSS
// - Chat App: Created a real-time chat app using Node.js, Express, Socket.io
// Internships:
// - Tech Solutions: Frontend Developer Intern, Worked on UI development using React
// Skills: React, Node.js, MongoDB, Tailwind CSS, Socket.io`;

//       console.log("AI Output (mock):", aiOutput);

//       // Extract skills from AI output
//       const extractedSkills = [];
//       const skillLine = aiOutput.match(/Skills[:|-]\s*(.*)/i);
//       if (skillLine && skillLine[1]) {
//         skillLine[1].split(",").forEach((s) => extractedSkills.push(s.trim()));
//       }

//       // Navigate to PreviewPage with resume and skills
//       navigate("/preview", {
//         state: { resumeText: aiOutput, skills: extractedSkills },
//       });
//     } catch (error) {
//       console.error("AI Error:", error);
//       alert(
//         "Something went wrong while generating the resume. Please check your API quota or try again later."
//       );
//     }
//   };

//   return (
//     <Box sx={{ mx: "auto", mt: -2, px: 0, overflowX: "hidden" }}>
//       {/* <Paper sx={{ p: 3,px:0,overflowX:'hidden' }}> */}
//       <Typography variant="h6" mb={1}>
//         Basic Details
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2} sx={{ width: "100%" }}>
//           <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "340px",} }}>
//             <TextField
//               label="Full Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "340px" } }}>
//             <TextField
//               label="Education"
//               name="education"
//               value={formData.education}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         {/* Projects */}
//         <Typography variant="h6" mb={1}>
//           Projects
//         </Typography>
//         {formData.projects.map((project, index) => (
//           <Grid container spacing={2} mb={2} key={index}>
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{ width: { xs: "100%", md: "340px" } }}
//             >
//               <TextField
//                 label="Project Title"
//                 name="title"
//                 value={project.title}
//                 onChange={(e) => handleNestedChange(e, index, "projects")}
//                 fullWidth
//               />
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{ width: { xs: "100%", md: "340px" } }}
//             >
//               <TextField
//                 label="Project Description"
//                 name="description"
//                 value={project.description}
//                 onChange={(e) => handleNestedChange(e, index, "projects")}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//         ))}
//         <Button
//           variant="outlined"
//           onClick={() => handleAdd("projects")}
//           sx={{
//             px: 2,
//             py: 2,
//             fontSize: "1rem",
//             borderRadius: 2,
//             mb: 3,
//             borderLeft: "4px solid #1976d2", // example left border color
//             // Keep border and background consistent on focus and active
//             "&:focus": {
//               outline: "none",
//               backgroundColor: "transparent",
//               borderLeft: "4px solid #1976d2",
//             },
//             "&:active": {
//               backgroundColor: "transparent",
//               borderLeft: "4px solid #1976d2",
//             },
//           }}
//         >
//           + Add Project
//         </Button>

//         <Divider sx={{ my: 3 }} />

//         {/* Internships */}
//         <Typography variant="h6" mb={1}>
//           Internships
//         </Typography>
//         {formData.internships.map((internship, index) => (
//           <Grid container spacing={2} mb={2} key={index}>
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{ width: { xs: "100%", md: "340px" } }}
//             >
//               <TextField
//                 label="Company"
//                 name="company"
//                 value={internship.company}
//                 onChange={(e) => handleNestedChange(e, index, "internships")}
//                 fullWidth
//               />
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{ width: { xs: "100%", md: "340px" } }}
//             >
//               <TextField
//                 label="Role"
//                 name="role"
//                 value={internship.role}
//                 onChange={(e) => handleNestedChange(e, index, "internships")}
//                 fullWidth
//               />
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               md={12}
//               sx={{ width: { xs: "100%", md: "700px" } }}
//             >
//               <TextField
//                 label="Description"
//                 name="description"
//                 value={internship.description}
//                 onChange={(e) => handleNestedChange(e, index, "internships")}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//         ))}
//         <Button
//           variant="outlined"
//           onClick={() => handleAdd("internships")}
//           sx={{
//             px: 2,
//             py: 2,
//             fontSize: "1rem",
//             borderRadius: 2,
//             mb: 3,
//             borderLeft: "4px solid #1976d2", // example left border color
//             // Keep border and background consistent on focus and active
//             "&:focus": {
//               outline: "none",
//               backgroundColor: "transparent",
//               borderLeft: "4px solid #1976d2",
//             },
//             "&:active": {
//               backgroundColor: "transparent",
//               borderLeft: "4px solid #1976d2",
//             },
//           }}
//         >
//           + Add Internship
//         </Button>

//         {/* Submit Button */}
//         <Box mt={2} display="flex" justifyContent="center">
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             sx={{
//               px: 4,
//               py: 2,
//               borderRadius: 2,
//               fontSize: "1rem",
//             }}
//           >
//             {loading ? <CircularProgress size={24} /> : "Generate Resume"}
//           </Button>
//         </Box>
//       </form>

//       {/* AI Generated Resume */}
//       {resume && (
//         <Box mt={5}>
//           <Typography variant="h5" mb={2}>
//             Generated Resume
//           </Typography>
//           <ResumePreview resumeText={resume} />

//           {/* Skills */}
//           <Typography variant="h6" mt={3}>
//             Extracted Skills
//           </Typography>
//           <SkillTag skills={skills} />
//         </Box>
//       )}
//       {/* </Paper> */}
//     </Box>
//   );
// }

// export default ResumeFormContainer;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ResumeFormContainer() {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    projects: [{ title: "", description: "" }],
    internships: [{ company: "", role: "", description: "" }],
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (e, index, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  const handleAdd = (type) => {
    const newItem =
      type === "projects"
        ? { title: "", description: "" }
        : { company: "", role: "", description: "" };
    setFormData({ ...formData, [type]: [...formData[type], newItem] });
  };

  // Handle submit (save to backend and navigate to preview)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Post form data to backend
      const response = await axios.post(
        "https://www.scratchprod.in/resume-generator-backend/api/resumes",
        formData
      );

      console.log("Saved successfully:", response.data);

      // ✅ Extract ID properly from response
      const newResumeId = response.data?.data?.id;

      if (newResumeId) {
        // ✅ Navigate to preview page with ID
        navigate("/preview", { state: { resumeId: newResumeId } });
      } else {
        console.error("Resume ID not found in response");
        alert("Resume saved but could not retrieve the ID.");
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
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "340px" } }}>
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "340px" } }}>
            <TextField
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Projects */}
        <Typography variant="h6" mb={1}>
          Projects
        </Typography>
        {formData.projects.map((project, index) => (
          <Grid container spacing={2} mb={2} key={index}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ width: { xs: "100%", md: "340px" } }}
            >
              <TextField
                label="Project Title"
                name="title"
                value={project.title}
                onChange={(e) => handleNestedChange(e, index, "projects")}
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ width: { xs: "100%", md: "340px" } }}
            >
              <TextField
                label="Project Description"
                name="description"
                value={project.description}
                onChange={(e) => handleNestedChange(e, index, "projects")}
                fullWidth
              />
            </Grid>
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
              sx={{ width: { xs: "100%", md: "340px" } }}
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
              sx={{ width: { xs: "100%", md: "340px" } }}
            >
              <TextField
                label="Role"
                name="role"
                value={internship.role}
                onChange={(e) => handleNestedChange(e, index, "internships")}
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ width: { xs: "100%", md: "700px" } }}
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


