import api from "./api";

export const getVerifiedCertifications = (userId) => {
  return api.get("/api/certifications", {
    params: {
      user_id: userId,
      verified: true,
    },
  });
};
