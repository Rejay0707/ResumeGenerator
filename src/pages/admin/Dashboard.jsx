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
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkIcon from "@mui/icons-material/Work";

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

  useEffect(() => {
    fetchDashboard();
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

  if (!data) return null;

  const dashboard = data?.dashboard || {};
  const kpis = dashboard?.kpis || {};
  const studentDistribution = dashboard?.student_distribution || {};
  const skillAnalytics = dashboard?.skill_analytics || {};
  const internshipTracking = dashboard?.internship_tracking || {};
  const internshipAnalytics = dashboard?.internship_analytics || {};
  const placementReadiness = data?.placement_readiness || {};

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
            background: "linear-gradient(90deg,#3B82F6,#8B5CF6)",
            borderRadius: 3,
            p: 3,
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ color: "#fff", fontWeight: 600 }}>
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
                }}
              >
                <Box sx={{width:250}}>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>

                  <Typography variant="h5" fontWeight={700}>
                    {item.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginLeft:5,
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
                background: "#F9FAFB",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h6" mb={2}>
                Internship Overview
              </Typography>

              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#374151",
                }}
              >
                Total Internships: {internshipTracking?.total_internships || 0}
              </Typography>

              <Typography variant="subtitle2" mb={1}>
                Top Companies
              </Typography>

              <Box sx={{ maxHeight: 180, overflowY: "auto" }}>
                {internshipTracking?.top_companies?.map((c) => (
                  <Box
                    key={c.company}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #eee",
                      py: 0.5,
                    }}
                  >
                    <Typography variant="body2">{c.company}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {c.total}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                width: 500,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h6" mb={3}>
                Department Readiness
              </Typography>

              {departmentData.map((dept, index) => {
                const max = Math.max(...departmentData.map((d) => d.value));
                const percent = Math.round((dept.value / max) * 100);

                return (
                  <Box key={index} sx={{ mb: 2 }}>
                    {/* Department name + percentage */}
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

                    {/* Progress bar BELOW the department */}
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
                          background: "#22C55E",
                          borderRadius: 5,
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
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

                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
