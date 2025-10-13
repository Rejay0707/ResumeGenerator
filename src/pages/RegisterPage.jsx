import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { registerUser, clearError } from "../features/registerSlice";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Select from register slice state
  const { isLoading: reduxLoading, error: reduxError, user } = useSelector(
    (state) => state.register // Using 'register' slice
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // Initial role state
  });
  const [localError, setLocalError] = useState(null); // For frontend-only errors
  const [loading, setLoading] = useState(false); // Local loading fallback

  const SUPERADMIN_DASHBOARD_URL = "http://192.168.1.38:8000"; // Copied from LoginPage

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (localError) setLocalError(null);
    dispatch(clearError()); // Clear Redux errors on input
  };

  // Effect to handle successful registration from register slice (role-based navigation like LoginPage)
  useEffect(() => {
    if (user) {
      // Handle nested data (mirroring LoginPage logic)
      const role =
        user?.role?.toLowerCase() ||
        user?.admin?.role?.toLowerCase() ||
        user?.user?.role?.toLowerCase() ||
        "";

      console.log("✅ Registration success:", role);

      // Store user/token in localStorage (adjust as needed for your auth flow)
      localStorage.setItem("user", JSON.stringify(user));
      if (user.token) {
        localStorage.setItem("token", user.token);
      }

      // Navigate by role (exactly like LoginPage)
      if (role === "superadmin") {
        window.location.href = SUPERADMIN_DASHBOARD_URL;
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "student" || role === "Student") {
        navigate("/");
      } else if (role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (role === "parent") {
        navigate("/parent/dashboard");
      } else if (role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/"); // Fallback
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.role) {
      setLocalError("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    // Prepare data for API (exclude confirmPassword)
    const formData = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    setLoading(true);
    setLocalError(null);

    // Dispatch Redux Thunk from registerSlice
    const resultAction = await dispatch(registerUser  (formData));

    if (registerUser  .fulfilled.match(resultAction)) {
      // Success handled in useEffect (no need to navigate here)
      console.log("✅ Registration fulfilled");
    } else {
      console.log("❌ Registration failed:", resultAction.payload);
      // Error is already set in Redux state
    }

    setLoading(false);
  };

  // Combined error display (local + Redux from register slice)
  const displayError = localError || reduxError;

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
            // label="Select Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="standard"
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select a role</option>
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

          {displayError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {displayError}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || reduxLoading}
            sx={{
              mt: 3,
              py: 1.2,
              fontWeight: "bold",
              backgroundColor: "#0d47a1",
              "&:hover": { backgroundColor: "#08306b" },
            }}
          >
            {(loading || reduxLoading) ? "Registering..." : "REGISTER"}
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
