import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Divider, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  getAllTimetables,
  getStudentsForTeacher,
  getExamScores,
} from "../services/api";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";

const TeacherHomePage = () => {
  const loggedInUser = useSelector((state) => state.auth.user);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timetables, setTimetables] = useState([]);
  const [students, setStudents] = useState([]);
  const [todayClasses, setTodayClasses] = useState([]);
  const [testCount, setTestCount] = useState(0);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(
          "https://www.scratchprod.in/resume-generator-backend/api/teachers"
        );

        const allTeachers = res.data.data || [];
        const foundTeacher = allTeachers.find(
          (t) =>
            t.email?.toLowerCase() === loggedInUser?.email?.toLowerCase() ||
            t.id === loggedInUser?.id
        );

        setTeacher(foundTeacher || null);
      } catch (err) {
        console.error("Error fetching teacher data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser) fetchTeacher();
  }, [loggedInUser]);

  useEffect(() => {
    if (!teacher?.name) return;

    // ✅ Fetch all timetables for this teacher
    getAllTimetables()
      .then((res) => {
        const teacherData = res.data.filter(
          (t) => t.teacher_name.toLowerCase() === teacher.name.toLowerCase()
        );
        setTimetables(teacherData);

        // Filter today's classes
        const todayData = teacherData.filter((t) => t.day === today);
        setTodayClasses(todayData);
      })
      .catch((err) => console.error("Error fetching timetables:", err));

    // ✅ Fetch students
    getStudentsForTeacher(teacher.name)
      .then((res) => setStudents(res.data.students || []))
      .catch((err) => console.error("Error fetching students:", err));

    // ✅ Fetch exam scores
    getExamScores(teacher.name)
      .then((res) => {
        const uniqueTests = new Set(res.data.map((exam) => exam.test_name));
        setTestCount(uniqueTests.size);
      })
      .catch((err) => console.error("Error fetching exam scores:", err));
  }, [teacher]);

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
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
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="textSecondary">
          Teacher details not found.
        </Typography>
      </Box>
    );
  }

  // Stats
  const subjectsCount = new Set(timetables.map((t) => t.subject_name)).size;
  const studentsCount = students.length;

  const stats = [
    {
      label: "Subjects Taught",
      value: subjectsCount,
      icon: <SchoolIcon color="primary" fontSize="large" />,
    },
    {
      label: "Students",
      value: studentsCount,
      icon: <PeopleIcon color="success" fontSize="large" />,
    },
    {
      label: "Tests Conducted",
      value: testCount,
      icon: <EmojiEventsIcon color="warning" fontSize="large" />,
    },
  ];

  return (
    <Box p={3} sx={{ backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        👋 Welcome back, {teacher.name || "Teacher"}!
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Here’s your teaching overview for today.
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={2} sx={{ mb: 4, justifyContent: "center" }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                backgroundColor: "white",
                width: 250,
                mx: "auto",
              }}
            >
              {stat.icon}
              <Typography variant="h6" sx={{ mt: 1 }}>
                {stat.label}
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Today's Schedule */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{ color: "#1976d2", fontWeight: "bold", mb: 1 }}
        >
          🗓️ Today’s Schedule ({today})
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {todayClasses.length === 0 ? (
          <Typography color="textSecondary">
            No classes scheduled for today.
          </Typography>
        ) : (
          todayClasses.map((cls) => (
            <Paper
              key={cls.id}
              elevation={1}
              sx={{
                p: 2,
                mb: 1.5,
                borderRadius: 2,
                backgroundColor: "#E3F2FD",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {cls.subject_name}
              </Typography>
              <Typography variant="body2">
                {cls.department} - {cls.year}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {cls.time}
              </Typography>
            </Paper>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default TeacherHomePage;

