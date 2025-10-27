import React from "react";
import { Box, Paper, Typography, Avatar, Divider, Grid } from "@mui/material";

const ParentProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="error">
          No user data found. Please log in again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#3f51b5",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        My Profile
      </Typography>

      <Paper
        elevation={4}
        sx={{
          borderRadius: 3,
          p: { xs: 3, md: 5 },
          maxWidth: 800,
          mx: "auto",
        }}
      >
        {/* Profile Info Section */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                bgcolor: "#3f51b5",
                fontSize: "2rem",
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : "P"}
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
              {user.name || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.role || "Parent"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {user.email || "Not available"}
              </Typography>
              {user.phone && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Phone:</strong> {user.phone}
                </Typography>
              )}
              {user.address && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Address:</strong> {user.address}
                </Typography>
              )}
              {user.children_count && (
                <Typography variant="body1">
                  <strong>Children Enrolled:</strong> {user.children_count}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Extra Details Section */}
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Account Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Member since:{" "}
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: Active
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ParentProfile;
