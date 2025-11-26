import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

export default function ParentPerformance() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let hasFetched = false;

    const fetchGuardianIdAndExamScores = async () => {
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

  // Extract students and test data
  const { linked_students, exam_scores } = data;

  // Create unique column keys using test_name + subject
  const uniqueTestKeys = [
    ...new Set(
      exam_scores.map((es) => `${es.test_name} - ${es.subject}`)
    ),
  ];

  // Prepare structure: studentScores[student][columnKey] = score
  const studentScores = {};
  linked_students.forEach((student) => {
    studentScores[student] = {};
    uniqueTestKeys.forEach((key) => {
      studentScores[student][key] = null;
    });
  });

  // Fill the scores
  exam_scores.forEach((es) => {
    const key = `${es.test_name} - ${es.subject}`;

    es.scores.forEach((score) => {
      if (studentScores[score.student_name]) {
        studentScores[score.student_name][key] = score.score;
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
              <TableCell><b>Student Name</b></TableCell>
              {uniqueTestKeys.map((key) => (
                <TableCell key={key}><b>{key}</b></TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {linked_students.map((student) => (
              <TableRow key={student}>
                <TableCell>{student}</TableCell>

                {uniqueTestKeys.map((key) => (
                  <TableCell key={key}>
                    {studentScores[student][key] !== null
                      ? studentScores[student][key]
                      : "N/A"}
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
