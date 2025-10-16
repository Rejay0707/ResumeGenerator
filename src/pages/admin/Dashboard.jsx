import React, { useMemo } from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAdminManagement from "../../containers/AdminManagement";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Import Recharts components

export default function Dashboard() {
  const { items: parents } = useAdminManagement("parents");
  const { items: teachers } = useAdminManagement("teachers");
  const { items: students } = useAdminManagement("students");
  

  const navigate = useNavigate();

  const stats = [
    {
      label: "Students",
      count: students.length,
      gradient: "linear-gradient(135deg, #42a5f5, #478ed1)",
    },
    {
      label: "Parents",
      count: parents.length,
      gradient: "linear-gradient(135deg, #66bb6a, #43a047)",
    },
    {
      label: "Teachers",
      count: teachers.length,
      gradient: "linear-gradient(135deg, #ffb74d, #f57c00)",
    },
  ];

  // Helper to get route based on label
  const getRoute = (label) => {
    switch (label) {
      case "Students":
        return "/admin/students";
      case "Parents":
        return "/admin/parents";
      case "Teachers":
        return "/admin/teachers";
      default:
        return "/admin/dashboard";
    }
  };

  // Charts Data
  // 1. Student Distribution by Class (group students by classSec)
const studentDistribution = useMemo(() => {
  if (!students || students.length === 0) return [];

  const classCounts = students.reduce((acc, student) => {
    // Use the correct backend field: class_sec
    const classKey = student.class_sec || "Unassigned";
    acc[classKey] = (acc[classKey] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(classCounts).map(([name, value]) => ({ name, value }));
}, [students]);



  // Colors for pie chart
  const pieColors = ["#42a5f5", "#66bb6a", "#ffb74d", "#ba68c8", "#ef5350", "#26c6da"];

  // 2. Teacher-Student Ratio (simple data for bar chart)
  const teacherStudentRatio = useMemo(() => {
    const ratio = teachers.length > 0 ? (students.length / teachers.length).toFixed(1) : 0;
    return [{ category: "Students per Teacher", value: parseFloat(ratio) }];
  }, [students.length, teachers.length]);

  return (
    <Box sx={{ width: "100%", p: { xs: 2, sm: 3, md: 5 } }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Admin Dashboard
      </Typography>

      {/* Existing Stats Cards */}
      <Grid container spacing={{ xs: 2, sm: 3, md: 5 }}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Paper
              elevation={4}
              aria-label={`${item.label} count card`}
              onClick={() => navigate(getRoute(item.label))}
              sx={{
                p: 3,
                borderRadius: 3,
                color: "white",
                background: item.gradient,
                textAlign: "center",
                height: "250px",
                width: "350px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "box-shadow 0.3s ease, transform 0.2s ease",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  transform: "scale(1.02)",
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 1, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }}
              >
                {item.label === "Students"
                  ? `Total number of students: ${students.length}`
                  : item.label === "Parents"
                  ? `Total number of parents: ${parents.length}`
                  : item.label === "Teachers"
                  ? `Total number of teachers: ${teachers.length}`
                  : item.count}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Analytics & Charts Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom fontWeight="600">
          Analytics & Charts
        </Typography>
        <Grid container spacing={3}>
          {/* Student Distribution by Class - Pie Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: '3px', borderRadius: 3, height: 400, width: "350px" }}>
              <Typography variant="h6" gutterBottom>
                Student Distribution by Class
              </Typography>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={studentDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {studentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Teacher-Student Ratio - Bar Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: '3px', borderRadius: 3, height: 400, width: "350px" }}>
              <Typography variant="h6" gutterBottom>
                Teacher-Student Ratio
              </Typography>
              <Typography variant="body2" gutterBottom>
                Average students per teacher: {teacherStudentRatio[0]?.value || 0}:1
              </Typography>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={teacherStudentRatio}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#42a5f5" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
