import api from "./api"; // your axios instance

export const uploadCertificate = (formData) => {
  return api.post("/api/certificates", formData);
};

// Get certificates for logged-in user
export const getCertificates = (userId) =>
  api.get(`/api/certificates?user_id=${userId}`);

// Delete certificate
export const deleteCertificate = (certificateId) =>
  api.delete(`/api/certificates/${certificateId}`);
