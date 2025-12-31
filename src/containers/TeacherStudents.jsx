import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTimetables,
  getStudentsForTeacher,
  getExamScores,
} from "../services/api";
import { saveExamScoresAsync, resetExamStatus } from "../features/examSlice";
import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import axios from "axios"; // Add this import for API calls

const TeacherExamScores = () => {
  const teacher = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.exam);

  const [timetables, setTimetables] = useState([]);
  const [loadingTimetable, setLoadingTimetable] = useState(true);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [testName, setTestName] = useState("");
  const [scores, setScores] = useState({}); // { studentId: score }
  const [previousLoaded, setPreviousLoaded] = useState(false);
  const [existingScores, setExistingScores] = useState([]);
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
    if (teacherVerified && teacher?.id) {
      getExamScores(teacher.id)
        .then((data) => {
          setExistingScores(data?.data || []); // assuming response like { data: [...] }
        })
        .catch((err) => console.error("Error fetching exam scores:", err));
    }
  }, [teacherVerified, teacher, success]); // reload when save success

  // Fetch timetable on mount if verified
  useEffect(() => {
    if (teacherVerified && teacher?.name) {
      getAllTimetables()
        .then((response) => {
          const data = response.data.filter(
            (t) => t.teacher_name.toLowerCase() === teacher.name.toLowerCase()
          );
          setTimetables(data);
          setLoadingTimetable(false);

          // Extract unique departments and years
          const uniqueDepartments = [
            ...new Set(data.map((t) => t.department)),
          ];
          setDepartments(uniqueDepartments);

          const uniqueYears = [...new Set(data.map((t) => t.year))];
          setYears(uniqueYears);
        })
        .catch((err) => console.error("Error fetching timetables:", err));
    }
  }, [teacherVerified, teacher]);

  // Fetch students on mount if verified
  useEffect(() => {
  if (teacherVerified && teacher?.name) {
    setLoadingStudents(true);
    getStudentsForTeacher(teacher.name)
      .then((response) => {
        const studentData = response.data.students || [];

        // const teacherCollege = teacher.college;

        // const sameCollegeStudents = studentData.filter(
        //   (s) =>
        //     s.college?.toLowerCase() === teacherCollege?.toLowerCase()
        // );

        setStudents(studentData);
        setLoadingStudents(false);
      })
      .catch((err) => console.error("Error fetching students:", err));
  }
}, [teacherVerified, teacher]);


  // Update subjects when department + year changes
  useEffect(() => {
    if (selectedDepartment && selectedYear) {
      const relatedSubjects = timetables
        .filter(
          (t) =>
            t.department === selectedDepartment && t.year === selectedYear
        )
        .map((t) => t.subject_name);
      setSubjects([...new Set(relatedSubjects)]);
      setSelectedSubject(""); // reset subject
      setTestName("");
      setPreviousLoaded(false);
      setScores({});
    } else {
      setSubjects([]);
    }
  }, [selectedDepartment, selectedYear, timetables]);

  // Update filtered students when department + year changes
  useEffect(() => {
    if (selectedDepartment && selectedYear && students.length > 0) {
      const relatedStudents = students.filter(
        (s) => s.department === selectedDepartment && s.year === selectedYear
      );
      setFilteredStudents(relatedStudents);

      const initialScores = {};
      relatedStudents.forEach((s) => (initialScores[s.id] = ""));
      setScores(initialScores);
    } else {
      setFilteredStudents([]);
      setScores({});
    }
  }, [selectedDepartment, selectedYear, students]);

  // Fetch previous exam scores when subject and test name selected
  useEffect(() => {
    const fetchPreviousScores = async () => {
      if (
        selectedDepartment &&
        selectedYear &&
        selectedSubject &&
        testName &&
        teacher?.id
      ) {
        try {
          const res = await getExamScores(
            teacher.id,
            selectedDepartment,
            selectedYear,
            selectedSubject,
            testName
          );

          if (res?.data?.scores?.length > 0) {
            const prevScores = {};
            res.data.scores.forEach((s) => {
              prevScores[s.student_id] = s.score;
            });
            setScores(prevScores);
            setPreviousLoaded(true);
          } else {
            setPreviousLoaded(false);
          }
        } catch (err) {
          console.error("Error fetching previous scores:", err);
        }
      }
    };

    fetchPreviousScores();
  }, [
    selectedDepartment,
    selectedYear,
    selectedSubject,
    testName,
    teacher?.id,
  ]);

  // Handle score change
  const handleScoreChange = (studentId, value) => {
    setScores((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  // Save scores
  const handleSave = () => {
    if (
      !selectedDepartment ||
      !selectedYear ||
      !selectedSubject ||
      !testName
    ) {
      alert("Please select department, year, subject, and test name.");
      return;
    }

    const scoreArray = filteredStudents.map((s) => ({
      student_id: s.id,
      student_name: s.name,
      score: Number(scores[s.id]) || 0,
    }));

    const payload = {
      teacher_id: teacher.id,
      department: selectedDepartment,
      year: selectedYear,
      subject: selectedSubject,
      test_name: testName,
      scores: scoreArray,
    };

    dispatch(saveExamScoresAsync(payload));
  };

  // Reset success/error after 5 sec
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(resetExamStatus()), 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

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

  return (
    <Box p={3} sx={{ backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#1976d2" }}>
        📝 Enter Exam Scores
      </Typography>

      {success && <Alert severity="success">Scores saved successfully!</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "#1976d2", fontWeight: "bold" }}>
          Select Details
        </Typography>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#ffffff", border: "1px solid #ddd", borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)", "&:hover": { boxShadow: "0 4px 8px rgba(0,0,0,0.15)" }, minHeight: 56, width: { xs: "100%", sm: 250 } }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                label="Department"
              >
                {loadingTimetable ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  departments.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#ffffff", border: "1px solid #ddd", borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)", "&:hover": { boxShadow: "0 4px 8px rgba(0,0,0,0.15)" }, minHeight: 56, width: { xs: "100%", sm: 250 } }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                label="Year"
              >
                {loadingTimetable ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  years.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#ffffff", border: "1px solid #ddd", borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)", "&:hover": { boxShadow: "0 4px 8px rgba(0,0,0,0.15)" }, minHeight: 56, width: { xs: "100%", sm: 250 } }}>
              <InputLabel>Subject</InputLabel>
              <Select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                label="Subject"
              >
                {!selectedDepartment || !selectedYear ? (
                  <MenuItem disabled>Select department & year first</MenuItem>
                ) : subjects.length > 0 ? (
                  subjects.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No subjects found</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Test Name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              variant="outlined"
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1, minHeight: 56, width: { xs: "100%", sm: 250 }}}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1"><strong>Department:</strong> {selectedDepartment || "Not selected"}</Typography>
          <Typography variant="body1"><strong>Year:</strong> {selectedYear || "Not selected"}</Typography>
          <Typography variant="body1"><strong>Subject:</strong> {selectedSubject || "Not selected"}</Typography>
          <Typography variant="body1"><strong>Test Name:</strong> {testName || "Not selected"}</Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Students
        </Typography>
        {filteredStudents.length === 0 ? (
          <Typography color="textSecondary">
            {selectedDepartment && selectedYear
              ? loadingStudents
                ? "Loading students..."
                : "No students found for this year."
              : "Select department and year to see students."}
          </Typography>
        ) : (
          <List>
            {filteredStudents.map((s) => (
              <ListItem key={s.id}>
                <ListItemText primary={s.name} />
                <TextField
                  label="Score"
                  type="number"
                  value={scores[s.id] || ""}
                  onChange={(e) => handleScoreChange(s.id, e.target.value)}
                  sx={{ width: "100px" }}
                />
              </ListItem>
            ))}
          </List>
        )}
        {previousLoaded && (
          <Typography sx={{ mt: 2, color: "green" }}>
            ✅ Previous scores loaded. You can edit and update.
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSave}
          disabled={loading || filteredStudents.length === 0}
        >
          {loading ? "Saving..." : previousLoaded ? "Update Scores" : "Save Scores"}
        </Button>
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
          📊 Existing Test Results
        </Typography>

        {existingScores.length === 0 ? (
          <Typography color="textSecondary">No test results found yet.</Typography>
        ) : (
          existingScores.map((test, idx) => (
            <Box key={idx} sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {test.test_name} — {test.subject} ({test.year}, {test.department})
              </Typography>
              <List dense>
                {test.scores.map((s, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={`${s.student_name}: ${s.score}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default TeacherExamScores;
