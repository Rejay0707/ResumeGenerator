import api from "./api"; // your existing axios instance

export const getCompletedInternships = (userId) => {
  return api.get(`/api/internships`, {
    params: {
      user_id: userId,
      status: "completed",
    },
  });
};
