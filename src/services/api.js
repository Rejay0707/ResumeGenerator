import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.39:8000'; // Your backend URL

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available (for protected routes after login)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adjust if your backend uses a different header (e.g., 'Token')
  }
  return config;
});

// Optional: Handle 401 errors globally (e.g., auto-logout)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optionally dispatch logout or redirect to login
      window.location.href = '/login'; // Adjust to your login route
    }
    return Promise.reject(error);
  }
);

export default api;
