import React from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import useAdminManagement from "../../containers/AdminManagement";

export default function Dashboard() {
  const { items: parents } = useAdminManagement("parents");
  const { items: teachers } = useAdminManagement("teachers");
  const { items: students } = useAdminManagement("students");
  const { items: recruiters } = useAdminManagement("recruiters");

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
    {
      label: "Recruiters",
      count: recruiters.length,
      gradient: "linear-gradient(135deg, #ba68c8, #8e24aa)",
    },
  ];

  return (
    <Box sx={{ width: "100%", p: { xs: 2, sm: 3, md: 5 } }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Admin Dashboard
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 5 }}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Paper
              elevation={4}
              aria-label={`${item.label} count card`}
              sx={{
                p: 3,
                borderRadius: 3,
                color: "white",
                background: item.gradient,
                textAlign: "center",
                minHeight: 140,
                width:'250px',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
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
                {item.count}
              </Typography>
              
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}