import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, adminLoginAsync, clearError } from "../features/authSlice";
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

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [selectedRole, setSelectedRole] = useState("");

  const loading = reduxAuth.loading;
  const error = reduxAuth.error;

  const SUPERADMIN_DASHBOARD_URL =
    "https://www.scratchprod.in/resume-generator-backend/";

  const RECRUITER_DASHBOARD_URL =
    "https://www.scratchprod.in/resume-generator-backend/recruiter/dashboard";

  const INSTITUTE_DASHBOARD_URL =
    "https://www.scratchprod.in/resume-generator-backend/institution/dashboard";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) dispatch(clearError());
  };

  const handleRoleClick = (roleLabel, roleValue) => {
    setSelectedRole(roleValue);
    setForm((prev) => ({ ...prev, password: "" }));
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;

    try {
      let resultAction;

      if (selectedRole === "admin") {
        // Admin login
        resultAction = await dispatch(
          adminLoginAsync({ email: form.email, password: form.password })
        );
      } else {
        // Superadmin, student, teacher, parent, recruiter — all handled via /api/login
        resultAction = await dispatch(
          loginAsync({ email: form.email, password: form.password })
        );
      }

      if (
        loginAsync.fulfilled.match(resultAction) ||
        adminLoginAsync.fulfilled.match(resultAction)
      ) {
        const user = resultAction.payload;

        // Handle nested data
        const role =
          user?.role?.toLowerCase() ||
          user?.admin?.role?.toLowerCase() ||
          user?.user?.role?.toLowerCase() ||
          "";

        console.log("✅ Login success:", role);

        // Navigate by role
        if (role === "superadmin") {
          window.location.href = SUPERADMIN_DASHBOARD_URL;
        } else if (role === "jobseeker") {
          navigate("/jobseeker/dashboard");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "Student") {
          navigate("/");
        } else if (role === "teacher") {
          navigate("/teacher/dashboard/home");
        } else if (role === "parent") {
          navigate("/parent/dashboard/home");
        } else if (role === "recruiter") {
          window.location.href = RECRUITER_DASHBOARD_URL;
        } else if (role === "institute") {
          window.location.href = INSTITUTE_DASHBOARD_URL;
        } else {
          navigate("/");
        }
      } else {
        console.log("❌ Login failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("❌ Login error:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        backgroundColor: "#eaf7ff",
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
            alt="Logo"
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
            <Link
              onClick={() => navigate("/forgot-password")}
              underline="hover"
              sx={{ fontSize: 14, cursor: "pointer" }}
            >
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

        {/* Role Buttons */}
        <Box
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 1.5,
          }}
        >
          {[
            { label: "SUPER ADMIN", value: "superadmin" },
            { label: "ADMIN", value: "admin" },
            { label: "STUDENT", value: "student" },
            { label: "PARENT", value: "parent" },
            { label: "TEACHER", value: "teacher" },
            { label: "Recruiter", value: "recruiter" },
            { label: "Job Seeker", value: "jobseeker" },
            { label: "Institute", value: "institute"}
          ].map(({ label, value }) => (
            <Button
              key={label}
              variant={selectedRole === value ? "contained" : "outlined"}
              size="small"
              onClick={() => handleRoleClick(label, value)}
              sx={{
                ...(selectedRole === value && {
                  backgroundColor: "#0d47a1",
                  color: "white",
                }),
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

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
