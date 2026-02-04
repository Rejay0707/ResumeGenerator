import api from "./api";

/**
 * GET student dashboard aggregated data
 */
export const getStudentDashboard = (userId) => {
  return api.get("/api/student/dashboard", {
    params: { user_id: userId },
  });
};
