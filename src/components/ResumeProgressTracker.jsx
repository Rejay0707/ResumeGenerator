import React from "react";
import { Box, Typography, LinearProgress, Chip, Collapse } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import WorkIcon from "@mui/icons-material/Work";
import VerifiedIcon from "@mui/icons-material/Verified";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const sections = [
  { 
    key: "basic", 
    label: "Basic Details", 
    icon: <PersonIcon sx={{ fontSize: 18 }} />,
    fields: ["name", "email", "phone"] 
  },
  { 
    key: "education", 
    label: "Education", 
    icon: <SchoolIcon sx={{ fontSize: 18 }} />,
    fields: ["institution", "start_year", "end_year"] 
  },
  { 
    key: "skills", 
    label: "Skills", 
    icon: <BuildIcon sx={{ fontSize: 18 }} />,
    fields: ["skills"] 
  },
  { 
    key: "projects", 
    label: "Projects", 
    icon: <WorkIcon sx={{ fontSize: 18 }} />,
    fields: ["title", "description"] 
  },
  { 
    key: "certifications", 
    label: "Certificates", 
    icon: <VerifiedIcon sx={{ fontSize: 18 }} />,
    fields: ["title", "issuer"] 
  },
  { 
    key: "internships", 
    label: "Internships", 
    icon: <BusinessCenterIcon sx={{ fontSize: 18 }} />,
    fields: ["company", "role"] 
  },
];

export default function ResumeProgressTracker({ formData }) {
  const [expanded, setExpanded] = React.useState(false);

  const getCompletion = () => {
    let completed = 0;
    
    // Basic Details
    if (formData.name?.trim() && formData.email?.trim() && formData.phone?.trim()) {
      completed++;
    }
    
    // Education
    if (formData.education?.some(e => e.institution?.trim() && e.start_year?.trim())) {
      completed++;
    }
    
    // Skills
    if (formData.skills?.trim() && formData.skills.trim().length > 0) {
      completed++;
    }
    
    // Projects
    if (formData.projects?.some(p => p.title?.trim() && p.description?.trim())) {
      completed++;
    }
    
    // Certifications - Check if at least one certificate has any data
    if (formData.certifications?.some(c => 
      c.title?.trim() || c.name?.trim() || c.issuer?.trim()
    )) {
      completed++;
    }
    
    // Internships
    if (formData.internships?.some(i => i.company?.trim() && i.role?.trim())) {
      completed++;
    }
    
    return Math.round((completed / sections.length) * 100);
  };

  const percentage = getCompletion();
  const isComplete = percentage === 100;

  const getSectionStatus = (key) => {
    switch (key) {
      case "basic":
        return formData.name?.trim() && formData.email?.trim() && formData.phone?.trim();
      case "education":
        return formData.education?.some(e => e.institution?.trim() && e.start_year?.trim());
      case "skills":
        return formData.skills?.trim() && formData.skills.trim().length > 0;
      case "projects":
        return formData.projects?.some(p => p.title?.trim() && p.description?.trim());
      case "certifications":
        return formData.certifications?.some(c => 
          c.title?.trim() || c.name?.trim() || c.issuer?.trim()
        );
      case "internships":
        return formData.internships?.some(i => i.company?.trim() && i.role?.trim());
      default:
        return false;
    }
  };

  const completedCount = sections.filter(s => getSectionStatus(s.key)).length;

  return (
    <Box 
      sx={{ 
        mb: 3, 
        borderRadius: 3, 
        bgcolor: "#fff",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          p: 2.5, 
          bgcolor: isComplete ? "#e8f5e9" : "#fafafa",
          borderBottom: "1px solid #e0e0e0",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Box 
              sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: 2, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                bgcolor: isComplete ? "#4caf50" : "#ff9800",
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "bold",
                boxShadow: isComplete 
                  ? "0 4px 12px rgba(76, 175, 80, 0.3)" 
                  : "0 4px 12px rgba(255, 152, 0, 0.3)",
              }}
            >
              {percentage}%
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" color="#333">
                Resume Completeness
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {completedCount} of {sections.length} sections completed
              </Typography>
            </Box>
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            <Chip 
              label={isComplete ? "Ready to Generate" : `${percentage}% Complete`}
              size="small"
              sx={{
                bgcolor: isComplete ? "#4caf50" : "#ff9800",
                color: "#fff",
                fontWeight: 600,
                "& .MuiChip-label": { px: 1.5 },
              }}
              icon={
                isComplete 
                  ? <CheckCircleIcon sx={{ color: "#fff !important" }} /> 
                  : undefined
              }
            />
            <Box
              sx={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
              <ExpandMoreIcon />
            </Box>
          </Box>
        </Box>
        
        {/* Progress Bar */}
        <Box sx={{ mt: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={percentage} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              bgcolor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                bgcolor: isComplete ? "#4caf50" : "#ff9800",
                borderRadius: 5,
                transition: "width 0.5s ease-in-out",
              }
            }} 
          />
        </Box>
      </Box>

      {/* Expandable Sections */}
      <Collapse in={expanded}>
        <Box sx={{ p: 2, bgcolor: "#fafafa" }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: "block" }}>
            SECTIONS
          </Typography>
          
          <Box 
            display="grid" 
            gridTemplateColumns={{ xs: "1fr 1fr", sm: "1fr 1fr 1fr" }} 
            gap={1.5}
          >
            {sections.map((section) => {
              const isDone = getSectionStatus(section.key);
              
              return (
                <Box
                  key={section.key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: isDone ? "#e8f5e9" : "#fff",
                    border: `1px solid ${isDone ? "#c8e6c9" : "#e0e0e0"}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: isDone ? "#4caf50" : "#e0e0e0",
                      color: isDone ? "#fff" : "#999",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isDone ? (
                      <CheckCircleIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ fontSize: 20 }} />
                    )}
                  </Box>
                  
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="body2" 
                      fontWeight={600}
                      sx={{ 
                        color: isDone ? "#2e7d32" : "#666",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {section.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {isDone ? "Completed" : "Pending"}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
          
          {/* Tips Section */}
          {!isComplete && (
            <Box 
              sx={{ 
                mt: 2, 
                p: 2, 
                borderRadius: 2, 
                bgcolor: "#fff3e0",
                border: "1px solid #ffe0b2",
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" color="#e65100" sx={{ mb: 1 }}>
                💡 Tips to Complete Your Resume
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {sections.filter(s => !getSectionStatus(s.key)).map((section) => (
                  <li key={section.key}>
                    <Typography variant="body2" color="text.secondary">
                      Add your {section.label.toLowerCase()} details
                    </Typography>
                  </li>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}