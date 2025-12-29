import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkIcon from "@mui/icons-material/Work";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified"; // Icon for Certifications
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resumeId } = location.state || {};

  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false); // Added for roadmap button
  const [roadmapLoading, setRoadmapLoading] = useState(false); // Added for roadmap
  const resumeRef = useRef(null);

  useEffect(() => {
    if (resumeId) fetchResume();
    else setLoading(false);
  }, [resumeId]);

  const fetchResume = async () => {
    try {
      const res = await axios.post(
        `https://www.scratchprod.in/resume-generator-backend/api/resumes/${resumeId}/ai-format`
      );

      console.log("Fetched resume:", res.data);
      setResumeData(res.data.ai_resume);
    } catch (error) {
      console.error("Error fetching resume:", error);
    } finally {
      setLoading(false);
    }
  };



const handleDownload = async () => {
  if (!resumeRef.current) return;
  setDownloadLoading(true);

  const element = resumeRef.current;

  // FIXED WIDTHS FOR PDF (CRITICAL FIX)
  const LEFT_COL_WIDTH = 260;
  const RIGHT_COL_WIDTH = 520;

  // Save original element styles
  const originalStyles = {
    width: element.style.width,
    height: element.style.height,
    overflow: element.style.overflow,
    position: element.style.position,
    left: element.style.left,
  };

  const leftCol = element.querySelector('[data-pdf-column="left"]');
  const rightCol = element.querySelector('[data-pdf-column="right"]');

  try {
    /* ===== FORCE FIXED LAYOUT FOR HTML2CANVAS ===== */
    leftCol.style.width = `${LEFT_COL_WIDTH}px`;
    rightCol.style.width = `${RIGHT_COL_WIDTH}px`;
    rightCol.style.maxWidth = `${RIGHT_COL_WIDTH}px`;
    rightCol.style.wordBreak = "break-word";

    element.style.width = `${LEFT_COL_WIDTH + RIGHT_COL_WIDTH}px`;
    element.style.height = `${element.scrollHeight}px`;
    element.style.overflow = "visible";
    element.style.position = "absolute";
    element.style.left = "-9999px";

    /* ===== CAPTURE ===== */
    const canvas = await html2canvas(element, {
      scale: 1.2,
      useCORS: true,
      backgroundColor: "#ffffff",
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    /* ===== TRIM BOTTOM WHITE SPACE (YOUR ORIGINAL LOGIC) ===== */
    const ctx = canvas.getContext("2d");
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let bottom = canvas.height;

    for (let y = canvas.height - 1; y >= 0; y--) {
      let rowEmpty = true;
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const r = pixels.data[index];
        const g = pixels.data[index + 1];
        const b = pixels.data[index + 2];
        const alpha = pixels.data[index + 3];
        if (!(r > 245 && g > 245 && b > 245) && alpha > 0) {
          rowEmpty = false;
          break;
        }
      }
      if (!rowEmpty) {
        bottom = y;
        break;
      }
    }

    const trimmedCanvas = document.createElement("canvas");
    trimmedCanvas.width = canvas.width;
    trimmedCanvas.height = bottom + 10;
    trimmedCanvas
      .getContext("2d")
      .drawImage(
        canvas,
        0,
        0,
        canvas.width,
        bottom + 10,
        0,
        0,
        canvas.width,
        bottom + 10
      );

    /* ===== PDF GENERATION ===== */
    const imgData = trimmedCanvas.toDataURL("image/jpeg", 0.8);
    const imgWidth = 585;
    const imgHeight =
      (trimmedCanvas.height * imgWidth) / trimmedCanvas.width;

    const pdf = new jsPDF("p", "pt", [imgWidth, imgHeight]);
    pdf.addImage(imgData, "JPEG", 5, 0, imgWidth, imgHeight, "FAST");

    const pdfBlob = pdf.output("blob");
    const sizeKB = (pdfBlob.size / 1024).toFixed(2);
    console.log(`📄 PDF size: ${sizeKB} KB`);

    if (pdfBlob.size > 2048 * 1024) {
      alert(`PDF too large (${sizeKB} KB). Try reducing content.`);
      return;
    }

    /* ===== BACKEND UPLOAD (UNCHANGED) ===== */
    const pdfFile = new File([pdfBlob], "resume.pdf", {
      type: "application/pdf",
    });

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    const uploadUrl = `https://www.scratchprod.in/resume-generator-backend/api/resumes/${resumeId}/upload-pdf`;

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Upload response:", response.data);
    } catch (uploadError) {
      console.error(
        "❌ Upload failed:",
        uploadError.response?.data || uploadError.message
      );
      alert(
        `Upload failed: ${
          uploadError.response?.data?.message ||
          "Server error. Please try again."
        }`
      );
    }

    /* ===== LOCAL DOWNLOAD ===== */
    pdf.save("resume.pdf");
    alert("PDF downloaded successfully!");
    setDownloadComplete(true);
  } catch (error) {
    console.error("❌ PDF generation failed:", error);
    alert("Failed to generate PDF. Please try again.");
  } finally {
    /* ===== RESTORE ORIGINAL STYLES ===== */
    leftCol.style.width = "33%";
    rightCol.style.width = "67%";
    rightCol.style.maxWidth = "none";
    rightCol.style.wordBreak = "normal";

    element.style.width = originalStyles.width;
    element.style.height = originalStyles.height;
    element.style.overflow = originalStyles.overflow;
    element.style.position = originalStyles.position;
    element.style.left = originalStyles.left;

    setDownloadLoading(false);
  }
};


  const handleGenerateRoadmap = async () => {
    setRoadmapLoading(false);
    try {
      const response = await axios.post(
        `https://www.scratchprod.in/resume-generator-backend/api/resumes/${resumeId}/roadmaps/generate`
      );
      console.log("Roadmap generated:", response.data);
      // Navigate to roadmap page with data
      navigate("/roadmap", { state: { roadmapData: response.data } });
    } catch (error) {
      console.error("Error generating roadmap:", error);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setRoadmapLoading(false);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography>Loading resume…</Typography>
      </Box>
    );
  }

  if (!resumeData) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography>No resume data found.</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  const {
    name,
    summary,
    contact,
    education,
    projects,
    internships,
    skills,
    awards,
    certifications, // Added certifications
  } = resumeData;

  return (
    <Box sx={{ minHeight: "100vh", background: "#f4f6f8", py: 4 }}>
      {/* Buttons above the resume */}
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGenerateRoadmap}
            disabled={roadmapLoading}
            startIcon={
              roadmapLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
              padding: "10px 20px",
              minWidth: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {roadmapLoading ? "Generating..." : "Generate Roadmap"}
          </Button>
        
        <Button
          variant="contained"
          onClick={handleDownload}
          disabled={downloadLoading}
          startIcon={
            downloadLoading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <DownloadIcon />
            )
          }
          sx={{ ml: "auto" }}
        >
          Download PDF
        </Button>
      </Box>

      <Paper
        ref={resumeRef}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: 6, // Increased padding for more space
          background: "#fff",
          color: "#000",
          fontFamily: "'Times New Roman', serif", // Professional font
          lineHeight: 1.6, // Increased line height for less congestion
        }}
        elevation={3}
      >
        {/* Header */}
        <Typography
          variant="h4"
          fontWeight="bold"
          mt={2}
          sx={{ color: "#1976d2" }}
        >
          {name}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          mt={1}
          sx={{ fontStyle: "italic" }}
        >
          {summary}
        </Typography>

        <Divider sx={{ my: 3, borderColor: "#1976d2" }} />

        {/* Two Column Layout */}
        <Box display="flex" gap={4}>
          {/* LEFT COLUMN - One third space, green background */}
          <Box
            width="33%"
            data-pdf-column="left"
            sx={{
              backgroundColor: "#e8f5e8", // Light green background
              p: 2, // Padding inside left column
              borderRadius: 1,
              // Removed minHeight to allow dynamic height and prevent empty space
            }}
          >
            <Section title="Contact" icon={<EmailIcon />}>
              <Box display="flex" alignItems="center" mb={2}>
                <EmailIcon sx={{ mr: 1, fontSize: "1rem" }} />
                <Text>{contact?.email}</Text>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <PhoneIcon sx={{ mr: 1, fontSize: "1rem" }} />
                <Text>{contact?.phone}</Text>
              </Box>
              <Box display="flex" alignItems="center">
                <GitHubIcon sx={{ mr: 1, fontSize: "1rem" }} />
                <Text>{contact?.github}</Text>
              </Box>
            </Section>

            <Section title="Education" icon={<SchoolIcon />}>
              {education?.map((edu, i) => (
                <Box key={i} mb={3}>
                  <Text fontWeight="bold">{edu.degree}</Text>
                  <Text>{edu.institution}</Text>
                  <Text variant="caption" sx={{ color: "#666" }}>
                    {edu.year}
                  </Text>
                </Box>
              ))}
            </Section>

            <Section title="Awards" icon={<EmojiEventsIcon />}>
              {awards?.length ? (
                awards.map((a, i) => (
                  <Box key={i} mb={2}>
                    <Text fontWeight="bold">• {a.name}</Text>
                    <Text sx={{ fontSize: "0.8rem", color: "#666" }}>
                      {a.description}
                    </Text>
                  </Box>
                ))
              ) : (
                <Text>No awards listed</Text>
              )}
            </Section>

            <Section title="Certifications" icon={<VerifiedIcon />}>
              {certifications?.length ? (
                certifications.map((c, i) => (
                  <Box key={i} mb={2}>
                    <Text fontWeight="bold">• {c.name}</Text>
                    <Text sx={{ fontSize: "0.8rem", color: "#666" }}>
                      {c.description}
                    </Text>
                  </Box>
                ))
              ) : (
                <Text>No certifications listed</Text>
              )}
            </Section>
          </Box>

          {/* RIGHT COLUMN - Remaining two thirds */}
          <Box width="67%" data-pdf-column="right">
            <Section title="Projects" icon={<WorkIcon />}>
              {projects?.map((p, i) => (
                <Box key={i} mb={4}>
                  <Text fontWeight="bold" sx={{ color: "#1976d2" }}>
                    {p.title}
                  </Text>
                  <Text sx={{ mt: 1 }}>{p.description}</Text>
                </Box>
              ))}
            </Section>

            <Section title="Internships" icon={<WorkIcon />}>
              {internships?.map((i, idx) => (
                <Box key={idx} mb={4}>
                  <Text fontWeight="bold" sx={{ color: "#1976d2" }}>
                    {i.company}
                  </Text>
                  <Text fontStyle="italic" sx={{ color: "#666" }}>
                    {i.role}
                  </Text>
                  <Text sx={{ mt: 1 }}>{i.description}</Text>
                </Box>
              ))}
            </Section>

            <Section title="Skills" icon={<BuildIcon />}>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {skills?.map((s, i) => (
                  <Box
                    key={i}
                    sx={{
                      border: "1px solid #1976d2",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "0.85rem",
                      backgroundColor: "#f0f8ff",
                    }}
                  >
                    {s}
                  </Box>
                ))}
              </Box>
            </Section>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

/* Reusable helpers */
const Section = ({ title, icon, children }) => (
  <Box mb={4}>
    <Box display="flex" alignItems="center" mb={2}>
      {icon && <Box sx={{ mr: 1, color: "#1976d2" }}>{icon}</Box>}
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{ borderBottom: "2px solid #1976d2", pb: 0.5, flexGrow: 1 }}
      >
        {title}
      </Typography>
    </Box>
    {children}
  </Box>
);

const Text = ({ children, ...props }) => (
  <Typography variant="body2" {...props}>
    {children}
  </Typography>
);

export default PreviewPage;
