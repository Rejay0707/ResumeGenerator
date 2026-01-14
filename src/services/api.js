// src/services/api.js
import axios from "axios";

const API_BASE_URL = "https://www.scratchprod.in/resume-generator-backend/";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if exists
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const role = user?.role?.toLowerCase();

    // 🚫 Do NOT logout students on 401
    if (status === 401 && role !== "student" && role !== "jobseeker") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export const getAllTimetables = () => api.get("/api/timetables");

export const getStudentsForTeacher = (teacherId) =>
  api.get(`/api/teacher/${encodeURIComponent(teacherId)}/students`);

// Fetch all exam scores (or filter by teacher)
// export const getExamScores = async (teacherId) => {
//   const response = await api.get(
//     `https://www.scratchprod.in/resume-generator-backend/api/exam-scores?teacher_id=${teacherId}`
//   );
//   console.log(response)
//   return response.data;
// };
// Fetch all exam scores for the logged-in user
export const getExamScores = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const teacherId = user.id;
  const response = await api.get(
    `https://www.scratchprod.in/resume-generator-backend/api/exam-scores?teacher_id=${teacherId}`
  );
  // console.log(response);
  return response.data;
};

export default api;
