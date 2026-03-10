import api from "./api";

// GET pending jobs
export const getPendingJobs = async () => {
  const res = await api.get("/api/admin/jobs/pending");
  return res.data;
};

// APPROVE job
export const approveJob = async (jobId) => {
  const res = await api.post(`/api/admin/jobs/${jobId}/approve`);
  return res.data;
};

// REJECT job
export const rejectJob = async (jobId) => {
  const res = await api.post(`/api/admin/jobs/${jobId}/reject`);
  return res.data;
};