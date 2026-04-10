// import { useEffect, useState } from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import { getStudentDashboard } from "../services/dashboardApi";

// import StatCard from "../components/dashboard/StatCard";
// import ProgressCard from "../components/dashboard/ProgressCard";
// import SectionStatus from "../components/dashboard/SectionStatus";
// import RecentActivity from "../components/dashboard/RecentActivity";

// export default function StudentDashboardContainer() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;

//   const [dashboard, setDashboard] = useState(null);

//   useEffect(() => {
//     if (!dashboard) return;

//     const suggestions = getImprovementSuggestions();

//     if (suggestions.length > 0) {
//       const resumeNotifications = suggestions.map((text, index) => ({
//         id: `resume-${index}`,
//         title: "Resume Improvement",
//         message: text,
//         is_read: false,
//         created_at: new Date().toISOString(),
//       }));

//       localStorage.setItem(
//         "resume_notifications",
//         JSON.stringify(resumeNotifications),
//       );
//     }
//   }, [dashboard]);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     const res = await getStudentDashboard(userId);
//     setDashboard(res.data);
//   };

//   if (!dashboard) return null;

//   const {
//     resume_completion,
//     skill_score,
//     quick_stats,
//     section_status,
//     recent_activity,
//   } = dashboard;

//   const getImprovementSuggestions = () => {
//     const suggestions = [];

//     // Personal Details
//     if (!section_status.personal_details.completed) {
//       suggestions.push(
//         "Complete all personal details (name, email, phone, GitHub)",
//       );
//     }

//     // Education
//     if (!section_status.education.completed) {
//       suggestions.push("Complete your college education details");
//     }

//     // Skills (need 10)
//     if (quick_stats.skills_count < 10) {
//       suggestions.push(`Add ${10 - quick_stats.skills_count} more skill(s)`);
//     }

//     // Projects (need 4 completed)
//     if (quick_stats.projects_completed < 4) {
//       suggestions.push(
//         `Complete ${4 - quick_stats.projects_completed} more project(s)`,
//       );
//     }

//     // Certificates (need 3)
//     if (quick_stats.certificates_uploaded < 3) {
//       suggestions.push(
//         `Upload ${3 - quick_stats.certificates_uploaded} more certificate(s)`,
//       );
//     }

//     // Internships (need 3 completed)
//     if (quick_stats.internships_completed < 3) {
//       suggestions.push(
//         `Complete ${3 - quick_stats.internships_completed} more internship(s)`,
//       );
//     }

//     return suggestions;
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h5" fontWeight="bold" mb={3} color="black">
//         Student Dashboard
//       </Typography>

//       {/* {resume_completion < 100 && getImprovementSuggestions().length > 0 && (
//         <Box mb={3} p={2} borderRadius={2} sx={{ backgroundColor: "#fff3e0" }}>
//           <Typography fontWeight={600} color="warning.main">
//             Improve your resume to reach 100%
//           </Typography>

//           <Typography variant="body2" color="text.secondary">
//             To improve your resume completion, please:
//             <ul style={{ margin: "8px 0 0 16px" }}>
//               {getImprovementSuggestions().map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           </Typography>
//         </Box>
//       )} */}

//       {/* Progress */}
//       <Grid container spacing={2} mb={3}>
//         <Grid item xs={12} sm={6} md={6}>
//           <ProgressCard title="Resume Completion" value={resume_completion} />
//         </Grid>
//         <Grid item xs={12} sm={6} md={6}>
//           <ProgressCard title="Skill Score" value={skill_score} />
//         </Grid>
//       </Grid>

//       {/* Quick Stats */}
//       <Grid container spacing={2} mb={3}>
//         <Grid item xs={6} sm={3} md={3}>
//           <StatCard label="Skills" value={quick_stats.skills_count} />
//         </Grid>
//         <Grid item xs={6} sm={3} md={3}>
//           <StatCard label="Projects" value={quick_stats.projects_completed} />
//         </Grid>
//         <Grid item xs={6} sm={3} md={3}>
//           <StatCard
//             label="Certificates"
//             value={quick_stats.certificates_uploaded}
//           />
//         </Grid>
//         <Grid item xs={6} sm={3} md={3}>
//           <StatCard
//             label="Internships"
//             value={`${quick_stats.internships_completed}/${quick_stats.internships_ongoing}`}
//           />
//         </Grid>
//       </Grid>

//       {recent_activity?.length > 0 && (
//         <Box mt={3} mb={3}>
//           <RecentActivity activities={recent_activity} />
//         </Box>
//       )}

//       {/* Section Status */}
//       <Box>
//         <Typography variant="h6" mb={2} color="black">
//           Section Completion
//         </Typography>

//         <SectionStatus
//           title="Personal Details"
//           completedCount={section_status.personal_details.completed ? 1 : 0}
//           totalCount={1}
//         />

//         <SectionStatus
//           title="Education"
//           completedCount={section_status.education.completed ? 1 : 0}
//           totalCount={1}
//         />

//         <SectionStatus
//           title="Skills"
//           completedCount={quick_stats.skills_count}
//           totalCount={10}
//         />

//         <SectionStatus
//           title="Projects"
//           completedCount={quick_stats.projects_completed}
//           totalCount={4}
//         />

//         <SectionStatus
//           title="Certificates"
//           completedCount={quick_stats.certificates_uploaded}
//           totalCount={3}
//         />

