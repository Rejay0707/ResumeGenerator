import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getStudentDashboard } from "../services/dashboardApi";

import StatCard from "../components/dashboard/StatCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import SectionStatus from "../components/dashboard/SectionStatus";
import RecentActivity from "../components/dashboard/RecentActivity";

export default function StudentDashboardContainer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    if (!dashboard) return;

    const suggestions = getImprovementSuggestions();

    if (suggestions.length > 0) {
      const resumeNotifications = suggestions.map((text, index) => ({
        id: `resume-${index}`,
        title: "Resume Improvement",
        message: text,
        is_read: false,
        created_at: new Date().toISOString(),
      }));

      localStorage.setItem(
        "resume_notifications",
        JSON.stringify(resumeNotifications),
      );
    }
  }, [dashboard]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await getStudentDashboard(userId);
    setDashboard(res.data);
  };

  if (!dashboard) return null;

  const {
    resume_completion,
    skill_score,
    quick_stats,
    section_status,
    recent_activity,
  } = dashboard;

  const getImprovementSuggestions = () => {
    const suggestions = [];

    // Personal Details
    if (!section_status.personal_details.completed) {
      suggestions.push(
        "Complete all personal details (name, email, phone, GitHub)",
      );
    }

    // Education
    if (!section_status.education.completed) {
      suggestions.push("Complete your college education details");
    }

    // Skills (need 10)
    if (quick_stats.skills_count < 10) {
      suggestions.push(`Add ${10 - quick_stats.skills_count} more skill(s)`);
    }

    // Projects (need 4 completed)
    if (quick_stats.projects_completed < 4) {
      suggestions.push(
        `Complete ${4 - quick_stats.projects_completed} more project(s)`,
      );
    }

    // Certificates (need 3)
    if (quick_stats.certificates_uploaded < 3) {
      suggestions.push(
        `Upload ${3 - quick_stats.certificates_uploaded} more certificate(s)`,
      );
    }

    // Internships (need 3 completed)
    if (quick_stats.internships_completed < 3) {
      suggestions.push(
        `Complete ${3 - quick_stats.internships_completed} more internship(s)`,
      );
    }

    return suggestions;
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3} color="black">
        Student Dashboard
      </Typography>

      {/* {resume_completion < 100 && getImprovementSuggestions().length > 0 && (
        <Box mb={3} p={2} borderRadius={2} sx={{ backgroundColor: "#fff3e0" }}>
          <Typography fontWeight={600} color="warning.main">
            Improve your resume to reach 100%
          </Typography>

          <Typography variant="body2" color="text.secondary">
            To improve your resume completion, please:
            <ul style={{ margin: "8px 0 0 16px" }}>
              {getImprovementSuggestions().map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Typography>
        </Box>
      )} */}

      {/* Progress */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={6}>
          <ProgressCard title="Resume Completion" value={resume_completion} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <ProgressCard title="Skill Score" value={skill_score} />
        </Grid>
      </Grid>

      {/* Quick Stats */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} sm={3} md={3}>
          <StatCard label="Skills" value={quick_stats.skills_count} />
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <StatCard label="Projects" value={quick_stats.projects_completed} />
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <StatCard
            label="Certificates"
            value={quick_stats.certificates_uploaded}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <StatCard
            label="Internships"
            value={`${quick_stats.internships_completed}/${quick_stats.internships_ongoing}`}
          />
        </Grid>
      </Grid>

      {recent_activity?.length > 0 && (
        <Box mt={3} mb={3}>
          <RecentActivity activities={recent_activity} />
        </Box>
      )}

      {/* Section Status */}
      <Box>
        <Typography variant="h6" mb={2} color="black">
          Section Completion
        </Typography>

        <SectionStatus
          title="Personal Details"
          completedCount={section_status.personal_details.completed ? 1 : 0}
          totalCount={1}
        />

        <SectionStatus
          title="Education"
          completedCount={section_status.education.completed ? 1 : 0}
          totalCount={1}
        />

        <SectionStatus
          title="Skills"
          completedCount={quick_stats.skills_count}
          totalCount={10}
        />

        <SectionStatus
          title="Projects"
          completedCount={quick_stats.projects_completed}
          totalCount={4}
        />

        <SectionStatus
          title="Certificates"
          completedCount={quick_stats.certificates_uploaded}
          totalCount={3}
        />

        <SectionStatus
          title="Internships"
          completedCount={quick_stats.internships_completed}
          totalCount={3}
        />
      </Box>
    </Box>
  );
}
