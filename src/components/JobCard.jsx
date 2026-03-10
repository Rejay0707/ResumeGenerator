import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function JobCard({ job, onApply, applyingJobId, appliedJobs }) {

  // check if this job is already applied
  const isApplied = appliedJobs?.includes(job.title);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "0.2s",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Job Title */}
        <Typography variant="h6" fontWeight="bold">
          {job.title}
        </Typography>

        {/* Company */}
        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
          <BusinessIcon fontSize="small" />
          <Typography variant="body2">{job.company_name}</Typography>
        </Stack>

        {/* Location */}
        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">{job.location}</Typography>
        </Stack>

        {/* Job Type */}
        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
          <WorkIcon fontSize="small" />
          <Typography variant="body2">{job.job_type}</Typography>
        </Stack>

        {/* Deadline */}
        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
          <CalendarTodayIcon fontSize="small" />
          <Typography variant="body2">
            Deadline: {new Date(job.deadline).toLocaleDateString()}
          </Typography>
        </Stack>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          mt={2}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {job.description}
        </Typography>

        {/* Skills */}
        <Box mt={2}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {job.skills_required?.map((skill, i) => (
              <Chip
                key={i}
                label={skill}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
      </CardContent>

      {/* Apply Button */}
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          color={isApplied ? "success" : "primary"}
          disabled={isApplied || applyingJobId === job.id}
          onClick={() => onApply(job.id, job.title)}
        >
          {isApplied
            ? "Applied"
            : applyingJobId === job.id
            ? "Applying..."
            : "Apply"}
        </Button>
      </CardActions>
    </Card>
  );
}