import React, { useEffect, useState } from "react";
import axios from "axios";

const ResumeGenerate = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const resumeId = localStorage.getItem("resumeId");

  useEffect(() => {
    if (resumeId) fetchResume(resumeId);
  }, [resumeId]);

  const fetchResume = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.scratchprod.in/resume-generator-backend/api/jobseekers/${id}/resume`
      );
      if (res.data?.status) setResume(res.data.resume);
    } catch (err) {
      console.error("Error fetching resume:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!resumeId) return <h3>No resume found — please save first.</h3>;
  if (loading) return <h3>Loading Resume...</h3>;

  // Helper: filter out empty education entries
  const filteredEducation = resume?.education?.filter(
    (edu) =>
      edu.degree ||
      edu.college ||
      edu.cgpa ||
      edu.school ||
      edu.standard ||
      edu.percentage
  );

  /** ---------- PDF Download Function ------------ **/
  const downloadResume = async () => {
    const element = document.getElementById("resume-area");
    if (!element) return;

    const { jsPDF } = await import("jspdf");
    const html2canvas = (await import("html2canvas")).default;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        padding: "40px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Download Button */}
      <div
        onClick={downloadResume}
        style={{
          cursor: "pointer",
          padding: "10px 18px",
          background: "#222",
          color: "white",
          borderRadius: "8px",
          marginBottom: "15px",
          fontSize: "14px",
          transition: "0.2s",
        }}
        title="Download PDF"
        onMouseEnter={(e) => (e.currentTarget.style.background = "#444")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#222")}
      >
        📄 Download PDF
      </div>

      {/* Resume Wrapper */}
      <div
        id="resume-area"
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          fontFamily: "Segoe UI, sans-serif",
          lineHeight: "1.6",
          border: "1px solid #ddd",
        }}
      >
        {/* ===== HEADER ===== */}
        <header
          style={{
            textAlign: "center",
            borderBottom: "3px solid #444",
            paddingBottom: "15px",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "30px", color: "#222" }}>
            {resume?.basic_details?.name}
          </h1>
          <p style={{ color: "#555" }}>
            {resume?.basic_details?.email} | {resume?.basic_details?.phone}
          </p>
          <p style={{ color: "#777" }}>{resume?.basic_details?.address}</p>
        </header>

        {/* ===== DYNAMIC SECTIONS ===== */}
        {[
          {
            title: "🎓 Education",
            data: filteredEducation,
            render: (edu) => (
              <>
                {edu.degree && <strong>{edu.degree}</strong>}
                {edu.college && <p>{edu.college}</p>}
                {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
                {edu.school && <p>School: {edu.school}</p>}
                {edu.standard && <p>Standard: {edu.standard}</p>}
                {edu.percentage && <p>Percentage: {edu.percentage}</p>}
              </>
            ),
          },
          {
            title: "💼 Experience",
            data: resume?.experience,
            render: (exp) => (
              <>
                {exp.role && <strong>{exp.role}</strong>}
                {(exp.company || exp.companyName) && (
                  <p>{exp.company || exp.companyName}</p>
                )}
                {exp.duration && <p>Duration: {exp.duration}</p>}
                {exp.description && <p>{exp.description}</p>}
              </>
            ),
          },
          {
            title: "🚀 Projects",
            data: resume?.projects,
            render: (prj) => (
              <>
                {prj.title && <strong>{prj.title}</strong>}
                {prj.techStack && <p>Tech Stack: {prj.techStack}</p>}
                {prj.link && <p>Link: <a href={prj.link} target="_blank" rel="noopener noreferrer">{prj.link}</a></p>}
                {prj.description && <p>{prj.description}</p>}
              </>
            ),
          },
        ].map((section, i) => (
          <section key={i} style={{ marginTop: "25px" }}>
            <h2
              style={{
                borderBottom: "2px solid #aaa",
                paddingBottom: "5px",
                color: "#333",
              }}
            >
              {section.title}
            </h2>

            {section.data?.length > 0 ? (
              section.data.map((item, index) => (
                <div
                  key={index}
                  style={{
                    margin: "12px 0",
                    padding: "15px",
                    borderLeft: "4px solid #555",
                    background: "#312f2fff",
                    borderRadius: "6px",
                  }}
                >
                  {section.render(item)}
                </div>
              ))
            ) : (
              <p>No {section.title} added</p>
            )}
          </section>
        ))}

        {/* ===== SKILLS ===== */}
        <section style={{ marginTop: "25px" }}>
          <h2
            style={{
              borderBottom: "2px solid #aaa",
              paddingBottom: "5px",
              color: "#333",
            }}
          >
            🔧 Skills
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {resume?.skills?.length > 0 ? (
              resume.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    padding: "8px 12px",
                    background: "#222",
                    color: "white",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  {skill.skillName || skill.name} •{" "}
                  {skill.skillLevel || skill.level}
                </span>
              ))
            ) : (
              <p>No skills added</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeGenerate;

