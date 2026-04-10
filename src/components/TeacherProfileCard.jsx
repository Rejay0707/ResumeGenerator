import React, { useState } from "react";
import { Card, Box, Avatar, Typography, Divider, Grid } from "@mui/material";

export default function TeacherProfileCard({ user }) {
  const [zoom, setZoom] = useState(false);

  return (
    <Card
      elevation={4}
      sx={{
        maxWidth: 520,
        margin: "auto",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {/* Banner */}
      <Box
        sx={{
          height: 120,
          background: "linear-gradient(135deg,#4F46E5,#6366F1)",
        }}
      />

      {/* Avatar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: -6,
        }}
      >
        <Avatar
          src={user.avatar}
          onClick={() => setZoom(!zoom)}
          sx={{
            width: zoom ? 150 : 110,
            height: zoom ? 150 : 110,
            border: "4px solid white",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {!user.avatar && user.name?.charAt(0).toUpperCase()}
        </Avatar>
      </Box>

      {/* Name */}
      <Box textAlign="center" mt={1}>
        <Typography variant="h6" fontWeight="bold">
          {user.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Teacher
        </Typography>
      </Box>

      <Divider sx={{ mt: 2 }} />

      {/* Info */}
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography color="text.secondary">Email</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography fontWeight={500}>{user.email}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary">College</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography fontWeight={500}>{user.college}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary">Teacher ID</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography fontWeight={500}>{user.id}</Typography>
          </Grid>

          {user.class_sec && (
            <>
              <Grid item xs={4}>
                <Typography color="text.secondary">Class</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography fontWeight={500}>{user.class_sec}</Typography>
              </Grid>
            </>
          )}

          {user.subject && (
            <>
              <Grid item xs={4}>
                <Typography color="text.secondary">Subject</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography fontWeight={500}>{user.subject}</Typography>
              </Grid>
            </>
          )}

          <Grid item xs={4}>
            <Typography color="text.secondary">Role</Typography>
          </Grid>

          <Grid item xs={8}>
            <Typography fontWeight={500}>{user.role}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
