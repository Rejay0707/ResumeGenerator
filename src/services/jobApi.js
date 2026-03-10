import api from "./api";

// GET all jobs
export const getJobs = async () => {
  const response = await api.get("/api/student/jobs");
  return response.data;
};

// APPLY to job
export const applyJob = async (jobId, studentId) => {
  const response = await api.post(`/api/student/jobs/${jobId}/apply`, {
    student_id: studentId,
  });

  return response.data;
};

export const getApplications = async (userId) => {
  const response = await api.get(`/api/student/applications?user_id=${userId}`);
  return response.data;
};