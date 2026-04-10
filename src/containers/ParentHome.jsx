// import React, { useEffect, useState } from "react";
// import { Paper, Typography, Box, Grid, Card, CardContent, Button, CircularProgress } from "@mui/material";
// import { Link } from "react-router-dom"; // Assuming React Router is used
// import axios from "axios";

// export default function ParentHomePage() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [guardianData, setGuardianData] = useState(null);
//   const [summary, setSummary] = useState({ childrenCount: 0, recentAttendance: [], topScore: null });

//   useEffect(() => {
//     let hasFetched = false;

//     const fetchGuardianSummary = async () => {
//       if (hasFetched) return;
//       hasFetched = true;

//       try {
//         const loggedInUser = JSON.parse(localStorage.getItem("user"));

//         const guardiansRes = await axios.get(
//           "https://www.scratchprod.in/resume-generator-backend/api/guardians"
//         );
//         const guardians = guardiansRes.data.data;

//         const guardian = guardians.find(
//           (g) => g.email.toLowerCase() === loggedInUser.email.toLowerCase()
//         );

//         if (guardian) {
//           setGuardianData(guardian);

//           // Fetch a small summary: e.g., attendances and scores for quick stats
//           const [attendancesRes, scoresRes] = await Promise.all([
//             axios.get(`https://www.scratchprod.in/resume-generator-backend/api/guardians/${guardian.id}/attendances`),
//             axios.get(`https://www.scratchprod.in/resume-generator-backend/api/guardians/${guardian.id}/exam-scores`)
//           ]);

//           const attendances = attendancesRes.data.attendances;
//           const examScores = scoresRes.data.exam_scores;

//           // Calculate summaries
//           const childrenCount = attendancesRes.data.linked_students.length;
//           const recentAttendance = attendances.slice(-3); // Last 3 records
//           const allScores = examScores.flatMap(es => es.scores.map(s => s.score));
//           const topScore = allScores.length > 0 ? Math.max(...allScores) : null;

//           setSummary({ childrenCount, recentAttendance, topScore });
//         } else {
//           setError("Guardian not found for logged-in user");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGuardianSummary();
//   }, []);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
//         Welcome, {guardianData ? guardianData.name : "Parent"}!
//       </Typography>
//       <Typography variant="body1" gutterBottom sx={{ color: 'primary.main' }}>
//         Here's a quick overview of your children's activities.
//       </Typography>

