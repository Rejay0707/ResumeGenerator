import api from "./api"; // your axios instance

export const getUserSkills = (userId) => {
  return api.get(`/api/skills?user_id=${userId}`);
};

export const addSkill = (data) => {
  return api.post("/api/skills", data);
};

export const deleteSkill = (id) => {
  return api.delete(`/api/skills/${id}`);
};

export const getAISkillSuggestions = (userId) => {
  if (!userId) {
    return Promise.reject(new Error("User ID is required"));
  }
  return api.get(`/api/skills/ai-suggest?user_id=${userId}`);
};

