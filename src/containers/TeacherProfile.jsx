import React from "react";
import { Grid } from "@mui/material";
import StatsCard from "../components/StatsCard";

export default function TeacherProfile() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Name" value="John Doe" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Email" value="john.doe@example.com" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Department" value="Computer Science" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard title="Joined On" value="2023-06-15" />
      </Grid>
    </Grid>
  );
}
