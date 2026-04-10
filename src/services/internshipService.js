// src/services/internshipApi.js
import api from "./api";

// 1. Get internships
export const getInternships = () => {
  return api.get("/api/new-internships");
};

// 2. Apply internship
export const applyInternship = async (internshipId, studentId) => {
  try {
    const response = await api.post(
      `/api/new-internships/${internshipId}/apply`,
      {
        student_id: studentId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Apply Internship Error:", error.response?.data || error);
    throw error;
  }
};

// 3. Student applications (letter fetch)
export const getMyApplications = (application_id, studentId) => {
  return api.get(
    `/api/my-internship-applications/${application_id}/letter`,
    {
      params: { student_id: studentId },
    }
  );
};

// 4. Admin pending apps
export const getPendingApplications = () => {
  return api.get("/api/admin/internship-applications?status=pending");
};

// 5. Approve / Reject
export const updateApplicationStatus = (id, status) => {
  return api.patch(
    `/api/admin/internship-applications/${id}/status`,
    { status }
  );
};

// 6. Upload letter
export const uploadLetter = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(
    `/api/admin/internship-applications/${id}/upload-letter`,
    formData
  );
};

// 7. Download letter
export const downloadLetter = (id, studentId) => {
  return `/api/download/letter/${id}?student_id=${studentId}`;
};