import React from "react";
import { Grid } from "@mui/material";
import StatsCard from "../components/StatsCard";

export default function TeacherClasses() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Total Classes Assigned" value={5} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Classes Completed" value={4} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Upcoming Classes" value={1} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Students per Class" value={8} />
      </Grid>
    </Grid>
  );
}
