import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, clearError } from "../features/authSlice";
import useAuth from "../containers/AuthContainer";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Checkbox,
  FormControlLabel,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import logo1 from "../assets/logo1.png";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const reduxAuth = useSelector((state) => state.auth);
  const {
    user: adminUser,
    login: adminLogin,
    loading: adminLoading,
    error: adminError,
  } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const loading = adminLoading || reduxAuth.loading;
  const error = adminError || reduxAuth.error;

  const SUPERADMIN_DASHBOARD_URL = "http://192.168.1.36:8000";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      form.email === "admin@example.com" ||
      form.email === "admin@gmail.com"
    ) {
      // Admin login
      await adminLogin(form.email, form.password);
      navigate("/admin/dashboard");
    } else if (form.email === "student@example.com") {
      // Student login (mock)
      await adminLogin(form.email, form.password);
      navigate("/"); // redirect to homepage
    } else {
      // SuperAdmin login (via API)
      const resultAction = await dispatch(
        loginAsync({ email: form.email, password: form.password })
      );
      if (loginAsync.fulfilled.match(resultAction)) {
        const user = resultAction.payload;
        const role = user.role?.toLowerCase();
        if (role === "superadmin") {
          window.location.href = SUPERADMIN_DASHBOARD_URL;
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "student") {
          navigate("/"); // fallback if backend returns student
        }
      }
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
        overflow: "hidden", // prevent scroll
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
          Login Details
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Enter Email Address"
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
            label="Enter Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="standard"
            autoComplete="current-password"
          />

          <Box
            sx={{
              mt: 1,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Remember Me"
            />
            <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
              Forgot Password?
            </Link>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.2,
              fontWeight: "bold",
              backgroundColor: "#0d47a1",
              "&:hover": { backgroundColor: "#08306b" },
            }}
          >
            {loading ? "Logging in..." : "SIGN IN"}
          </Button>
        </Box>

        {/* Role Buttons below the form */}
        <Box
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 1.5,
          }}
        >
          {[
            "SUPER ADMIN",
            "ADMIN",
            "STUDENT",
            "PARENT",
            "TEACHER",
            "RECRUITER",
          ].map((role) => (
            <Button key={role} variant="outlined" size="small">
              {role}
            </Button>
          ))}
        </Box>
        {/* 👇 Add this register link below login */}
        <Typography sx={{ mt: 3, fontSize: 14 }}>
          Don’t have an account?{" "}
          <Link
            href="/register"
            underline="hover"
            sx={{ fontWeight: "bold", color: "#0d47a1" }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
