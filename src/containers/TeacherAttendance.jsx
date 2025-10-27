
import React, { useEffect, useState } from "react";
import { getStudentsForTeacher, getAllTimetables } from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { saveAttendanceAsync, fetchAttendanceAsync, clearAttendanceState } from "../features/attendanceSlice";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Alert,
  TextField,
  IconButton,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import axios from "axios"; // Add this import for API calls

const TeacherAttendance = () => {
  const teacher = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { loading, success, error, records } = useSelector((state) => state.attendance);

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [groupedStudents, setGroupedStudents] = useState({});
  const [attendance, setAttendance] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [timetables, setTimetables] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [times, setTimes] = useState([]);
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

  // Fetch students on mount if teacher is verified
  useEffect(() => {
    if (teacherVerified && teacher?.name) {
      getStudentsForTeacher(teacher.name)
        .then((response) => {
          const studentData = response.data.students || [];
          setStudents(studentData);
          setClasses(response.data.classes || []);
          const grouped = studentData.reduce((acc, s) => {
            const key = s.year || "Unknown Year";
            if (!acc[key]) acc[key] = [];
            acc[key].push(s);
            return acc;
          }, {});
          setGroupedStudents(grouped);
        })
        .catch((err) => console.error("Error fetching students:", err));
    }
  }, [teacherVerified, teacher]);

  // Fetch timetable data for this teacher if verified
  useEffect(() => {
    if (teacherVerified && teacher?.name) {
      getAllTimetables()
        .then((response) => {
          const data = response.data;
          const teacherData = data.filter(
            (t) =>
              t.teacher_name &&
              t.teacher_name.toLowerCase() === teacher.name.toLowerCase()
          );
          setTimetables(teacherData);
        })
        .catch((err) => console.error("Error fetching timetables:", err));
    }
  }, [teacherVerified, teacher]);

  // Dynamically filter subjects based on selected class
  useEffect(() => {
    if (selectedClass && timetables.length > 0) {
      const [department, year] = selectedClass.split(" - ");
      const relatedSubjects = timetables
        .filter(
          (t) => t.department === department && t.year === year
        )
        .map((t) => t.subject_name);
      setSubjects([...new Set(relatedSubjects)]);
    } else {
      setSubjects([]);
    }
  }, [selectedClass, timetables]);

  // Dynamically filter times based on selected class, subject, and day
  useEffect(() => {
    if (selectedClass && subject && timetables.length > 0 && selectedDate) {
      const [department, year] = selectedClass.split(" - ");
      const day = new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" });
      const relatedTimes = timetables
        .filter(
          (t) =>
            t.department === department &&
            t.year === year &&
            t.subject_name === subject &&
            t.day === day
        )
        .map((t) => t.time);
      setTimes([...new Set(relatedTimes)].sort((a, b) => a.localeCompare(b)));
    } else {
      setTimes([]);
    }
  }, [selectedClass, subject, selectedDate, timetables]);

  // Fetch existing attendance when selections change and initialize attendance with all students as absent
  useEffect(() => {
    if (teacherVerified && selectedClass && subject && time && selectedDate) {
      const [department, year] = selectedClass.split(" - ");
      const filteredStudents = students.filter(
        (s) => s.department === department && s.year === year
      );
      const initialAttendance = {};
      filteredStudents.forEach((s) => {
        initialAttendance[s.id] = false; // Initialize all as absent
      });
      setAttendance(initialAttendance);
      dispatch(fetchAttendanceAsync({
        teacher_id: teacher?.id,
        department,
        year,
        subject,
        time,
        date: selectedDate,
      }));
    } else {
      setAttendance({});
    }
  }, [teacherVerified, selectedClass, subject, time, selectedDate, teacher?.id, dispatch, students]);

  // Populate attendance state from fetched records
  useEffect(() => {
    if (records && records.length > 0) {
      const [department, year] = selectedClass.split(" - ") || ["", ""];
      const filteredRecords = records.filter(
        (r) =>
          r.department === department &&
          r.year === year &&
          r.subject === subject &&
          r.time === time &&
          r.date === selectedDate
      );
      setAttendance((prev) => {
        const updatedAttendance = { ...prev };
        filteredRecords.forEach((record) => {
          record.attendance.forEach((att) => {
            updatedAttendance[att.student_id] = att.status === "present";
          });
        });
        return updatedAttendance;
      });
    }
  }, [records, selectedClass, subject, time, selectedDate]);

  // Toggle present/absent
  const handleToggle = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Save attendance
  const handleSave = () => {
    if (!selectedClass || !subject || !time || !selectedDate) {
      alert("Please select class, subject, time, and date.");
      return;
    }

    const [department, year] = selectedClass.split(" - ");
    const filteredStudents = students.filter(
      (s) => s.department === department && s.year === year
    );

    const formattedAttendance = filteredStudents.map((s) => ({
      student_id: s.id,
      status: attendance[s.id] ? "present" : "absent",
    }));

    const attendanceData = {
      teacher_id: teacher.id,
      department,
      year,
      subject,
      time,
      date: selectedDate,
      attendance: formattedAttendance,
    };

    dispatch(saveAttendanceAsync(attendanceData));
  };

  // Clear success/error after save and refetch attendance on success
  useEffect(() => {
    if (success) {
      // Refetch attendance after successful save
      const [department, year] = selectedClass.split(" - ");
      dispatch(fetchAttendanceAsync({
        teacher_id: teacher?.id,
        department,
        year,
        subject,
        time,
        date: selectedDate,
      }));
    }
    if (success || error) {
      const timer = setTimeout(() => dispatch(clearAttendanceState()), 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch, selectedClass, subject, time, selectedDate, teacher?.id]);

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

  const [department, year] = selectedClass.split(" - ") || ["", ""];
  const filteredRecords = records.filter(
    (r) =>
      r.department === department &&
      r.year === year &&
      r.subject === subject &&
      r.time === time &&
      r.date === selectedDate
  );
  const attendanceExists = filteredRecords.length > 0;

  const studentsForSelectedClass = groupedStudents[year]?.filter(
    (s) => s.department === department
  ) || [];

  return (
    <Box
      p={3}
      sx={{
        backgroundColor: "#f5f5f5",
        // minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#1976d2", fontWeight: "bold" }}>
        👩‍🏫 Teacher Attendance
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>Attendance saved successfully!</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Teacher Details */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: "#ffffff" }}>
        <Typography variant="h6" gutterBottom>Teacher Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography><strong>Name:</strong> {teacher?.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography><strong>Email:</strong> {teacher?.email}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Class / Subject / Time / Date Selection */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "#1976d2", fontWeight: "bold" }}>
          Mark Attendance For
        </Typography>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#ffffff", border: "1px solid #ddd", borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)", "&:hover": { boxShadow: "0 4px 8px rgba(0,0,0,0.15)" }, minHeight: 56, width: 250 }}>
              <InputLabel>Class</InputLabel>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                label="Class"
              >
                {classes.map((c, index) => (
                  <MenuItem key={index} value={`${c.department} - ${c.year}`}>
                    {c.department} - {c.year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#ffffff", border: "1px solid #ddd", borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)", "&:hover": { boxShadow: "0 4px 8px rgba(0,0,0,0.15)" }, minHeight: 56, width: 250 }}>
              <InputLabel>Subject</InputLabel>
              <Select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                label="Subject"
              >
                {subjects.length > 0 ? (
                  subjects.map((sub, index) => (
                    <MenuItem key={index} value={sub}>
                      {sub}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No subjects found</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#ffffff", border: "1px solid #ddd", borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)", "&:hover": { boxShadow: "0 4px 8px rgba(0,0,0,0.15)" }, minHeight: 56, width: 250 }}>
              <InputLabel>Time</InputLabel>
              <Select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                label="Time"
              >
                {times.length > 0 ? (
                  times.map((t, index) => (
                    <MenuItem key={index} value={t}>
                      {t}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No timing found</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              variant="outlined"
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1, minHeight: 56, width: 250 }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1"><strong>Class:</strong> {selectedClass || "Not selected"}</Typography>
          <Typography variant="body1"><strong>Subject:</strong> {subject || "Not selected"}</Typography>
          <Typography variant="body1"><strong>Time:</strong> {time || "Not selected"}</Typography>
          <Typography variant="body1"><strong>Date:</strong> {selectedDate ? new Date(selectedDate).toLocaleDateString() : "Not selected"}</Typography>
        </Box>
        {attendanceExists && (
          <Typography variant="body2" sx={{ mt: 2, color: "#4caf50", fontWeight: "medium" }}>
            Attendance already exists for this selection. Loaded and displayed below.
          </Typography>
        )}
      </Paper>

      {/* Student List */}
      <Paper elevation={3} sx={{ p: 3, backgroundColor: "#ffffff" }}>
        <Typography variant="h6" gutterBottom>Student List</Typography>
        <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
          {studentsForSelectedClass.length > 0 ? (
            <List>
              {studentsForSelectedClass.map((s) => (
                <ListItem key={s.id} sx={{ borderBottom: "1px solid #eee" }}>
                  <ListItemText
                    primary={s.name}
                    secondary={`Admission No: ${s.admission_no} | Father: ${s.father_name} | DOB: ${new Date(s.dob).toLocaleDateString()}`}
                  />
                  <IconButton onClick={() => handleToggle(s.id)}>
                    {attendance[s.id] ? <CheckCircle color="success" /> : <Cancel color="error" />}
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="textSecondary">Please select a class, subject, time, and date.</Typography>
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, px: 4 }}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Attendance"}
        </Button>
      </Paper>
    </Box>
  );
};

export default TeacherAttendance;




