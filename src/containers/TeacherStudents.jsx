import React from "react";
import { Grid } from "@mui/material";
import StatsCard from "../components/StatsCard";

export default function TeacherStudents() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Total Students" value={40} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Students Present Today" value={36} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Students Absent Today" value={4} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Pending Assignments" value={8} />
      </Grid>
    </Grid>
  );
}
