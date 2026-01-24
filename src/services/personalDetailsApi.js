import api from "./api";

// GET personal details
export const getPersonalDetails = (userId) => {
  return api.get("/api/profile/personal", {
    params: { user_id: userId },
  });
};

// CREATE or UPDATE personal details
export const savePersonalDetails = (data) => {
  return api.post("/api/profile/personal", data);
};
