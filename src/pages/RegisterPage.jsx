import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  CircularProgress,
} from "@mui/material";
import logo1 from "../assets/logo1.png";
import {
  registerUser,
  clearError,
  clearRegisterState,
} from "../features/registerSlice";

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Get from register slice
  const { isLoading, error, user, success } = useSelector(
    (state) => state.register,
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [localError, setLocalError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (localError) setLocalError(null);
    dispatch(clearRegisterState());
  };



  // ✅ FIXED: Navigate directly when registration is successful
  const email = form.email;

useEffect(() => {
  if (success && user) {
    navigate("/verify-email", {
      state: {
        userId: user.user_id || user.id,
        email,
      },
      replace: true,
    });

    dispatch(clearRegisterState());
  }
}, [success, user, email, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.role
    ) {
      setLocalError("All fields are required");
      return;
    }

    const exemptedRoles = ["jobseeker", "superadmin", "recruiter", "institute"];
    if (!exemptedRoles.includes(form.role.toLowerCase()) && !form.college) {
      setLocalError("College Name is required");
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

    // Prepare data
    const formData = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };
    if (form.college) {
      formData.college = form.college;
    }

    // Dispatch register action
    await dispatch(registerUser(formData));
  };

  // Check if college field should be shown
  const exemptedRoles = ["jobseeker", "superadmin", "recruiter", "institute"];
  const showCollegeField = !exemptedRoles.includes(form.role.toLowerCase());

  const displayError = localError || error;

  // Original Registration Form
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
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="standard"
            SelectProps={{ native: true }}
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="superadmin">SuperAdmin</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="recruiter">Recruiter</option>
            <option value="jobseeker">Job Seeker</option>
            <option value="institute">Institute</option>
          </TextField>

          {showCollegeField && (
            <TextField
              label="College Name"
              name="college"
              value={form.college}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="standard"
            />
          )}

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
            disabled={isLoading}
            sx={{
              mt: 3,
              py: 1.2,
              fontWeight: "bold",
              backgroundColor: "#0d47a1",
              "&:hover": { backgroundColor: "#08306b" },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "REGISTER"
            )}
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
