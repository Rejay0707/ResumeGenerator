import React from "react";
import { Grid } from "@mui/material";
import StatsCard from "../components/StatsCard";

export default function ParentHome() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Children" value={2} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Total Classes" value={10} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Messages" value={3} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Attendance Avg" value="95%" />
      </Grid>
    </Grid>
  );
}
