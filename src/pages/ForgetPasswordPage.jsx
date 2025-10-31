import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import axios from "axios";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const API_BASE =
    "https://www.scratchprod.in/resume-generator-backend/api/auth";

  // 1️⃣ Send OTP
  const handleSendOTP = async () => {
    if (!email) return setMessage("Please enter your email.");
    setLoading(true);
    setSuccess(false);
    try {
      const res = await axios.post(`${API_BASE}/forgot-password`, { email });
      setMessage(res.data.message || "OTP sent to your email!");
      setSuccess(true);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Verify OTP
  const handleVerifyOTP = async () => {
    if (!otp) return setMessage("Please enter the OTP.");
    setLoading(true);
    setSuccess(false);
    try {
      const res = await axios.post(`${API_BASE}/verify-otp`, { email, otp });
      setMessage(res.data.message || "OTP verified!");
      setSuccess(true);
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP. Try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // 3️⃣ Reset Password
  const handleResetPassword = async () => {
    if (!newPassword) return setMessage("Please enter a new password.");
    setLoading(true);
    setSuccess(false);
    try {
      const res = await axios.post(`${API_BASE}/reset-password`, {
        email,
        newPassword,
      });
      setMessage(res.data.message || "Password reset successfully!");
      setSuccess(true);
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
        {/* 🔹 Logo */}
        <Box sx={{ mb: 2 }}>
          <img
            src={logo1}
            alt="Logo"
            style={{ width: "150px", height: "auto" }}
          />
        </Box>

        {/* 🔹 Heading */}
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, color: "#0d47a1" }}
        >
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </Typography>

        {/* Step 1: Email */}
        {step === 1 && (
          <>
            <TextField
              fullWidth
              label="Enter Email Address"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleSendOTP}
              disabled={loading}
              sx={{
                py: 1.2,
                fontWeight: "bold",
                backgroundColor: "#0d47a1",
                "&:hover": { backgroundColor: "#08306b" },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          </>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <>
            <TextField
              fullWidth
              label="Enter OTP"
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              variant="standard"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleVerifyOTP}
              disabled={loading}
              sx={{
                py: 1.2,
                fontWeight: "bold",
                backgroundColor: "#0d47a1",
                "&:hover": { backgroundColor: "#08306b" },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="standard"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleResetPassword}
              disabled={loading}
              sx={{
                py: 1.2,
                fontWeight: "bold",
                backgroundColor: "#0d47a1",
                "&:hover": { backgroundColor: "#08306b" },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>
          </>
        )}

        {/* ✅ Success or Error Message */}
        {message && (
          <Alert
            severity={success ? "success" : "error"}
            sx={{ mt: 3, fontSize: "0.9rem" }}
          >
            {message}
          </Alert>
        )}

        {/* 🔹 Back to Login */}
        <Typography sx={{ mt: 3, fontSize: 14 }}>
          Remember your password?{" "}
          <Link
            onClick={() => navigate("/login")}
            underline="hover"
            sx={{ fontWeight: "bold", color: "#0d47a1", cursor: "pointer" }}
          >
            Back to Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
