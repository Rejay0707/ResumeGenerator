import React from "react";
import { Grid } from "@mui/material";
import StatsCard from "../components/StatsCard";

export default function TeacherAttendance() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Total Classes" value={20} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Attendance Taken" value={18} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Pending Attendance" value={2} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Attendance % This Month" value="95%" />
      </Grid>
    </Grid>
  );
}
