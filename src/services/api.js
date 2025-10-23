// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://www.scratchprod.in/resume-generator-backend/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getAllTimetables = () => api.get("/api/timetables");




export const getStudentsForTeacher = (teacherId) =>
  api.get(`/api/teacher/${encodeURIComponent(teacherId)}/students`);


// Fetch all exam scores (or filter by teacher)
export const getExamScores = async (teacherId) => {
  const response = await api.get(
    `https://www.scratchprod.in/resume-generator-backend/api/exam-scores?teacher_id=${teacherId}`
  );
  return response.data;
};



export default api;