//       {/* Summary Cards */}
//       <Grid container spacing={3} sx={{ mt: 2 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{width:'200px'}}>
//             <CardContent sx={{ flexGrow: 1 }}>
//               <Typography variant="h6">Children</Typography>
//               <Typography variant="h4">{summary.childrenCount}</Typography>
//               <Typography>Linked Students</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{width:'200px'}}>
//             <CardContent sx={{ flexGrow: 1 }}>
//               <Typography variant="h6">Recent Attendance</Typography>
//               <Typography variant="body2">
//                 {summary.recentAttendance.length > 0
//                   ? `${summary.recentAttendance.filter(a => a.status === 'present').length} present out of ${summary.recentAttendance.length}`
//                   : "No recent data"}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{width:'200px'}}>
//             <CardContent sx={{ flexGrow: 1 }}>
//               <Typography variant="h6">Top Score</Typography>
//               <Typography variant="h4">{summary.topScore || "N/A"}</Typography>
//               <Typography>Highest Exam Score</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Navigation Buttons */}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
//           Explore Details
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item>
//             <Button variant="contained" style={{width:'200px'}} component={Link} to="/parent/dashboard/children">
//               View Children
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button variant="contained" style={{width:'200px'}} component={Link} to="/parent/dashboard/performance">
//               View Performance
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button variant="contained" style={{width:'200px'}} component={Link} to="/parent/dashboard/attendance-report">
//               View Attendance
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button variant="contained" style={{width:'200px'}} component={Link} to="/parent/dashboard/profile">
//               View Profile
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Optional: Recent Activities Snippet */}
//       {summary.recentAttendance.length > 0 && (
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
//             Recent Attendance
//           </Typography>
//           <Paper sx={{ p: 2 }}>
//             {summary.recentAttendance.map((att, index) => (
//               <Typography key={index} variant="body2">
//                 {att.student_name} - {att.subject} on {new Date(att.date).toLocaleDateString()}: {att.status}
//               </Typography>
//             ))}
//           </Paper>
//         </Box>
//       )}
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function ParentHomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guardianData, setGuardianData] = useState(null);
  const [summary, setSummary] = useState({
    childrenCount: 0,
    recentAttendance: [],
    topScore: null,
    linkedStudents: [],
  });

  useEffect(() => {
    const fetchGuardianSummary = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));

        const guardiansRes = await axios.get(
          "https://www.scratchprod.in/resume-generator-backend/api/guardians",
        );

        const guardian = guardiansRes.data.data.find(
          (g) => g.email.toLowerCase() === loggedInUser.email.toLowerCase(),
        );

        if (!guardian) {
          setError("Guardian not found");
          return;
        }

        setGuardianData(guardian);

        const [attRes, scoreRes] = await Promise.all([
          axios.get(
            `https://www.scratchprod.in/resume-generator-backend/api/guardians/${guardian.id}/attendances`,
          ),
          axios.get(
            `https://www.scratchprod.in/resume-generator-backend/api/guardians/${guardian.id}/exam-scores`,
          ),
        ]);

        const attendances = attRes.data.attendances || [];
        const examScores = scoreRes.data.exam_scores || [];
        const linkedStudents = attRes.data.linked_students || [];

        const allScores = examScores.flatMap((e) =>
          e.scores.map((s) => s.score),
        );

        setSummary({
          childrenCount: linkedStudents.length,
          recentAttendance: attendances.slice(-3),
          topScore: allScores.length ? Math.max(...allScores) : null,
          linkedStudents,
        });
        setSummary({
          childrenCount: linkedStudents.length,
          recentAttendance: attendances.slice(-3),
          topScore: allScores.length ? Math.max(...allScores) : null,
          linkedStudents,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuardianSummary();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const presentCount = summary.recentAttendance.filter(
    (a) => a.status === "present",
  ).length;

  const stats = [
    {
      label: "Children",
      value: summary.childrenCount,
      icon: <PeopleIcon />,
      color: "#4F46E5",
    },
    {
      label: "Attendance",
      value: `${presentCount}/${summary.recentAttendance.length || 0}`,
      icon: <CalendarTodayIcon />,
      color: "#22C55E",
    },
    {
      label: "Top Score",
      value: summary.topScore || "N/A",
      icon: <EmojiEventsIcon />,
      color: "#F59E0B",
    },
  ];

  return (
    <Box sx={{ p: 2, background: "#f5f7fb" }}>
      {/* 🔥 Header */}
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(90deg,#4F46E5,#6366F1,#4F46E5)",
          borderRadius: 3,
          p: 3,
          mb: 3,
          overflow: "hidden",
          color: "#fff",
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
          fontWeight="bold"
          sx={{ position: "relative" }}
        >
          Parent Dashboard
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, position: "relative" }}>
          Welcome back, {guardianData.name}
        </Typography>
      </Box>

      {/* 📊 Stats */}
      <Grid container spacing={2} mb={3}>
        {stats.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,

                // ✅ THIS IS THE MAIN FIX
                width: {
                  xs: 200, // 📱 mobile
                  sm: 280, // tablet (optional smoother scaling)
                  md: 350, // 💻 laptop (your requirement)
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
                <Typography fontWeight="bold" fontSize={22}>
                  {item.value}
                </Typography>
              </Box>

              <Box
                sx={{
                  background: item.color,
                  color: "#fff",
                  p: 1.2,
                  borderRadius: 2,
                }}
              >
                {item.icon}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* 📅 Main Section */}
      <Grid container spacing={2}>
        {/* Children */}
        <Grid item xs={12} md>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight="bold" mb={2}>
              Children Overview
            </Typography>

            {summary.linkedStudents.length === 0 ? (
              <Typography color="text.secondary">No linked students</Typography>
            ) : (
              summary.linkedStudents.map((child, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: {
                      xs: "100%", // mobile
                      sm: "100%", // tablet
                      md: 650, // laptop+
                    },
                    maxWidth: "100%",
                    gap: 2,
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    background: "#EEF2FF",
                  }}
                >
                  {/* Avatar */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#4F46E5",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {child.charAt(0)}
                  </Box>

                  {/* Name */}
                  <Typography fontWeight="bold">{child}</Typography>
                </Box>
              ))
            )}
          </Paper>
        </Grid>

        {/* Attendance */}
        <Grid item xs={12} md="auto" sx={{ width: { md: 380 } }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight="bold" mb={2}>
              Recent Attendance
            </Typography>

            {summary.recentAttendance.length === 0 ? (
              <Typography color="text.secondary">No recent records</Typography>
            ) : (
              summary.recentAttendance.map((att, i) => (
                <Box key={i} mb={2}>
                  <Typography fontWeight="bold">{att.student_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {att.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: att.status === "present" ? "#22C55E" : "#EF4444",
                    }}
                  >
                    {att.status}
                  </Typography>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* ⚡ Actions */}
      <Grid container spacing={2} mt={2}>
        {[
          { label: "View Children", path: "/parent/dashboard/children" },
          { label: "View Performance", path: "/parent/dashboard/performance" },
          {
            label: "View Attendance",
            path: "/parent/dashboard/attendance-report",
          },
          { label: "View Profile", path: "/parent/dashboard/profile" },
        ].map((btn, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper
              component={Link}
              to={btn.path}
              sx={{
                p: 2,
                borderRadius: 3,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 80,
                fontWeight: "bold",
                color: "#374151",
                transition: "0.2s",
                "&:hover": {
                  background: "#EEF2FF",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {btn.label}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
