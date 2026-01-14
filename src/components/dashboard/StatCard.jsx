import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ label, value }) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
