import api from "./api";

export const getPlacementScore = (studentId) => {
  return api.get(`/api/placement-score/${studentId}`);
};