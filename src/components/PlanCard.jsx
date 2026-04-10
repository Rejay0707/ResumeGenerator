import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function PlanCard({ plan, onSubscribe }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        width:250,
        boxShadow: 4,
        transition: "0.3s",
        "&:hover": { transform: "scale(1.03)" },
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {plan.name}
        </Typography>

        <Typography variant="h4" color="primary">
          ₹{plan.price_monthly}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          Monthly Billing
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Students Limit: {plan.max_students}
          </Typography>

          <Typography variant="body2">
            Storage: {plan.storage_limit_gb} GB
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => onSubscribe(plan.id)}
        >
          Subscribe
        </Button>
      </CardContent>
    </Card>
  );
}
