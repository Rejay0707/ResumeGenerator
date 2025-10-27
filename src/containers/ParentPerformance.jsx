import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

export default function ParentPerformance() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let hasFetched = false;

    const fetchGuardianIdAndExamScores = async () => {
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
          const scoresRes = await axios.get(
            `https://www.scratchprod.in/resume-generator-backend/api/guardians/${guardian.id}/exam-scores`
          );
          setData(scoresRes.data);
        } else {
          setError("Guardian not found for logged-in user");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuardianIdAndExamScores();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Typography>No data available.</Typography>;

  // Process the data to group scores by student and tests
  const { linked_students, exam_scores } = data;

  // Get all unique test names for columns
  const testNames = [...new Set(exam_scores.map((es) => es.test_name))];

  // Initialize a map for student scores: { studentName: { testName: score } }
  const studentScores = {};
  linked_students.forEach((student) => {
    studentScores[student] = {};
    testNames.forEach((test) => {
      studentScores[student][test] = null; // Default to null if no score
    });
  });

  // Populate the scores
  exam_scores.forEach((es) => {
    es.scores.forEach((score) => {
      if (studentScores[score.student_name]) {
        studentScores[score.student_name][es.test_name] = score.score;
      }
    });
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Children's Exam Scores
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              {testNames.map((test) => (
                <TableCell key={test}>{test}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {linked_students.map((student) => (
              <TableRow key={student}>
                <TableCell>{student}</TableCell>
                {testNames.map((test) => (
                  <TableCell key={test}>
                    {studentScores[student][test] !== null ? studentScores[student][test] : 'N/A'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
