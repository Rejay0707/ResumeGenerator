// import React from "react";

// import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";

// function HomePage() {
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     navigate("/resume-builder");
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         width: "100vw",
//         margin: 0,
//         padding: 0,
//         boxSizing: "border-box",
//         textAlign: "center",
//         backgroundColor: "#0c0b0bff", // optional: light background to see container
//       }}
//     >
//       <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
//         AI Resume Builder
//       </h1>
//       <p style={{ fontSize: "1.2rem", color: "gray", marginBottom: "40px" }}>
//         Build your professional resume in minutes with AI-powered suggestions.
//       </p>

//       <Button
//         variant="contained"
//         color="primary"
//         size="large"
//         onClick={handleGetStarted}
//       >
//         Get Started
//       </Button>
//     </div>
//   );
// }

// export default HomePage;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../assets/logo.jpeg"; // adjust path based on your folder structure

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/resume-builder");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        textAlign: "center",
        backgroundColor: "#0c0b0bff",
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        style={{ width: "220px", height: "220px", marginBottom: "20px", borderRadius: "50%" }}
      />

      <h1 style={{ fontSize: "3rem", marginBottom: "20px", color: "white" }}>
        AI Resume Builder
      </h1>
      <p style={{ fontSize: "1.2rem", color: "gray", marginBottom: "40px" }}>
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
  );
}

export default HomePage;
