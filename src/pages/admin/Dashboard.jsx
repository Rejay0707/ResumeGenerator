// import React, { useMemo, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Typography, Grid, Paper, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// // import { fetchSubmissions } from "../../features/adminSlice";
// import { fetchDashboardStats } from "../../features/adminSlice";
// import { useDispatch } from "react-redux";
// import useAdminManagement from "../../containers/AdminManagement";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts"; // Import Recharts components

// export default function Dashboard() {
//   const { items: parents } = useAdminManagement("parents");
//   const { items: teachers } = useAdminManagement("teachers");
//   const { items: students } = useAdminManagement("students");

//   const navigate = useNavigate();

//   const admin = JSON.parse(localStorage.getItem("user"));
//   const adminCollege = admin?.college;

//   const dispatch = useDispatch();
//   // const submissions = useSelector((state) => state.admin.data.submissions);
//   const dashboard = useSelector((state) => state.admin.dashboard);

//   useEffect(() => {
//     dispatch(fetchDashboardStats());
//   }, [dispatch]);

//   // const pendingCount = submissions?.length || 0;
//   // console.log(pendingCount);

//   // Filter results by admin's college
//   const filteredStudents = students.filter((s) => s.college === adminCollege);
//   const filteredParents = parents.filter((p) => p.college === adminCollege);
//   const filteredTeachers = teachers.filter((t) => t.college === adminCollege);

//   const stats = [
//     {
//       label: "Students",
//       count: filteredStudents.length,
//       gradient: "linear-gradient(135deg, #42a5f5, #478ed1)",
//     },
//     {
//       label: "Parents",
//       count: filteredParents.length,
//       gradient: "linear-gradient(135deg, #66bb6a, #43a047)",
//     },
//     {
//       label: "Teachers",
//       count: filteredTeachers.length,
//       gradient: "linear-gradient(135deg, #ffb74d, #f57c00)",
//     },
//     {
//       label: "Active Portfolios",
//       count: dashboard?.kpis?.active_portfolios || 0,
//       gradient: "linear-gradient(135deg, #26c6da, #00838f)",
//     },
//     {
//       label: "Certificates Uploaded",
//       count: dashboard?.kpis?.certificates_uploaded || 0,
//       gradient: "linear-gradient(135deg, #66bb6a, #43a047)",
//     },
//     {
//       label: "Projects Uploaded",
//       count: dashboard?.kpis?.projects_uploaded || 0,
//       gradient: "linear-gradient(135deg, #ffb74d, #f57c00)",
//     },
//     {
//       label: "Internships Completed",
//       count: dashboard?.kpis?.internships_completed || 0,
//       gradient: "linear-gradient(135deg, #7e57c2, #5e35b1)",
//     },
//   ];

//   // Helper to get route based on label
//   const getRoute = (label) => {
//     switch (label) {
//       case "Students":
//         return "/admin/students";
//       case "Parents":
//         return "/admin/parents";
//       case "Teachers":
//         return "/admin/teachers";
//       case "Pending Submissions":
//         return "/admin/moderation";
//       default:
//         return "/admin/dashboard";
//     }
//   };

//   // Charts Data
//   // 1. Student Distribution by Class (group students by classSec)
//   const studentDistribution =
//     dashboard?.student_distribution?.students_by_year?.map((item) => ({
//       name: item.year,
//       value: item.count,
//     })) || [];

//   const submissionTypeData = dashboard
//     ? [
//         {
//           name: "Certificates",
//           value: dashboard?.kpis?.certificates_uploaded || 0,
//         },
//         {
//           name: "Projects",
//           value: dashboard?.kpis?.projects_uploaded || 0,
//         },
//         {
//           name: "Internships",
//           value: dashboard?.kpis?.internships_completed || 0,
//         },
//         {
//           name: "Active Portfolios",
//           value: dashboard?.kpis?.active_portfolios || 0,
//         },
//       ]
//     : [];