//         <SectionStatus
//           title="Internships"
//           completedCount={quick_stats.internships_completed}
//           totalCount={3}
//         />
//       </Box>
//     </Box>
//   );
// }

import { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper, LinearProgress } from "@mui/material";
import { getStudentDashboard } from "../services/dashboardApi";

import SectionStatus from "../components/dashboard/SectionStatus";
import RecentActivity from "../components/dashboard/RecentActivity";

export default function StudentDashboardContainer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await getStudentDashboard(userId);
    setDashboard(res.data);
  };

  if (!dashboard) return null;

  const {
    resume_completion,
    skill_score,
    quick_stats,
    section_status,
    recent_activity,
  } = dashboard;

  return (
    <Box sx={{ background: "#F4F7FE", minHeight: "100vh" }}>
      <Box sx={{ p: 4 }}>
        {/* HEADER */}
        <Box
          sx={{
            position: "relative",
            background: "linear-gradient(90deg,#4F46E5,#6366F1,#4F46E5)",
            borderRadius: 3,
            p: 3,
            mb: 4,
            overflow: "hidden",
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 120,
              opacity: 0.18,
            }}
          >
            <path
              fill="#ffffff"
              d="M0,160L80,176C160,192,320,224,480,224C640,224,800,192,960,165.3C1120,139,1280,117,1360,106.7L1440,96L1440,320L0,320Z"
            />
          </Box>

          <Typography
            variant="h5"
            sx={{ color: "#fff", fontWeight: 600, position: "relative" }}
          >
            Student Dashboard
          </Typography>
        </Box>

        {/* KPI CARDS */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {[
            {
              label: "Skills",
              value: quick_stats.skills_count,
              color: "#3B82F6",
            },
            {
              label: "Projects",
              value: quick_stats.projects_completed,
              color: "#6366F1",
            },
            {
              label: "Certificates",
              value: quick_stats.certificates_uploaded,
              color: "#22C55E",
            },
            {
              label: "Internships",
              value: `${quick_stats.internships_completed}/${quick_stats.internships_ongoing}`,
              color: "#EC4899",
            },
          ].map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={item.label}
              display="flex"
              justifyContent="center" // ✅ center like admin
            >
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,

                  // ✅ THIS IS THE MAIN FIX
                  width: {
                    xs: 200, // 📱 mobile
                    sm: 280, // tablet (optional smoother scaling)
                    md: 335, // 💻 laptop (your requirement)
                  },

                  // ✅ center spacing like admin
                  mx: "auto",

                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {item.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 2,
                    background: item.color,
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 6,
                    background: item.color,
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* PROGRESS + RECENT ACTIVITY */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* LEFT */}
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: { xs: "stretch", md: "flex-start" }, // align left like admin
              }}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  width: 750, // ✅ safe now (inside Box, not breaking Grid)
                }}
              >
                <Typography variant="h6">Resume Overview</Typography>

                {/* Resume Completion */}
                <Box>
                  <Typography mb={1}>Resume Completion</Typography>

                  <LinearProgress
                    variant="determinate"
                    value={resume_completion}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      background: "#E5E7EB",
                      "& .MuiLinearProgress-bar": {
                        background: "#6366F1",
                      },
                    }}
                  />

                  <Typography mt={1} fontWeight={600}>
                    {resume_completion}%
                  </Typography>

                  <Typography fontSize={12} color="text.secondary">
                    Almost there! Complete remaining sections to reach 100%
                  </Typography>
                </Box>

                {/* Skill Score */}
                <Box>
                  <Typography mb={1}>Skill Score</Typography>

                  <LinearProgress
                    variant="determinate"
                    value={skill_score}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      background: "#E5E7EB",
                      "& .MuiLinearProgress-bar": {
                        background: "#22C55E",
                      },
                    }}
                  />

                  <Typography mt={1} fontWeight={600}>
                    {skill_score}%
                  </Typography>

                  <Typography fontSize={12} color="text.secondary">
                    Keep improving your skills to increase your score
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* RIGHT */}
          {recent_activity?.length > 0 && (
            <Grid item xs={12} md={3}>
              <Box sx={{ width: 520, maxWidth: "100%" }}>
                <RecentActivity activities={recent_activity} />
              </Box>
            </Grid>
          )}
        </Grid>

        {/* SECTION COMPLETION */}
        <Grid container spacing={3}>
          <Grid sx={{width: {
                    xs: 300, // 📱 mobile
                    sm: 1100, // tablet (optional smoother scaling)
                    md: 1530, // 💻 laptop (your requirement)
                    mx: "auto",

                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  },}}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              width: "100%", // IMPORTANT
            }}
          >
            <Typography variant="h6" mb={3}>
              Section Completion
            </Typography>

            <SectionStatus
              title="Personal Details"
              completedCount={section_status.personal_details.completed ? 1 : 0}
              totalCount={1}
            />

            <SectionStatus
              title="Education"
              completedCount={section_status.education.completed ? 1 : 0}
              totalCount={1}
            />

            <SectionStatus
              title="Skills"
              completedCount={quick_stats.skills_count}
              totalCount={10}
            />

            <SectionStatus
              title="Projects"
              completedCount={quick_stats.projects_completed}
              totalCount={4}
            />

            <SectionStatus
              title="Certificates"
              completedCount={quick_stats.certificates_uploaded}
              totalCount={3}
            />

            <SectionStatus
              title="Internships"
              completedCount={quick_stats.internships_completed}
              totalCount={3}
            />
          </Paper>

          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
