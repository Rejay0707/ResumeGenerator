import api from "./api";

/**
 * GET student dashboard aggregated data
 */
export const getStudentDashboard = (userId) => {
  return api.get("/api/student/dashboard", {
    params: { user_id: userId },
  });
};


// ✅ NEW — Recent Activity
export const getRecentActivity = () =>
  api.get("/api/student/dashboard/recent-activity");

export const getIndustrySkillGap = () =>
  api.get("/api/industry-skill-gap");
