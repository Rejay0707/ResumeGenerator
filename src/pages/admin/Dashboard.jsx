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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import api from "../../services/api";
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

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [industryGap, setIndustryGap] = useState(null);

  useEffect(() => {
    fetchDashboard();
    fetchIndustryGap();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/api/admin/dashboard");

      console.log("FULL API RESPONSE:", res);
      console.log("DATA:", res.data);

      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchIndustryGap = async () => {
    try {
      const res = await api.get("/api/industry-skill-gap");

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
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" mb={2}>
                    Skill Distribution
                  </Typography>

                  <ResponsiveContainer
                    height={240}
                    width={isMobile ? 200 : 420}
                  >
                    <PieChart>
                      <Pie
                        data={skillData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={35}
                        labelLine={false}
                        label={({
                          cx,
                          cy,
                          midAngle,
                          innerRadius,
                          outerRadius,
                          percent,
                        }) => {
                          const RADIAN = Math.PI / 180;
                          const radius =
                            innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);

                          return (
                            <text
                              x={x}
                              y={y}
                              fill="#fff"
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontSize={12}
                              fontWeight={600}
                            >
                              {(percent * 100).toFixed(0)}%
                            </text>
                          );
                        }}
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
                    display: { xs: "none", md: "flex" },
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
                width: { xs: "100%", md: 400 },
                mx: { xs: "auto", md: 0 },
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
          <Grid item xs={12} md={6} sx={{ width: 600 }}>
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
