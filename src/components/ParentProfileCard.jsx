import React, { useState } from "react";
import { Card, Box, Avatar, Typography, Divider, Grid } from "@mui/material";

export default function ParentProfileCard({ user }) {
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
          background: "linear-gradient(135deg,#3f51b5,#5c6bc0)",
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
          onClick={() => setZoom(!zoom)}
          sx={{
            width: zoom ? 150 : 110,
            height: zoom ? 150 : 110,
            border: "4px solid white",
            cursor: "pointer",
            transition: "all 0.3s ease",
            bgcolor: "#3f51b5",
            fontSize: 40,
          }}
        >
          {user.name?.charAt(0).toUpperCase() || "P"}
        </Avatar>
      </Box>

      {/* Name */}
      <Box textAlign="center" mt={1}>
        <Typography variant="h6" fontWeight="bold">
          {user.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Parent
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

          {user.college && (
            <>
              <Grid item xs={4}>
                <Typography color="text.secondary">College</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography fontWeight={500}>{user.college}</Typography>
              </Grid>
            </>
          )}

          {user.phone && (
            <>
              <Grid item xs={4}>
                <Typography color="text.secondary">Phone</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography fontWeight={500}>{user.phone}</Typography>
              </Grid>
            </>
          )}

          {user.address && (
            <>
              <Grid item xs={4}>
                <Typography color="text.secondary">Address</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography fontWeight={500}>{user.address}</Typography>
              </Grid>
            </>
          )}

          {user.children_count && (
            <>
              <Grid item xs={4}>
                <Typography color="text.secondary">Children</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography fontWeight={500}>{user.children_count}</Typography>
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
