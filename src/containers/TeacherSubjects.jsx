import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getAllTimetables } from "../services/api";
import axios from "axios"; // Add this import for API calls

const Subjects = () => {
  const teacher = useSelector((state) => state.auth.user);
  const [subjectsByYear, setSubjectsByYear] = useState({});
  const [loading, setLoading] = useState(true);
  const [teacherVerified, setTeacherVerified] = useState(false);
  const [verificationError, setVerificationError] = useState(null);

  // Verify teacher email on mount
  useEffect(() => {
    const verifyTeacher = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedInUser || !loggedInUser.email) {
          setVerificationError("No logged-in user found");
          return;
        }

        const teachersRes = await axios.get("https://www.scratchprod.in/resume-generator-backend/api/teachers");
        const teachers = teachersRes.data.data || teachersRes.data;

        const verifiedTeacher = teachers.find(
          (t) => t.email.toLowerCase() === loggedInUser.email.toLowerCase()
        );

        if (verifiedTeacher) {
          setTeacherVerified(true);
        } else {
          setVerificationError("Teacher not found for logged-in user");
        }
      } catch (err) {
        setVerificationError("Error verifying teacher: " + err.message);
      }
    };

    verifyTeacher();
  }, []);

  useEffect(() => {
    if (teacherVerified && teacher?.name) {
      setLoading(true);
      getAllTimetables()
        .then((response) => {
          const data = response.data || [];

          // Filter only this teacher’s subjects
          const teacherSubjects = data.filter(
            (item) =>
              item.teacher_name &&
              item.teacher_name.toLowerCase() === teacher.name.toLowerCase()
          );

          // Group subjects by year
          const grouped = teacherSubjects.reduce((acc, curr) => {
            if (!acc[curr.year]) acc[curr.year] = [];
            acc[curr.year].push(curr);
            return acc;
          }, {});

          setSubjectsByYear(grouped);
        })
        .catch((err) => console.error("Error fetching subjects:", err))
        .finally(() => setLoading(false));
    }
  }, [teacherVerified, teacher]);

  if (verificationError) {
    return (
      <Box p={3}>
        <Alert severity="error">{verificationError}</Alert>
      </Box>
    );
  }

  if (!teacherVerified) {
    return (
      <Box p={3}>
        <Typography>Verifying teacher...</Typography>
      </Box>
    );
  }

  // ✅ Show loader while fetching
  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3} sx={{ backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        📘 Subjects
      </Typography>

      {Object.keys(subjectsByYear).length > 0 ? (
        Object.keys(subjectsByYear).map((year) => (
          <Paper key={year} elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 1 }}>
              {year} Subjects
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List>
              {subjectsByYear[year].map((subj, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={subj.subject_name}
                    secondary={`${subj.department} | ${subj.day} | ${subj.time}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))
      ) : (
        <Typography color="textSecondary">No subjects found.</Typography>
      )}
    </Box>
  );
};

export default Subjects;