//   const topSkills =
//     dashboard?.skill_analytics?.top_skills?.slice(0, 5).map((item) => ({
//       name: item.skill,
//       value: item.total,
//     })) || [];

//   const internshipStatus =
//     dashboard?.internship_analytics?.status_breakdown?.map((item) => ({
//       name: item.approval_status,
//       value: item.total,
//     })) || [];

//   // Colors for pie chart
//   const pieColors = [
//     "#42a5f5",
//     "#66bb6a",
//     "#ffb74d",
//     "#ba68c8",
//     "#ef5350",
//     "#26c6da",
//   ];

//   // 2. Teacher-Student Ratio (simple data for bar chart)
//   const teacherStudentRatio = useMemo(() => {
//     const ratio =
//       filteredTeachers.length > 0
//         ? (filteredStudents.length / filteredTeachers.length).toFixed(1)
//         : 0;
//     return [{ category: "Students per Teacher", value: parseFloat(ratio) }];
//   }, [filteredStudents.length, filteredTeachers.length]);

//   // const submissionTypeData = useMemo(() => {
//   //   if (!submissions) return [];

//   //   const counts = submissions.reduce((acc, item) => {
//   //     acc[item.type] = (acc[item.type] || 0) + 1;
//   //     return acc;
//   //   }, {});

//   //   return Object.entries(counts).map(([name, value]) => ({
//   //     name,
//   //     value,
//   //   }));
//   // }, [submissions]);

//   return (
//     <Box sx={{ width: "100%", p: { xs: 2, sm: 3, md: 5 } }}>
//       <Typography variant="h4" gutterBottom fontWeight="600">
//         Admin Dashboard
//       </Typography>

//       {/* Existing Stats Cards */}
//       <Grid container spacing={{ xs: 2, sm: 3, md: 5 }}>
//         {stats.map((item) => (
//           <Grid
//             item
//             key={item.label}
//             sx={{
//               width: "500px",
//               maxWidth: "100%",
//             }}
//           >
//             <Paper
//               elevation={4}
//               aria-label={`${item.label} count card`}
//               onClick={() => navigate(getRoute(item.label))}
//               sx={{
//                 // p: 3,
//                 borderRadius: 3,
//                 color: "white",
//                 background: item.gradient,
//                 textAlign: "center",
//                 height: "250px",
//                 width: "100%",
//                 maxWidth: "500px",
//                 mx: "auto",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 transition: "box-shadow 0.3s ease, transform 0.2s ease",
//                 cursor: "pointer",
//                 "&:hover": {
//                   boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
//                   transform: "scale(1.02)",
//                 },
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 fontWeight="bold"
//                 sx={{ mb: 1, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
//               >
//                 {item.label}
//               </Typography>
//               <Typography
//                 variant="h4"
//                 fontWeight="bold"
//                 sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }}
//               >
//                 {item.label === "Students"
//                   ? `Total number of students: ${filteredStudents.length}`
//                   : item.label === "Parents"
//                     ? `Total number of parents: ${filteredParents.length}`
//                     : item.label === "Teachers"
//                       ? `Total number of teachers: ${filteredTeachers.length}`
//                       : item.label === "Active Portfolios"
//                         ? `Total active portfolios: ${item.count}`
//                         : item.label === "Certificates Uploaded"
//                           ? `Total certificates uploaded: ${item.count}`
//                           : item.label === "Projects Uploaded"
//                             ? `Total projects uploaded: ${item.count}`
//                             : item.label === "Internships Completed"
//                               ? `Total internships completed: ${item.count}`
//                               : item.label === "Pending Submissions"
//                                 ? `Total pending submissions: ${item.count}`
//                                 : `${item.count}`}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Analytics & Charts Section */}

