import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";

export default function ProgressCard({ title, value }) {
  return (
    <Card
      elevation={2}
      sx={{
        width: "150px",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography fontWeight="bold" mb={1}>
          {title}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Box flex={1}>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{ height: 8, borderRadius: 5 }}
            />
          </Box>
          <Typography fontWeight="bold">{value}%</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}


