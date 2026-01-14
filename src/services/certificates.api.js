import api from "./api";

export const uploadCertificate = (formData) => {
  return api.post("/api/certifications/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