//       <Box sx={{ mt: 5 }}>
//         <Typography variant="h5" gutterBottom fontWeight="600">
//           Analytics & Charts
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: { xs: 2, sm: 3, md: 5 },
//             alignItems: "center",
//           }}
//         >
//           {/* Student Distribution by Class - Pie Chart */}
//           <Paper
//             elevation={3}
//             sx={{
//               p: 1,
//               borderRadius: 3,
//               height: 400,
//               width: { xs: "100%", md: 500 }, // 100% on small, 500px on medium+
//               // mx: "auto",  // Centers each paper
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Student Distribution by Year
//             </Typography>
//             <ResponsiveContainer width="100%" height="80%">
//               <PieChart>
//                 <Pie
//                   data={studentDistribution}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {studentDistribution.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={pieColors[index % pieColors.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </Paper>

//           {/* Teacher-Student Ratio - Bar Chart */}
//           <Paper
//             elevation={3}
//             sx={{
//               p: 1,
//               borderRadius: 3,
//               height: 400,
//               width: { xs: "100%", md: 500 }, // 100% on small, 500px on medium+
//               // mx: "auto",  // Centers each paper
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Teacher-Student Ratio
//             </Typography>
//             <Typography variant="body2" gutterBottom>
//               Average students per teacher: {teacherStudentRatio[0]?.value || 0}
//               :1
//             </Typography>
//             <ResponsiveContainer width="100%" height="80%">
//               <BarChart data={teacherStudentRatio}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="category" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="value" fill="#42a5f5" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Paper>

//           <Paper
//             elevation={3}
//             sx={{
//               p: 1,
//               borderRadius: 3,
//               height: 400,
//               width: { xs: "100%", md: 500 },
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Completed & Active Overview
//             </Typography>

//             <ResponsiveContainer width="100%" height="80%">
//               <PieChart>
//                 <Pie data={submissionTypeData} dataKey="value" outerRadius={80}>
//                   {submissionTypeData.map((entry, index) => (
//                     <Cell
//                       key={`cell-sub-${index}`}
//                       fill={pieColors[index % pieColors.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </Paper>

//           <Paper
//             elevation={3}
//             sx={{
//               p: 1,
//               borderRadius: 3,
//               height: 400,
//               width: { xs: "100%", md: 500 },
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Top Skills
//             </Typography>

//             <ResponsiveContainer width="100%" height="80%">
//               <BarChart data={topSkills}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="value" fill="#7e57c2" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Paper>

//           {/* Internship Status - Pie Chart */}
//           <Paper
//             elevation={3}
//             sx={{
//               p: 1,
//               borderRadius: 3,
//               height: 400,
//               width: { xs: "100%", md: 500 },
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Internship Approval Status
//             </Typography>

