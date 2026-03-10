import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import UpdateIcon from "@mui/icons-material/Update";

import StatusChip from "./internship/StatusChip";

export default function ApplicationCard({ application }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        transition: "0.2s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <WorkOutlineIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              {application.job_title}
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Application Status
            </Typography>

            <StatusChip status={application.status} />
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <UpdateIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              Updated {new Date(application.updated_at).toLocaleDateString()}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}