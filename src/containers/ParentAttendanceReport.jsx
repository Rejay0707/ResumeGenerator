
import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

export default function ParentAttendanceReport() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let hasFetched = false;

    const fetchGuardianIdAndAttendances = async () => {
      if (hasFetched) return;
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
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        
      }}
    >
      <Paper
        sx={{
          p: { xs: 2, md: 3 },
        
          boxSizing: "border-box",
          overflowX: "auto",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
            mb: 2,
          }}
        >
          My Children's Attendance Report
        </Typography>

        <TableContainer
          sx={{
            
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              height: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: "8px",
            },
            // 🟣 MEDIA QUERY — below 935px, shrink table font + padding
            "@media (max-width: 935px)": {
              "& table": {
                fontSize: "0.8rem",
              },
              "& th, & td": {
                padding: "4px 6px",
                whiteSpace: "nowrap",
              },
            },
            // 🟣 MEDIA QUERY — below 600px, stack data vertically
            "@media (max-width: 600px)": {
              "& table, & thead, & tbody, & th, & td, & tr": {
                display: "block",
              },
              "& thead": {
                display: "none",
              },
              "& tr": {
                marginBottom: "10px",
                borderBottom: "2px solid #f0f0f0",
                padding: "6px",
              },
              "& td": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 8px",
                borderBottom: "1px solid #eee",
              },
              "& td::before": {
                content: "attr(data-label)",
                fontWeight: 600,
              },
            },
          }}
        >
          <Table >
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
                  <TableCell data-label="Student Name">
                    {attendance.student_name}
                  </TableCell>
                  <TableCell data-label="Department">
                    {attendance.department}
                  </TableCell>
                  <TableCell data-label="Year">{attendance.year}</TableCell>
                  <TableCell data-label="Subject">{attendance.subject}</TableCell>
                  <TableCell data-label="Date">
                    {new Date(attendance.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell data-label="Time">{attendance.time}</TableCell>
                  <TableCell data-label="Status">{attendance.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

