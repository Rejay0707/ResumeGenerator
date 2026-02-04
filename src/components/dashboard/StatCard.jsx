import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ label, value }) {
  return (
    <Card
      elevation={2}
      sx={{
        width: "150px",
        height: "100%",
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <Typography color="text.secondary">{label}</Typography>
      </CardContent>
    </Card>
  );
}


