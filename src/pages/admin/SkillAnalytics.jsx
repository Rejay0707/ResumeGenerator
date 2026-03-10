// src/pages/SkillAnalytics.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDepartmentSkills,
  fetchYearSkills,
} from "../../features/adminSlice";

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: "14px", fontWeight: "bold" }}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const SkillAnalytics = () => {
  const dispatch = useDispatch();
  const { departmentSkills, yearSkills, loading } = useSelector(
    (state) => state.admin,
  );

  const [activeTab, setActiveTab] = useState(0); // 0: Department, 1: Year
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  useEffect(() => {
    dispatch(fetchDepartmentSkills());
    dispatch(fetchYearSkills());
  }, [dispatch]);

  // Extract unique departments and years for filters
  const departments = [
    "All",
    ...new Set(departmentSkills.map((item) => item.department)),
  ];
  const years = ["All", ...new Set(yearSkills.map((item) => item.year))];

  // Filter Data
  const filteredDeptData =
    selectedDept === "All"
      ? departmentSkills
      : departmentSkills.filter((item) => item.department === selectedDept);

  const filteredYearData =
    selectedYear === "All"
      ? yearSkills
      : yearSkills.filter((item) => item.year === selectedYear);

  // Prepare Chart Data (Top 5 Skills)
  const getTopSkillsData = (data) => {
    const skillMap = {};
    data.forEach((item) => {
      const score = parseFloat(item.skill_score.replace("%", ""));
      if (!skillMap[item.skill]) {
        skillMap[item.skill] = 0;
      }
      skillMap[item.skill] += score;
    });
    return Object.entries(skillMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  const deptChartData = getTopSkillsData(filteredDeptData);
  const yearChartData = getTopSkillsData(filteredYearData);

  const pieColors = [
    "#42a5f5",
    "#66bb6a",
    "#ffb74d",
    "#ba68c8",
    "#ef5350",
    "#26c6da",
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 2, sm: 3, md: 5 },
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Typography variant="h4" fontWeight="700" mb={4}>
        Skill Analytics Dashboard
      </Typography>

      {/* KPI CARDS */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography color="text.secondary">
              Total Skills Recorded
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {departmentSkills.length + yearSkills.length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 4 }}>
            <Typography color="text.secondary">Departments</Typography>
            <Typography variant="h4" fontWeight="bold">
              {departments.length - 1}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 4 }}>
            <Typography color="text.secondary">Academic Years</Typography>
            <Typography variant="h4" fontWeight="bold">
              {years.length - 1}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* FILTER SECTION */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedDept}
                label="Department"
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                label="Year"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* TAB SWITCH */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="fullWidth"
        >
          <Tab label="Department Analytics" />
          <Tab label="Year Analytics" />
        </Tabs>
      </Box>

      {/* CHARTS */}
      <Grid container spacing={4} mb={5}>
        {/* BAR CHART */}
        <Grid item xs={12} lg={7}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 4,
              height: 450,
              width: 450,
            }}
          >
            <Typography variant="h6" mb={2}>
              Top Performing Skills
            </Typography>

            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={activeTab === 0 ? deptChartData : yearChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1976d2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* PIE CHART */}
        <Grid item xs={12} lg={5}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 4,
              height: 450,
              width: 450,
            }}
          >
            <Typography variant="h6" mb={2}>
              Skill Distribution
            </Typography>

            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={activeTab === 0 ? deptChartData : yearChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {(activeTab === 0 ? deptChartData : yearChartData).map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ),
                  )}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* TABLE */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Detailed Skill Breakdown
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Department / Year</strong>
                </TableCell>
                <TableCell>
                  <strong>Skill</strong>
                </TableCell>
                <TableCell>
                  <strong>Total Students</strong>
                </TableCell>
                <TableCell>
                  <strong>Skill Score</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(activeTab === 0 ? filteredDeptData : filteredYearData).map(
                (item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Chip
                        label={activeTab === 0 ? item.department : item.year}
                        color="primary"
                        size="small"
                      />
                    </TableCell>

                    <TableCell>{item.skill}</TableCell>

                    <TableCell>{item.total_students || "N/A"}</TableCell>

                    <TableCell>
                      <Chip
                        label={item.skill_score}
                        color={
                          parseFloat(item.skill_score.replace("%", "")) > 20
                            ? "success"
                            : "default"
                        }
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default SkillAnalytics;
