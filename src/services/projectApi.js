import api from "./api";
// import { getUserId } from "../utils/auth";

// GET all projects
export const getProjects = (userId) => {
  // const userId = getUserId();
  return api.get(`/api/projects`, {
    params: { user_id: userId },
  });
};

// CREATE project
export const createProject = (userId,data) => {
  // const userId = getUserId();
  return api.post(`/api/projects`, data, {
    params: { user_id: userId },
  });
};

// UPDATE project
export const updateProject = (projectId, data) =>
  api.put(`/api/projects/${projectId}`, data);

// DELETE project
export const deleteProject = (id) =>
  api.delete(`/api/projects/${id}`);


// UPLOAD project file
export const uploadProjectFile = (projectId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(`/api/projects/${projectId}/files`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// GET project files
export const getProjectFiles = (projectId) =>
  api.get(`/api/projects/${projectId}/files`);
