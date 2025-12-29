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

// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Grid,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function ResumeFormContainer() {
//   const [formData, setFormData] = useState({
//     name: "",
//     education: "",
//     projects: [{ title: "", description: "" }],
//     internships: [{ company: "", role: "", description: "" }],
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Handle input
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

//   // Handle submit (save to backend and navigate to preview)
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   try {
//   //     // ✅ Post form data to backend
//   //     // Retrieve the token from localStorage
//   //     const token = localStorage.getItem("token");

//   //     // Log the token to the console for debugging
//   //     console.log("Retrieved token:", token);

//   //     // Proceed with the axios request
//   //     const response = await axios.post(
//   //       "https://www.scratchprod.in/resume-generator-backend/api/resumes",
//   //       formData,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`, // Use the retrieved token
//   //           "Content-Type": "multipart/form-data",
//   //         },
//   //       }
//   //     );

//   //     // Optionally, log the full request config for more details
//   //     console.log("Request headers:", {
//   //       Authorization: `Bearer ${token}`,
//   //       "Content-Type": "multipart/form-data",
//   //     });

//   //     console.log("Saved successfully:", response.data);

//   //     // ✅ Extract ID properly from response
//   //     const newResumeId = response.data?.data?.id;

//   //     if (newResumeId) {
//   //       // ✅ Navigate to preview page with ID
//   //       navigate("/preview", { state: { resumeId: newResumeId } });
//   //     } else {
//   //       console.error("Resume ID not found in response");
//   //       alert("Resume saved but could not retrieve the ID.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error details:", {
//   //        status: error.response?.status,
//   //        message: error.response?.data?.message || error.message,
//   //        fullResponse: error.response?.data,  // Log the entire response body
//   //      });

//   //     console.error("Error details:", error.response?.data, error.response?.status, error.message);

//   //     console.error("Error saving resume:", error);
//   //     alert("Something went wrong while saving the resume.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const token = localStorage.getItem("token");
//     console.log("Retrieved token:", token);

//     if (!token) {
//       alert("No token found. Please log in.");
//       return;
//     }

//     // Optional: Basic client-side check (not foolproof, but helpful for debugging)
//     const payload = JSON.parse(atob(token.split('.')[1]));  // Decode payload
//     const currentTime = Math.floor(Date.now() / 1000);
//     if (payload.exp < currentTime) {
//       alert("Token expired. Please log in again.");
//       return;
//     }
//     if (payload.iat > currentTime) {
//       console.warn("Token issued in future—server clock issue likely.");
//     }

//     const response = await axios.post(
//       "https://www.scratchprod.in/resume-generator-backend/api/resumes",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     console.log("Saved successfully:", response.data);
//     const newResumeId = response.data?.data?.id;
//     if (newResumeId) {
//       navigate("/preview", { state: { resumeId: newResumeId } });
//     } else {
//       console.error("Resume ID not found in response");
//       alert("Resume saved but could not retrieve the ID.");
//     }
//   } catch (error) {
//     console.error("Error details:", {
//       status: error.response?.status,
//       message: error.response?.data?.message || error.message,
//       fullResponse: error.response?.data,
//     });
//     alert("Something went wrong while saving the resume.");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <Box sx={{ mx: "auto", mt: -2, px: 0, overflowX: "hidden" }}>
//       <Typography variant="h6" mb={1}>
//         Basic Details
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2} sx={{ width: "100%" }}>
//           <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "340px" } }}>
//             <TextField
//               label="Full Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "340px" } }}>
//             <TextField
//               label="Education"
//               name="education"
//               value={formData.education}
//               onChange={handleChange}
//               fullWidth
//               required
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
import { useSelector } from "react-redux"
import axios from "axios";

function ResumeFormContainer() {
  const user = useSelector((state) => state.auth.user);
  console.log(user.email)
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    github: "",
    education: { degree: "", institution: "", year: "" },
    projects: [{ title: "", description: "" }],
    internships: [{ company: "", role: "", description: "" }],
    certifications: [{ name: "", issuer: "", date: "" }],
    awards: [{ name: "", description: "" }],
    skills: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input for simple fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle input for education object
  const handleEducationChange = (e) => {
    setFormData({
      ...formData,
      education: { ...formData.education, [e.target.name]: e.target.value },
    });
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
        newItem = { title: "", description: "" };
        break;
      case "internships":
        newItem = { company: "", role: "", description: "" };
        break;
      case "certifications":
        newItem = { name: "", issuer: "", date: "" };
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

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp < currentTime) {
      alert("Token expired. Please log in again.");
      return;
    }

    // Convert skills string → array
    const formattedData = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    };

    const response = await axios.post(
      "https://www.scratchprod.in/resume-generator-backend/api/resumes",
      formattedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data?.id)

    const newResumeId = response.data?.id;
    console.log(newResumeId)
    if (newResumeId) {
      navigate("/preview", { state: { resumeId: newResumeId } });
    } else {
      alert("Resume saved but could not retrieve ID.");
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
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "340px" } }}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "340px" } }}>
            <TextField
              label="GitHub Link"
              name="github"
              value={formData.github}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Education */}
        <Typography variant="h6" mb={1}>
          Education
        </Typography>
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "340px" } }}>
            <TextField
              label="Degree"
              name="degree"
              value={formData.education.degree}
              onChange={handleEducationChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "340px" } }}>
            <TextField
              label="Institution"
              name="institution"
              value={formData.education.institution}
              onChange={handleEducationChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", md: "340px" } }}>
            <TextField
              label="Year"
              name="year"
              value={formData.education.year}
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
          <Grid item xs={12} sx={{ width: { xs: "100%", md: "700px" } }}>
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
              md={6}
              sx={{ width: { xs: "100%", md: "340px" } }}
            >
              <TextField
                label="Certification Name"
                name="name"
                value={cert.name}
                onChange={(e) => handleNestedChange(e, index, "certifications")}
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
              md={6}
              sx={{ width: { xs: "100%", md: "340px" } }}
            >
              <TextField
                label="Date"
                name="date"
                value={cert.date}
                onChange={(e) => handleNestedChange(e, index, "certifications")}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}
        <Button
          variant="outlined"
          onClick={() => handleAdd("certifications")}
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
          + Add Certification
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
              sx={{ width: { xs: "100%", md: "340px" } }}
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
              sx={{ width: { xs: "100%", md: "340px" } }}
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


