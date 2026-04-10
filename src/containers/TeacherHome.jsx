// import React, { useEffect, useState } from "react";
// import { Box, Typography, Grid, Paper, Divider, CircularProgress } from "@mui/material";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import {
//   getAllTimetables,
//   getStudentsForTeacher,
//   getExamScores,
// } from "../services/api";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import SchoolIcon from "@mui/icons-material/School";
// import PeopleIcon from "@mui/icons-material/People";

// const TeacherHomePage = () => {
//   const loggedInUser = useSelector((state) => state.auth.user);
//   const [teacher, setTeacher] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timetables, setTimetables] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [todayClasses, setTodayClasses] = useState([]);
//   const [testCount, setTestCount] = useState(0);

//   const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

//   useEffect(() => {
//     const fetchTeacher = async () => {
//       try {
//         const res = await axios.get(
//           "https://www.scratchprod.in/resume-generator-backend/api/teachers"
//         );

//         const allTeachers = res.data.data || [];
//         const foundTeacher = allTeachers.find(
//           (t) =>
//             t.email?.toLowerCase() === loggedInUser?.email?.toLowerCase() ||
//             t.id === loggedInUser?.id
//         );

//         setTeacher(foundTeacher || null);
//       } catch (err) {
//         console.error("Error fetching teacher data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (loggedInUser) fetchTeacher();
//   }, [loggedInUser]);

//   useEffect(() => {
//     if (!teacher?.name) return;

//     // ✅ Fetch all timetables for this teacher
//     getAllTimetables()
//       .then((res) => {
//         const teacherData = res.data.filter(
//           (t) => t.teacher_name.toLowerCase() === teacher.name.toLowerCase()
//         );
//         setTimetables(teacherData);

//         // Filter today's classes
//         const todayData = teacherData.filter((t) => t.day === today);
//         setTodayClasses(todayData);
//       })
//       .catch((err) => console.error("Error fetching timetables:", err));

//     // ✅ Fetch students
//     getStudentsForTeacher(teacher.name)
//       .then((res) => setStudents(res.data.students || []))
//       .catch((err) => console.error("Error fetching students:", err));

//     // ✅ Fetch exam scores
//     getExamScores(teacher.name)
//       .then((res) => {
//         const uniqueTests = new Set(res.data.map((exam) => exam.test_name));
//         console.log(uniqueTests)
//         setTestCount(uniqueTests.size);
//       })
//       .catch((err) => console.error("Error fetching exam scores:", err));
//   }, [teacher]);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           backgroundColor: "#f5f5f5",
//           height: "80vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!teacher) {
//     return (
//       <Box
//         sx={{
//           backgroundColor: "#f5f5f5",
//           height: "80vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Typography variant="h6" color="textSecondary">
//           Teacher details not found.
//         </Typography>
//       </Box>
//     );
//   }

//   // Stats
//   const subjectsCount = new Set(timetables.map((t) => t.subject_name)).size;
//   const studentsCount = students.length;

//   const stats = [
//     {
//       label: "Subjects Taught",
//       value: subjectsCount,
//       icon: <SchoolIcon color="primary" fontSize="large" />,
//     },
//     {
//       label: "Students",
//       value: studentsCount,
//       icon: <PeopleIcon color="success" fontSize="large" />,
//     },
//     {
//       label: "Tests Conducted",
//       value: testCount,
//       icon: <EmojiEventsIcon color="warning" fontSize="large" />,
//     },
//   ];

//   return (
//     <Box p={3} sx={{ backgroundColor: "#f5f5f5" }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ color: "#1976d2", fontWeight: "bold" }}
//       >
//         👋 Welcome back, {teacher.name || "Teacher"}!
//       </Typography>
//       <Typography variant="subtitle1" sx={{ mb: 3, color:"#1976d2" }}>
//         Here’s your teaching overview for today.
//       </Typography>

//       {/* Stats Section */}
//       <Grid container spacing={2} sx={{ mb: 4, justifyContent: "center" }}>
//         {stats.map((stat, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Paper
//               elevation={3}
//               sx={{
//                 p: 3,
//                 textAlign: "center",
//                 borderRadius: 3,
//                 backgroundColor: "white",
//                 width: 250,
//                 mx: "auto",
//               }}
//             >
//               {stat.icon}
//               <Typography variant="h6" sx={{ mt: 1 }}>
//                 {stat.label}
//               </Typography>
//               <Typography
//                 variant="h5"
//                 sx={{ fontWeight: "bold", color: "#1976d2" }}
//               >
//                 {stat.value}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Today's Schedule */}
//       <Paper elevation={3} sx={{ p: 3 }}>
//         <Typography
//           variant="h5"
//           sx={{ color: "#1976d2", fontWeight: "bold", mb: 1 }}
//         >
//           🗓️ Today’s Schedule ({today})
//         </Typography>
//         <Divider sx={{ mb: 2 }} />

