// src/components/dashboard/DashboardSkeleton.jsx
import { Grid, Skeleton, Card, CardContent } from "@mui/material";

export default function DashboardSkeleton() {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3, 4].map((i) => (
        <Grid item xs={6} md={3} key={i}>
          <Card>
            <CardContent>
              <Skeleton width="60%" />
              <Skeleton variant="text" height={40} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
