import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../containers/AuthContainer";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function LoginPage() {
  const { user, loading, error, login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user) {
      if (user.role === "superadmin") {
        navigate("/superadmin/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:"100vw",
        px: 2,
        // Background image with cover and center
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // Overlay with dark transparent layer for readability
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        //   bgcolor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          position: "relative",
          zIndex: 2, // above overlay
        //   maxWidth: 400,
        //   width: "100vw",
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          boxSizing: "border-box",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // slightly transparent white
        //   color: "#000",
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h1"
          align="center"
          gutterBottom
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            autoComplete="email"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            autoComplete="current-password"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}