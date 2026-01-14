// src/components/dashboard/StatsGrid.jsx
import { Grid } from "@mui/material";
import StatCard from "./StatCard";

export default function StatsGrid({ stats }) {
  const items = [
    { label: "Resumes", value: stats.resumes },
    { label: "Internships", value: stats.internships },
    { label: "Certificates", value: stats.certificates },
    { label: "Skills", value: stats.skills },
  ];

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={6} md={3} key={item.label}>
          <StatCard label={item.label} value={item.value} />
        </Grid>
      ))}
    </Grid>
  );
}
