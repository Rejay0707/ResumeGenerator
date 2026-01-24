import api from "./api";

// GET education list
export const getEducation = (userId) => {
  return api.get("/api/education", {
    params: { user_id: userId },
  });
};

// CREATE education
export const addEducation = (data) => {
  return api.post("/api/education", data);
};

// UPDATE education
export const updateEducation = (id, data) => {
  return api.put(`/api/education/${id}`, data);
};

// DELETE education
export const deleteEducation = (id) => {
  return api.delete(`/api/education/${id}`);
};
