import api from "./api";

// GET pending resumes
export const getPendingResumes = async () => {
  const res = await api.get("/api/admin/resumes/pending");
  return res.data.data;
};

// VERIFY resume
export const verifyResume = async (resumeId, adminId) => {
  const res = await api.post(`/api/admin/resumes/${resumeId}/verify`, {
    verified_by: adminId,
  });

  return res.data;
};

// REJECT resume
export const rejectResume = async (resumeId, adminId, reason) => {
  const res = await api.post(`/api/admin/resumes/${resumeId}/reject`, {
    verified_by: adminId,
    reason: reason,
  });

  return res.data;
};