import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import logo1 from "../assets/logo1.png";

export default function RegisterPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Mock registration (simulate backend call)
      await new Promise((res) => setTimeout(res, 1000));

      const newUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: "student", // default role for now
        token: "mock-jwt-token",
      };

      localStorage.setItem("user", JSON.stringify(newUser));

      navigate("/"); // redirect to homepage or login
    } catch (err) {
      setError("Registration failed. Try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        backgroundColor: "#eaf7ff",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: { xs: "90%", sm: "450px", md: "500px" },
          p: { xs: 3, sm: 5 },
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img
            src={logo1}
            alt="logo"
            style={{ width: "150px", height: "auto" }}
          />
        </Box>

        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ fontWeight: "bold", mb: 3, color: "#0d47a1" }}
        >
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="standard"
          />
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="standard"
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
            variant="standard"
          />
          <TextField
            select
            label="Select Role"
            name="role"
            value={form.role || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            SelectProps={{
              native: true,
            }}
            required
          >
            <option value="admin">Admin</option>
            <option value="superadmin">SuperAdmin</option>
            <option value="student">Student</option>
          </TextField>

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="standard"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.2,
              fontWeight: "bold",
              backgroundColor: "#0d47a1",
              "&:hover": { backgroundColor: "#08306b" },
            }}
          >
            {loading ? "Registering..." : "REGISTER"}
          </Button>
        </Box>

        <Typography sx={{ mt: 3, fontSize: 14 }}>
          Already have an account?{" "}
          <Link
            href="/login"
            underline="hover"
            sx={{ fontWeight: "bold", color: "#0d47a1" }}
          >
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