//         {todayClasses.length === 0 ? (
//           <Typography color="textSecondary">
//             No classes scheduled for today.
//           </Typography>
//         ) : (
//           todayClasses.map((cls) => (
//             <Paper
//               key={cls.id}
//               elevation={1}
//               sx={{
//                 p: 2,
//                 mb: 1.5,
//                 borderRadius: 2,
//                 backgroundColor: "#E3F2FD",
//               }}
//             >
//               <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                 {cls.subject_name}
//               </Typography>
//               <Typography variant="body2">
//                 {cls.department} - {cls.year}
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 {cls.time}
//               </Typography>
//             </Paper>
//           ))
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default TeacherHomePage;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  getAllTimetables,
  getStudentsForTeacher,
  getExamScores,
} from "../services/api";

import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const TeacherHomePage = () => {
  const loggedInUser = useSelector((state) => state.auth.user);

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timetables, setTimetables] = useState([]);
  const [students, setStudents] = useState([]);
  const [todayClasses, setTodayClasses] = useState([]);
  const [testCount, setTestCount] = useState(0);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(
          "https://www.scratchprod.in/resume-generator-backend/api/teachers",
        );

        const allTeachers = res.data.data || [];

        const foundTeacher = allTeachers.find(
          (t) =>
            t.email?.toLowerCase() === loggedInUser?.email?.toLowerCase() ||
            t.id === loggedInUser?.id,
        );

        setTeacher(foundTeacher || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser) fetchTeacher();
  }, [loggedInUser]);

  useEffect(() => {
    if (!teacher?.name) return;

    getAllTimetables()
      .then((res) => {
        const teacherData = res.data.filter(
          (t) => t.teacher_name.toLowerCase() === teacher.name.toLowerCase(),
        );

        setTimetables(teacherData);

        const todayData = teacherData.filter((t) => t.day === today);
        setTodayClasses(todayData);
      })
      .catch(console.error);

    getStudentsForTeacher(teacher.name)
      .then((res) => setStudents(res.data.students || []))
      .catch(console.error);

    getExamScores(teacher.name)
      .then((res) => {
        const uniqueTests = new Set(res.data.map((e) => e.test_name));
        setTestCount(uniqueTests.size);
      })
      .catch(console.error);
  }, [teacher]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!teacher) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography>Teacher not found</Typography>
      </Box>
    );
  }

  const subjectsCount = new Set(timetables.map((t) => t.subject_name)).size;

  const stats = [
    {
      label: "Subjects",
      value: subjectsCount,
      icon: <SchoolIcon />,
      color: "#4F46E5",
    },
    {
      label: "Students",
      value: students.length,
      icon: <PeopleIcon />,
      color: "#22C55E",
    },
    {
      label: "Tests",
      value: testCount,
      icon: <EmojiEventsIcon />,
      color: "#F59E0B",
    },
    {
      label: "Classes",
      value: todayClasses.length,
      icon: <CalendarTodayIcon />,
      color: "#EC4899",
    },
  ];

  return (
    <Box sx={{ p: 2, background: "#f5f7fb" }}>
      {/* 🔥 Gradient Header */}
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
        {/* 🌊 Wave */}
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

        {/* Content */}
        <Typography
          variant="h5"
          sx={{ color: "#fff", fontWeight: 600, position: "relative" }}
        >
          Teacher Dashboard
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#fff", opacity: 0.9, position: "relative" }}
        >
          Welcome back, {teacher.name}
        </Typography>
      </Box>

      {/* 📊 Stats */}
      <Grid container spacing={2} mb={3}>
        {stats.map((item, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={i}
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
        {/* Schedule */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight="bold" mb={2}>
              Today’s Schedule ({today})
            </Typography>

            {todayClasses.length === 0 ? (
              <Typography color="text.secondary">No classes today</Typography>
            ) : (
              todayClasses.map((cls) => (
                <Box
                  key={cls.id}
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    background: "#EEF2FF",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "100%",
                      width: 750,
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#4F46E5",
                    }}
                  >
                    {cls.time}
                  </Box>

                  <Box>
                    <Typography fontWeight="bold">
                      {cls.subject_name}
                    </Typography>
                    <Typography variant="body2">
                      {cls.department} - {cls.year}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Paper>
        </Grid>

        {/* Activity */}
        <Grid
          item
          xs={12}
          md="auto"
          sx={{
            width: { md: 250 },
          }}
        >
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight="bold" mb={2}>
              Recent Activity
            </Typography>

            <Box mb={2}>
              <Typography fontWeight="bold">Tests Conducted</Typography>
              <Typography variant="body2" color="text.secondary">
                {testCount} tests created
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box mb={2}>
              <Typography fontWeight="bold">Students</Typography>
              <Typography variant="body2" color="text.secondary">
                {students.length} students assigned
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box>
              <Typography fontWeight="bold">Today’s Classes</Typography>
              <Typography variant="body2" color="text.secondary">
                {todayClasses.length} classes scheduled
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherHomePage;
