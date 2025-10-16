import React from "react";
import { Grid } from "@mui/material";
import StatsCard from "../components/StatsCard";

export default function TeacherSubjects() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Subjects Teaching" value={3} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Total Topics Covered" value={25} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Pending Topics" value={5} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Exams Scheduled" value={2} />
      </Grid>
    </Grid>
  );
}
