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
} from "@mui/material";
import { useSelector } from "react-redux";
import { getAllTimetables } from "../services/api";

const Subjects = () => {
  const teacher = useSelector((state) => state.auth.user);
  const [subjectsByYear, setSubjectsByYear] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (teacher?.name) {
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
  }, [teacher]);

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
