import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../assets/logo.jpeg";
import backgroundImage from "../assets/background-image.png";

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/resume-builder");
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {/* Background image with blur */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(25px)", // adjust blur strength here
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "150px",
            height: "150px",
            marginBottom: "20px",
            borderRadius: "50%",
            border: "3px solid white",
          }}
        />

        <h1 style={{ fontSize: "3rem", marginBottom: "20px", color: "white" }}>
          AI Resume Builder
        </h1>
        <p style={{ fontSize: "1.2rem",fontWeight:'600', color: "#0c0a29", marginBottom: "40px" }}>
          Build your professional resume in minutes with AI-powered suggestions.
        </p>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default HomePage;


