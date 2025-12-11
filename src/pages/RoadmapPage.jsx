import React from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const RoadmapPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roadmapData } = location.state || {};

  if (!roadmapData) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6">No roadmap data available.</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#F5F7FA",
        px: { xs: 2, sm: 4 },
        py: 6,
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Back button */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon sx={{ color: "#1976d2", fontSize: "2rem" }} />
      </Box>

      {/* Roadmap Container */}
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 850,
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          background: "linear-gradient(to bottom right, #1976d2, #42a5f5)",
          color: "white",
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ textAlign: "center", mb: 5 }}
        >
          {roadmapData.title}
        </Typography>

        {/* Branch / Timeline Section */}
        <Box sx={{ position: "relative", pl: { xs: 3, sm: 5 } }}>
          {/* Vertical Line */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: { xs: 10, sm: 16 },
              width: "3px",
              height: "100%",
              backgroundColor: "rgba(255,255,255,0.4)",
            }}
          ></Box>

          {roadmapData.steps &&
            roadmapData.steps.map((item, index) => (
              <Box
                key={index}
                sx={{
                  mb: 5,
                  position: "relative",
                }}
              >
                {/* Dot (node) */}
                <FiberManualRecordIcon
                  sx={{
                    position: "absolute",
                    left: { xs: -2, sm: 0 },
                    top: 4,
                    fontSize: "1.1rem",
                    color: "#ffeb3b",
                  }}
                />

                {/* Content Box */}
                <Box
                  sx={{
                    ml: { xs: 4, sm: 6 },
                    backgroundColor: "rgba(255,255,255,0.15)",
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                    Step {index + 1}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ whiteSpace: "pre-line", fontSize: "1.05rem" }}
                  >
                    {item.step}
                  </Typography>
                </Box>

                {index < roadmapData.steps.length - 1 && (
                  <Divider
                    sx={{
                      mt: 3,
                      borderColor: "rgba(255,255,255,0.2)",
                    }}
                  />
                )}
              </Box>
            ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default RoadmapPage;
