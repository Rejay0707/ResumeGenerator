import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, Grid, Card, CardContent, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom"; // Assuming React Router is used
import axios from "axios";

export default function ParentHomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guardianData, setGuardianData] = useState(null);
  const [summary, setSummary] = useState({ childrenCount: 0, recentAttendance: [], topScore: null });

  useEffect(() => {
    let hasFetched = false;

    const fetchGuardianSummary = async () => {
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
          setGuardianData(guardian);

          // Fetch a small summary: e.g., attendances and scores for quick stats
          const [attendancesRes, scoresRes] = await Promise.all([
            axios.get(`https://www.scratchprod.in/resume-generator-backend/api/guardians/${guardian.id}/attendances`),
            axios.get(`https://www.scratchprod.in/resume-generator-backend/api/guardians/${guardian.id}/exam-scores`)
          ]);

          const attendances = attendancesRes.data.attendances;
          const examScores = scoresRes.data.exam_scores;

          // Calculate summaries
          const childrenCount = attendancesRes.data.linked_students.length;
          const recentAttendance = attendances.slice(-3); // Last 3 records
          const allScores = examScores.flatMap(es => es.scores.map(s => s.score));
          const topScore = allScores.length > 0 ? Math.max(...allScores) : null;

          setSummary({ childrenCount, recentAttendance, topScore });
        } else {
          setError("Guardian not found for logged-in user");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuardianSummary();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
        Welcome, {guardianData ? guardianData.name : "Parent"}!
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: 'primary.main' }}>
        Here's a quick overview of your children's activities.
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{width:'200px'}}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Children</Typography>
              <Typography variant="h4">{summary.childrenCount}</Typography>
              <Typography>Linked Students</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{width:'200px'}}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Recent Attendance</Typography>
              <Typography variant="body2">
                {summary.recentAttendance.length > 0
                  ? `${summary.recentAttendance.filter(a => a.status === 'present').length} present out of ${summary.recentAttendance.length}`
                  : "No recent data"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{width:'200px'}}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Top Score</Typography>
              <Typography variant="h4">{summary.topScore || "N/A"}</Typography>
              <Typography>Highest Exam Score</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Navigation Buttons */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
          Explore Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" style={{width:'200px'}} component={Link} to="/parent/dashboard/children">
              View Children
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" style={{width:'200px'}} component={Link} to="/parent/dashboard/performance">
              View Performance
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" style={{width:'200px'}} component={Link} to="/parent/dashboard/attendance-report">
              View Attendance
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" style={{width:'200px'}} component={Link} to="/parent/dashboard/profile">
              View Profile
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Optional: Recent Activities Snippet */}
      {summary.recentAttendance.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Recent Attendance
          </Typography>
          <Paper sx={{ p: 2 }}>
            {summary.recentAttendance.map((att, index) => (
              <Typography key={index} variant="body2">
                {att.student_name} - {att.subject} on {new Date(att.date).toLocaleDateString()}: {att.status}
              </Typography>
            ))}
          </Paper>
        </Box>
      )}
    </Box>
  );
}
