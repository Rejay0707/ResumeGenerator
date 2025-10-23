import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllTimetables } from "../services/api";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const TeacherTimetable = () => {
  const teacher = useSelector((state) => state.auth.user);
  const [timetables, setTimetables] = useState([]);

  // Get today's weekday
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    if (teacher?.name) {
      getAllTimetables()
        .then((response) => {
          // Filter timetable only for this teacher
          const teacherData = response.data.filter(
            (t) => t.teacher_name.toLowerCase() === teacher.name.toLowerCase()
          );

          // Sort by day of the week (Monday first, then Tuesday, etc.)
          const dayOrder = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
            Sunday: 7,
          };
          teacherData.sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);

          setTimetables(teacherData);
        })
        .catch((err) => console.error("Error fetching timetables:", err));
    }
  }, [teacher]);

  return (
    <Box p={3} sx={{ backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        📅 Teacher Timetable
      </Typography>

      {timetables.length === 0 ? (
        <Typography>No timetable available.</Typography>
      ) : (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Class</strong></TableCell>
                <TableCell><strong>Subject</strong></TableCell>
                <TableCell><strong>Day</strong></TableCell>
                <TableCell><strong>Time</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timetables.map((row) => {
                const isToday = row.day === today;
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor: isToday ? "#E3F2FD" : "transparent", // Highlight today's class
                    }}
                  >
                    <TableCell>{`${row.department} - ${row.year}`}</TableCell>
                    <TableCell>{row.subject_name}</TableCell>
                    <TableCell>{row.day}</TableCell>
                    <TableCell>{row.time}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default TeacherTimetable;