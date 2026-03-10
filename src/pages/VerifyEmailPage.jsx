// src/pages/VerifyEmailPage.jsx

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  CircularProgress,
} from "@mui/material";
import logo1 from "../assets/logo1.png";
import api from "../services/api";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get userId and email from state
  const userId = location.state?.userId;
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const [success, setSuccess] = useState(false);
  
  // Timer for resend OTP
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef(null);

  // Redirect if no userId
  useEffect(() => {
    if (!userId) {
      navigate("/register");
    }
  }, [userId, navigate]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startResendTimer = (seconds = 60) => {
    setResendTimer(seconds);
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = async () => {
    if (!otp || otp.length < 4) {
      setMessage("Please enter a valid OTP");
      setSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // ✅ Using userId from state
      const response = await api.post('/api/verify-email', {
        user_id: userId,
        otp: otp
      });
      
      if (response.data.success) {
        setSuccess(true);
        setMessage("✅ Email verified successfully!");
        
        // Wait 2 seconds then redirect to login
        setTimeout(() => {
          navigate("/login", { state: { verified: true, email } });
        }, 2000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Verification failed. Please try again.";
      setMessage(errorMsg);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    setResendLoading(true);
    setMessage("");

    try {
      // ✅ Using userId from state
      const response = await api.post('/api/resend-otp', {
        user_id: userId
      });
      
      if (response.data.success) {
        setMessage("📧 New OTP sent to your email!");
        setSuccess(true);
        startResendTimer(60);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to resend OTP";
      setMessage(errorMsg);
      setSuccess(false);
    } finally {
      setResendLoading(false);
    }
  };

  // Check if already verified on page load
  useEffect(() => {
    const checkStatus = async () => {
      if (!userId) return;
      
      try {
        const response = await api.get('/api/verification-status', {
          params: { user_id: userId }
        });
        
        if (response.data.data?.is_verified) {
          setSuccess(true);
          setMessage("✅ Your email is already verified! Please login.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.log("Status check failed:", error);
      }
    };
    
    checkStatus();
  }, [userId, navigate]);

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
          width: { xs: "90%", sm: "450px" },
          p: 5,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img src={logo1} alt="logo" style={{ width: "150px", height: "auto" }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#0d47a1" }}>
          Verify Your Email
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          We've sent a verification code to
          <br />
          <strong>{email || "your email"}</strong>
        </Typography>

        

        {/* OTP Input */}
        <TextField
          fullWidth
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="123456"
          sx={{ mb: 2 }}
          inputProps={{ 
            maxLength: 6, 
            style: { 
              textAlign: "center", 
              letterSpacing: "0.5rem", 
              fontSize: "1.5rem" 
            } 
          }}
        />

        {/* Verify Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleVerify}
          disabled={loading || otp.length < 4}
          sx={{
            py: 1.5,
            fontWeight: "bold",
            backgroundColor: "#0d47a1",
            "&:hover": { backgroundColor: "#08306b" },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Verify Email"}
        </Button>

        {/* Resend OTP */}
        <Box sx={{ mt: 3 }}>
          {resendTimer > 0 ? (
            <Typography variant="body2" color="text.secondary">
              Resend OTP in <strong>{resendTimer}s</strong>
            </Typography>
          ) : (
            <Button
              variant="text"
              onClick={handleResend}
              disabled={resendLoading}
              sx={{ textTransform: "none" }}
            >
              {resendLoading ? <CircularProgress size={20} /> : "Resend OTP"}
            </Button>
          )}
        </Box>

        {/* Message Alert */}
        {message && (
          <Alert severity={success ? "success" : "error"} sx={{ mt: 3 }}>
            {message}
          </Alert>
        )}

        {/* Back to Register */}
        <Typography sx={{ mt: 3, fontSize: 14 }}>
          Wrong email?{" "}
          <Link
            onClick={() => navigate("/register")}
            underline="hover"
            sx={{ fontWeight: "bold", color: "#0d47a1", cursor: "pointer" }}
          >
            Register again
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}