//             <ResponsiveContainer width="100%" height="80%">
//               <PieChart>
//                 <Pie data={internshipStatus} dataKey="value" outerRadius={80}>
//                   {internshipStatus.map((entry, index) => (
//                     <Cell
//                       key={`cell-intern-${index}`}
//                       fill={pieColors[index % pieColors.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import axios from "axios";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [industryGap, setIndustryGap] = useState(null);

  useEffect(() => {
    fetchDashboard();
    fetchIndustryGap();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard");

      console.log("FULL API RESPONSE:", res);
      console.log("DATA:", res.data);

      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchIndustryGap = async () => {
    try {
      const res = await axios.get(
        "https://www.scratchprod.in/resume-generator-backend/api/industry-skill-gap",
      );

      console.log("Industry Skill Gap:", res.data);

      setIndustryGap(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return null;

  const dashboard = data?.dashboard || {};
  const kpis = dashboard?.kpis || {};
  const studentDistribution = dashboard?.student_distribution || {};
  const skillAnalytics = dashboard?.skill_analytics || {};
  const internshipTracking = dashboard?.internship_tracking || {};
  const internshipAnalytics = dashboard?.internship_analytics || {};
  const placementReadiness = data?.placement_readiness || {};
  const recentPlacements =
    data?.recent_placements?.original?.recent_placements || [];

  const skillData =
    skillAnalytics?.top_skills?.map((s) => ({
      name: s.skill,
      value: s.total,
    })) || [];

  const departmentData =
    studentDistribution?.students_by_department?.map((d) => ({
      name: d.department,
      value: d.count,
    })) || [];

  const yearData =
    studentDistribution?.students_by_year?.map((y) => ({
      name: y.year,
      value: y.count,
    })) || [];

  const COLORS = [
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#3B82F6",
    "#EC4899",
  ];

  const stats = [
    {
      label: "Total Students",
      value: kpis?.total_students || 0,
      icon: <SchoolIcon sx={{ fontSize: 28, color: "#fff" }} />,
      color: "#3B82F6",
    },
    {
      label: "Skill Profiles Created",
      value: kpis?.active_portfolios || 0,
      icon: <AssignmentIcon sx={{ fontSize: 28, color: "#fff" }} />,
      color: "#6366F1",
    },
    {
      label: "Industry Ready Students",
      value: placementReadiness?.total_students || 0,
      icon: <VerifiedIcon sx={{ fontSize: 28, color: "#fff" }} />,
      color: "#22C55E",
    },
    {
      label: "Internships Completed",
      value: internshipTracking?.completed_internships || 0,
      icon: <WorkIcon sx={{ fontSize: 28, color: "#fff" }} />,
      color: "#EC4899",
    },
  ];

  const PlacementGauge = ({ value }) => {
    const percentage = value || 0;
    const angle = (percentage / 100) * 180;

    const data = [
      { value: 33, color: "#EF4444" },
      { value: 33, color: "#F59E0B" },
      { value: 34, color: "#22C55E" },
    ];

    return (
      <Box sx={{ position: "relative", width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Arrow Pointer */}
        <Box
          sx={{
            position: "absolute",
            bottom: "45%",
            left: "50%",
            width: 4,
            height: 80,
            background: "#000",
            transform: `rotate(${angle - 90}deg)`,
            transformOrigin: "bottom center",
          }}
        />

        {/* Center Value */}
        <Box
          sx={{
            position: "absolute",
            top: "65%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {percentage}%
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ background: "#F4F7FE" }}>
      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            position: "relative",
            background: "linear-gradient(90deg,#4F46E5,#6366F1,#4F46E5)",
            borderRadius: 3,
            p: 3,
            mb: 4,
            overflow: "hidden",
          }}
        >
          {/* Wave overlay */}
          <Box
            component="svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 120,
              opacity: 0.18,
            }}
          >
            <path
              fill="#ffffff"
              d="M0,160L80,176C160,192,320,224,480,224C640,224,800,192,960,165.3C1120,139,1280,117,1360,106.7L1440,96L1440,320L0,320Z"
            />
          </Box>

          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: 600,
              position: "relative",
              zIndex: 1,
            }}
          >
            AI-Powered Skill & Placement Intelligence Platform
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          {stats.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.label}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ width: 250 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>

                  <Typography variant="h5" fontWeight={700}>
                    {item.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginLeft: 5,
                    width: 46,
                    height: 46,
                    borderRadius: 2,
                    background: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 6,
                    background: item.color,
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                minHeight: 320,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <Grid container alignItems="center">
                {/* Skill Distribution */}
                <Grid item xs={6}>
                  <Typography variant="h6" mb={2}>
                    Skill Distribution
                  </Typography>

                  <ResponsiveContainer height={240} width={420}>
                    <PieChart>
                      <Pie
                        data={skillData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={95}
                        label={({ percent }) =>
                          `${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {skillData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Grid>

                {/* Vertical Divider */}
                <Grid
                  item
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      height: 240,
                      borderColor: "#E5E7EB",
                      mx: 3,
                    }}
                  />
                </Grid>

                {/* Placement Readiness */}
                <Grid item xs={5} width={420}>
                  <Typography variant="h6" mb={2}>
                    Placement Readiness
                  </Typography>

                  <PlacementGauge
                    value={
                      placementReadiness?.placement_readiness_percentage || 0
                    }
                  />

                  <Typography align="center" fontWeight={600}>
                    {placementReadiness?.level || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                minHeight: 320,
                width: 400,
                background: "#fff",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h6" mb={2}>
                Internship Overview
              </Typography>

              {/* Top companies header */}
              <Box
                sx={{
                  background: "#F3F4F6",
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                  mb: 1,
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Top Companies
                </Typography>
              </Box>

              {/* Company list */}
              <Box sx={{ maxHeight: 150, overflowY: "auto" }}>
                {internshipTracking?.top_companies?.map((c) => (
                  <Box
                    key={c.company}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #eee",
                      py: 1,
                    }}
                  >
                    <Typography variant="body2">{c.company}</Typography>

                    <Typography variant="body2" fontWeight={600}>
                      {c.total}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* White gap */}
              <Box sx={{ height: 20 }} />

              {/* Total internships section */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#6B7280",
                  }}
                >
                  Total Internships
                </Typography>

                <Typography
                  sx={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {internshipTracking?.total_internships || 0}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <Grid container alignItems="center">
                {/* Department Readiness */}
                <Grid item xs={12} md={6} sx={{ width: 550 }}>
                  <Typography variant="h6" mb={3}>
                    Department Readiness
                  </Typography>

                  {departmentData.map((dept, index) => {
                    const max = Math.max(...departmentData.map((d) => d.value));
                    const percent = Math.round((dept.value / max) * 100);

                    return (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography fontSize={14}>{dept.name}</Typography>

                          <Typography fontSize={14} fontWeight={600}>
                            {percent}%
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            width: "100%",
                            height: 10,
                            background: "#E5E7EB",
                            borderRadius: 5,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              width: `${percent}%`,
                              height: "100%",
                              background: "#6366F1",
                              borderRadius: 5,
                            }}
                          />
                        </Box>
                      </Box>
                    );
                  })}
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" mb={2}>
                      Industry Skill Gap
                    </Typography>

                    <TableContainer
                      sx={{
                        border: "1px solid #E5E7EB",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <Table>
                        <TableHead sx={{ background: "#F3F4F6" }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>
                              Industry Demand
                            </TableCell>

                            <TableCell
                              sx={{
                                fontWeight: 600,
                                textAlign: "center",
                              }}
                            >
                              College Skills
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {industryGap?.industry_skills?.map((skill, index) => {
                            const existsInCollege =
                              industryGap?.college_skills?.some(
                                (collegeSkill) =>
                                  collegeSkill.toLowerCase() ===
                                  skill.toLowerCase(),
                              );

                            return (
                              <TableRow key={index}>
                                <TableCell>{skill}</TableCell>

                                <TableCell align="center">
                                  {existsInCollege ? (
                                    <CheckCircleIcon
                                      sx={{ color: "#22C55E" }}
                                    />
                                  ) : (
                                    <CancelIcon sx={{ color: "#EF4444" }} />
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {/* Skill Gap Percentage */}
                    <Box
                      sx={{
                        mt: 2,
                        background: "#EEF2FF",
                        borderRadius: 2,
                        p: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography fontSize={13} color="text.secondary">
                        Skill Gap Percentage
                      </Typography>

                      <Typography
                        fontWeight={700}
                        fontSize={24}
                        color="#6366F1"
                      >
                        {industryGap?.skill_gap_percentage}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={{ width: 350 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h6" mb={2}>
                Students by Year
              </Typography>

              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={yearData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="value" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={{width:600}}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top Corner Shape */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 70,
                  height: 70,
                  borderTop: "6px solid #6366F1",
                  borderLeft: "6px solid #6366F1",
                  borderTopLeftRadius: 10,
                }}
              />

              <Typography variant="h6" mb={2}>
                Recent Placements
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead sx={{ background: "#F3F4F6" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Student Name
                      </TableCell>

                      <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>

                      <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {recentPlacements?.map((p, i) => (
                      <TableRow key={i}>
                        <TableCell>{p.student_name}</TableCell>

                        <TableCell>{p.department}</TableCell>

                        <TableCell>{p.company_name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
