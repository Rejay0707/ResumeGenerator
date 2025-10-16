import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function StatsCard({ title, value }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>{value}</Typography>
      </CardContent>
    </Card>
  );
}
