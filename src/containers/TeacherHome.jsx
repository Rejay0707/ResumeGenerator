import React from "react";
import { Grid } from "@mui/material";
import StatsCard from "../components/StatsCard";

export default function TeacherHome() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Total Students" value={40} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Classes Assigned" value={5} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Subjects Teaching" value={3} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Attendance This Month" value="92%" />
      </Grid>
    </Grid>
  );
}
