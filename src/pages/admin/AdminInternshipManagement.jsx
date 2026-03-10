import React, { useState } from "react";
import { Box, Typography, MenuItem, Select, Paper } from "@mui/material";
import useAdminManagement from "../../containers/AdminManagement";
import InternshipTable from "../../components/internship/InternshipTable";
import api from "../../services/api";

export default function AdminInternshipManagement() {
  const { items: students } = useAdminManagement("students");

  const [selectedStudent, setSelectedStudent] = useState("");
  const [internships, setInternships] = useState([]);

  const handleStudentChange = async (event) => {
  const studentId = event.target.value;
  setSelectedStudent(studentId);

  try {
    const res = await api.get("/api/internships/tracker", {
      params: { student_id: studentId }, // ✅ updated
    });

    setInternships(res.data);
  } catch (error) {
    console.error("Failed to fetch internships", error);
  }
};

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Internship Management
      </Typography>

      <Select
        fullWidth
        value={selectedStudent}
        onChange={handleStudentChange}
        displayEmpty
      >
        <MenuItem value="">Select Student</MenuItem>
        {students.map((student) => (
          <MenuItem key={student.id} value={student.id}>
            {student.name}
          </MenuItem>
        ))}
      </Select>

      {selectedStudent && (
        <Paper sx={{ mt: 3 }}>
          <InternshipTable data={internships} isAdmin={true} />
        </Paper>
      )}
    </Box>
  );
}
