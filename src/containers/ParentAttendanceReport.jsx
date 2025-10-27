import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

export default function ParentAttendanceReport() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let hasFetched = false;

    const fetchGuardianIdAndAttendances = async () => {
      if (hasFetched) return; // prevent duplicate fetch
      hasFetched = true;

      try {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));

        const guardiansRes = await axios.get(
          "https://www.scratchprod.in/resume-generator-backend/api/guardians"
        );
        const guardians = guardiansRes.data.data;

        const guardian = guardians.find(
          (g) => g.email.toLowerCase() === loggedInUser.email.toLowerCase()
        );

        if (guardian) {
          const attendancesRes = await axios.get(
            `https://www.scratchprod.in/resume-generator-backend/api/guardians/${guardian.id}/attendances`
          );
          setData(attendancesRes.data);
        } else {
          setError("Guardian not found for logged-in user");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuardianIdAndAttendances();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Typography>No data available.</Typography>;

  const { attendances } = data;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Children's Attendance Report
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendances.map((attendance, index) => (
              <TableRow key={index}>
                <TableCell>{attendance.student_name}</TableCell>
                <TableCell>{attendance.department}</TableCell>
                <TableCell>{attendance.year}</TableCell>
                <TableCell>{attendance.subject}</TableCell>
                <TableCell>{new Date(attendance.date).toLocaleDateString()}</TableCell>
                <TableCell>{attendance.time}</TableCell>
                <TableCell>{attendance.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
